"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { socialAPI } from "@/lib/social-api"
import {
  Facebook,
  Twitter,
  Linkedin,
  Plus,
  Settings,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Key,
  Users,
  Shield,
} from "lucide-react"

/* ---------- helpers ---------- */
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return String(error)
}

/* ---------- types ---------- */
interface SocialToken {
  id: string
  platform: "facebook" | "twitter" | "linkedin"
  userId: string
  userName: string
  accessToken: string
  refreshToken?: string
  expiresAt: Date
  isActive: boolean
  scopes: string[]
  lastRefreshed: Date
  rateLimitRemaining?: number
  rateLimitReset?: Date
}

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "user"
  isActive: boolean
}

const PLATFORM_CONFIG = {
  facebook: {
    name: "Facebook",
    icon: Facebook,
    color: "bg-blue-600",
    scopes: ["pages_manage_posts", "pages_read_engagement", "pages_show_list"],
    authUrl: "https://www.facebook.com/v18.0/dialog/oauth",
  },
  twitter: {
    name: "Twitter",
    icon: Twitter,
    color: "bg-sky-500",
    scopes: ["tweet.read", "tweet.write", "users.read"],
    authUrl: "https://twitter.com/i/oauth2/authorize",
  },
  linkedin: {
    name: "LinkedIn",
    icon: Linkedin,
    color: "bg-blue-700",
    scopes: ["w_member_social", "r_liteprofile", "r_emailaddress"],
    authUrl: "https://www.linkedin.com/oauth/v2/authorization",
  },
}

/* ---------- main component ---------- */
export default function TokenManager() {
  const [tokens, setTokens] = useState<SocialToken[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<string>("all")
  const [isAddingToken, setIsAddingToken] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<keyof typeof PLATFORM_CONFIG>("facebook")
  const [refreshingTokens, setRefreshingTokens] = useState<Set<string>>(new Set())
  const [validatingTokens, setValidatingTokens] = useState<Set<string>>(new Set())

  /* initial load */
  useEffect(() => {
    const savedTokens = localStorage.getItem("socialTokens")
    const savedUsers = localStorage.getItem("users")

    if (savedTokens) {
      const parsedTokens = JSON.parse(savedTokens).map((token: any) => ({
        ...token,
        expiresAt: new Date(token.expiresAt),
        lastRefreshed: new Date(token.lastRefreshed),
        rateLimitReset: token.rateLimitReset ? new Date(token.rateLimitReset) : undefined,
      }))
      setTokens(parsedTokens)
    }

    if (savedUsers) {
      setUsers(JSON.parse(savedUsers))
    } else {
      const demoUsers: User[] = [
        { id: "1", name: "John Doe", email: "john@example.com", role: "admin", isActive: true },
        { id: "2", name: "Jane Smith", email: "jane@example.com", role: "user", isActive: true },
        { id: "3", name: "Mike Johnson", email: "mike@example.com", role: "user", isActive: false },
      ]
      setUsers(demoUsers)
      localStorage.setItem("users", JSON.stringify(demoUsers))
    }
  }, [])

  /* persist tokens */
  useEffect(() => {
    localStorage.setItem("socialTokens", JSON.stringify(tokens))
  }, [tokens])

  /* helpers */
  const getTokenStatus = (token: SocialToken) => {
    const now = new Date()
    const expiresIn = token.expiresAt.getTime() - now.getTime()
    const hoursUntilExpiry = expiresIn / (1000 * 60 * 60)

    if (expiresIn <= 0) return { status: "expired", color: "destructive" }
    if (hoursUntilExpiry <= 24) return { status: "expiring", color: "warning" }
    return { status: "active", color: "success" }
  }

  /* handlers */
  const handleAddToken = async (platform: keyof typeof PLATFORM_CONFIG, userId: string) => {
    try {
      const response = await fetch(`/api/auth/${platform}?userId=${userId}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to initiate OAuth")
      }

      const popup = window.open(data.authUrl, "oauth", "width=600,height=600,scrollbars=yes,resizable=yes")

      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed)
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        }
      }, 1000)

      setIsAddingToken(false)
    } catch (error) {
      console.error("OAuth error:", error)
      toast.error(getErrorMessage(error), { description: "Authentication Failed" })
    }
  }

  const handleRefreshToken = async (tokenId: string) => {
    const token = tokens.find((t) => t.id === tokenId)
    if (!token?.refreshToken) {
      toast.error("No refresh token available", { description: "Refresh Failed" })
      return
    }

    setRefreshingTokens((prev) => new Set([...prev, tokenId]))

    try {
      const result = await socialAPI.refreshToken(tokenId, token.platform, token.refreshToken)

      setTokens((prev) =>
        prev.map((t) =>
          t.id === tokenId
            ? {
                ...t,
                accessToken: result.accessToken,
                refreshToken: result.refreshToken || t.refreshToken,
                lastRefreshed: new Date(),
                expiresAt: new Date(Date.now() + result.expiresIn * 1000),
                rateLimitRemaining: 1000,
              }
            : t,
        ),
      )

      toast.success("Access token has been successfully refreshed")
    } catch (error) {
      console.error("Token refresh error:", error)
      toast.error(getErrorMessage(error), { description: "Refresh Failed" })
    } finally {
      setRefreshingTokens((prev) => {
        const newSet = new Set(prev)
        newSet.delete(tokenId)
        return newSet
      })
    }
  }

  const handleToggleToken = (tokenId: string) => {
    setTokens((prev) =>
      prev.map((token) => (token.id === tokenId ? { ...token, isActive: !token.isActive } : token)),
    )
  }

  const handleDeleteToken = (tokenId: string) => {
    setTokens((prev) => prev.filter((token) => token.id !== tokenId))
  }

  const handleValidateToken = async (tokenId: string) => {
    const token = tokens.find((t) => t.id === tokenId)
    if (!token) return

    setValidatingTokens((prev) => new Set([...prev, tokenId]))

    try {
      const result = await socialAPI.validateToken(token.platform, token.accessToken)

      if (result.valid) {
        toast.success("Access token is working correctly")
      } else {
        toast.error("Access token needs to be refreshed or reconnected")
      }
    } catch (error) {
      console.error("Token validation error:", error)
      toast.error(getErrorMessage(error), { description: "Validation Failed" })
    } finally {
      setValidatingTokens((prev) => {
        const newSet = new Set(prev)
        newSet.delete(tokenId)
        return newSet
      })
    }
  }

  /* derived state */
  const filteredTokens = selectedUser === "all" ? tokens : tokens.filter((token) => token.userId === selectedUser)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "expiring":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "expired":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  /* render */
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Token Management</h2>
          <p className="text-muted-foreground">Manage social media API tokens and user access across platforms</p>
        </div>
        <Dialog open={isAddingToken} onOpenChange={setIsAddingToken}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Token
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Social Media Token</DialogTitle>
              <DialogDescription>Connect a new social media account for API access</DialogDescription>
            </DialogHeader>
            <AddTokenForm
              users={users.filter((u) => u.isActive)}
              onSubmit={handleAddToken}
              selectedPlatform={selectedPlatform}
              setSelectedPlatform={setSelectedPlatform}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* summary cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tokens</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tokens.length}</div>
            <p className="text-xs text-muted-foreground">{tokens.filter((t) => t.isActive).length} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter((u) => u.isActive).length}</div>
            <p className="text-xs text-muted-foreground">{users.filter((u) => u.role === "admin").length} admins</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tokens.filter((t) => getTokenStatus(t).status === "expiring").length}
            </div>
            <p className="text-xs text-muted-foreground">Within 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platforms</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(tokens.map((t) => t.platform)).size}</div>
            <p className="text-xs text-muted-foreground">Connected platforms</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tokens" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="tokens" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filter Tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="user-filter">Filter by User</Label>
                  <select
                    id="user-filter"
                    className="w-full mt-1 p-2 border rounded-md"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                  >
                    <option value="all">All Users</option>
                    {users
                      .filter((u) => u.isActive)
                      .map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {filteredTokens.map((token) => {
              const platform = PLATFORM_CONFIG[token.platform]
              const status = getTokenStatus(token)
              const Icon = platform.icon

              return (
                <Card key={token.id} className="relative">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${platform.color} text-white`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{platform.name}</CardTitle>
                          <CardDescription>
                            {token.userName} • Last refreshed {token.lastRefreshed.toLocaleDateString()}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(status.status)}
                        <Badge variant={status.color as any}>{status.status}</Badge>
                        <Switch checked={token.isActive} onCheckedChange={() => handleToggleToken(token.id)} />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label className="text-sm font-medium">Token Preview</Label>
                        <p className="text-sm text-muted-foreground font-mono">
                          {token.accessToken.substring(0, 20)}...
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Expires</Label>
                        <p className="text-sm text-muted-foreground">
                          {token.expiresAt.toLocaleDateString()} at {token.expiresAt.toLocaleTimeString()}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Rate Limit</Label>
                        <div className="flex items-center gap-2">
                          <Progress value={(token.rateLimitRemaining || 0) / 10} className="flex-1" />
                          <span className="text-sm text-muted-foreground">{token.rateLimitRemaining}/1000</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Scopes</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {token.scopes.map((scope) => (
                            <Badge key={scope} variant="outline" className="text-xs">
                              {scope}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRefreshToken(token.id)}
                        disabled={refreshingTokens.has(token.id)}
                      >
                        {refreshingTokens.has(token.id) ? (
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4 mr-2" />
                        )}
                        Refresh
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleValidateToken(token.id)}
                        disabled={validatingTokens.has(token.id)}
                      >
                        {validatingTokens.has(token.id) ? (
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <CheckCircle className="h-4 w-4 mr-2" />
                        )}
                        Validate
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteToken(token.id)}>
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {filteredTokens.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <Key className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No tokens found</h3>
                  <p className="text-muted-foreground mb-4">
                    {selectedUser === "all"
                      ? "Get started by adding your first social media token"
                      : "This user has no tokens configured"}
                  </p>
                  <Button onClick={() => setIsAddingToken(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Token
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="users">
          <UserManagement users={users} setUsers={setUsers} />
        </TabsContent>

        <TabsContent value="analytics">
          <TokenAnalytics tokens={tokens} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

/* ---------- AddTokenForm ---------- */
function AddTokenForm({
  users,
  onSubmit,
  selectedPlatform,
  setSelectedPlatform,
}: {
  users: User[]
  onSubmit: (platform: keyof typeof PLATFORM_CONFIG, userId: string) => void
  selectedPlatform: keyof typeof PLATFORM_CONFIG
  setSelectedPlatform: (platform: keyof typeof PLATFORM_CONFIG) => void
}) {
  const [selectedUserId, setSelectedUserId] = useState("")

  const handleOAuthConnect = () => {
    if (!selectedUserId) return
    onSubmit(selectedPlatform, selectedUserId)
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="platform">Platform</Label>
        <select
          id="platform"
          className="w-full mt-1 p-2 border rounded-md"
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value as keyof typeof PLATFORM_CONFIG)}
        >
          {Object.entries(PLATFORM_CONFIG).map(([key, config]) => (
            <option key={key} value={key}>
              {config.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="user">User</Label>
        <select
          id="user"
          className="w-full mt-1 p-2 border rounded-md"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          required
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          You'll be redirected to {PLATFORM_CONFIG[selectedPlatform].name} to authorize access
        </AlertDescription>
      </Alert>

      <Button onClick={handleOAuthConnect} disabled={!selectedUserId} className="w-full">
        Connect via OAuth
      </Button>
    </div>
  )
}

/* ---------- UserManagement ---------- */
function UserManagement({ users, setUsers }: { users: User[]; setUsers: (users: User[]) => void }) {
  const [isAddingUser, setIsAddingUser] = useState(false)

  const handleAddUser = (userData: Omit<User, "id">) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
    }
    const updatedUsers = [...users, newUser]
    setUsers(updatedUsers)
    localStorage.setItem("users", JSON.stringify(updatedUsers))
    setIsAddingUser(false)
  }

  const handleToggleUser = (userId: string) => {
    const updatedUsers = users.map((user) => (user.id === userId ? { ...user, isActive: !user.isActive } : user))
    setUsers(updatedUsers)
    localStorage.setItem("users", JSON.stringify(updatedUsers))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">User Management</h3>
        <Dialog open={isAddingUser} onOpenChange={setIsAddingUser}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <AddUserForm onSubmit={handleAddUser} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</Badge>
                  <Switch checked={user.isActive} onCheckedChange={() => handleToggleUser(user.id)} />
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}

/* ---------- AddUserForm ---------- */
function AddUserForm({ onSubmit }: { onSubmit: (user: Omit<User, "id">) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user" as "admin" | "user",
    isActive: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({ name: "", email: "", role: "user", isActive: true })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label htmlFor="role">Role</Label>
        <select
          id="role"
          className="w-full mt-1 p-2 border rounded-md"
          value={formData.role}
          onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value as "admin" | "user" }))}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <Button type="submit" className="w-full">
        Add User
      </Button>
    </form>
  )
}

/* ---------- TokenAnalytics ---------- */
function TokenAnalytics({ tokens }: { tokens: SocialToken[] }) {
  const platformStats = Object.entries(PLATFORM_CONFIG).map(([platform, config]) => {
    const platformTokens = tokens.filter((t) => t.platform === platform)
    const activeTokens = platformTokens.filter((t) => t.isActive)

    return {
      platform,
      name: config.name,
      icon: config.icon,
      color: config.color,
      total: platformTokens.length,
      active: activeTokens.length,
      expired: platformTokens.filter((t) => new Date() > t.expiresAt).length,
    }
  })

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Token Analytics</h3>

      <div className="grid gap-4 md:grid-cols-3">
        {platformStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.platform}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.color} text-white`}>
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.total}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.active} active • {stat.expired} expired
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Token Health Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tokens.map((token) => {
              const platform = PLATFORM_CONFIG[token.platform]
              const Icon = platform.icon
              const daysUntilExpiry = Math.ceil((token.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

              return (
                <div key={token.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${platform.color} text-white`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{token.userName}</p>
                      <p className="text-sm text-muted-foreground">{platform.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{daysUntilExpiry > 0 ? `${daysUntilExpiry} days` : "Expired"}</p>
                    <p className="text-xs text-muted-foreground">{token.rateLimitRemaining}/1000 requests</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}