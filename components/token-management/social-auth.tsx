"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Facebook, Twitter, Linkedin, ExternalLink, CheckCircle, AlertTriangle } from "lucide-react"

interface AuthConfig {
  clientId: string
  clientSecret: string
  redirectUri: string
  scopes: string[]
}

interface PlatformAuth {
  platform: "facebook" | "twitter" | "linkedin"
  isConfigured: boolean
  config?: AuthConfig
  status: "connected" | "disconnected" | "error"
  lastConnected?: Date
}

const PLATFORM_CONFIGS = {
  facebook: {
    name: "Facebook",
    icon: Facebook,
    color: "bg-blue-600",
    authUrl: "https://www.facebook.com/v18.0/dialog/oauth",
    tokenUrl: "https://graph.facebook.com/v18.0/oauth/access_token",
    defaultScopes: ["pages_manage_posts", "pages_read_engagement", "pages_show_list", "business_management"],
    docs: "https://developers.facebook.com/docs/facebook-login",
  },
  twitter: {
    name: "Twitter (X)",
    icon: Twitter,
    color: "bg-black",
    authUrl: "https://twitter.com/i/oauth2/authorize",
    tokenUrl: "https://api.twitter.com/2/oauth2/token",
    defaultScopes: ["tweet.read", "tweet.write", "users.read", "offline.access"],
    docs: "https://developer.twitter.com/en/docs/authentication/oauth-2-0",
  },
  linkedin: {
    name: "LinkedIn",
    icon: Linkedin,
    color: "bg-blue-700",
    authUrl: "https://www.linkedin.com/oauth/v2/authorization",
    tokenUrl: "https://www.linkedin.com/oauth/v2/accessToken",
    defaultScopes: ["w_member_social", "r_liteprofile", "r_emailaddress", "w_organization_social"],
    docs: "https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow",
  },
}

// ✅ Helper to get client ID from .env
const getClientId = (platform: keyof typeof PLATFORM_CONFIGS) => {
  switch (platform) {
    case "facebook":
      return process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID || ""
    case "twitter":
      return process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID || ""
    case "linkedin":
      return process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID || ""
    default:
      return ""
  }
}

// ✅ use NEXT_PUBLIC_SITE_URL instead of window
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export default function SocialAuth() {
  const [platforms, setPlatforms] = useState<PlatformAuth[]>([])
  const [isConnecting, setIsConnecting] = useState<string | null>(null)

  useEffect(() => {
    const initialPlatforms: PlatformAuth[] = Object.keys(PLATFORM_CONFIGS).map((platform) => ({
      platform: platform as keyof typeof PLATFORM_CONFIGS,
      isConfigured: false,
      status: "disconnected",
    }))

    const savedConfigs = localStorage.getItem("socialAuthConfigs")
    if (savedConfigs) {
      const configs = JSON.parse(savedConfigs)
      initialPlatforms.forEach((platform) => {
        if (configs[platform.platform]) {
          platform.isConfigured = true
          platform.config = configs[platform.platform]
          platform.status = "connected"
          platform.lastConnected = new Date(configs[platform.platform].lastConnected)
        }
      })
    }

    setPlatforms(initialPlatforms)
  }, [])

  const handleConnect = async (platform: keyof typeof PLATFORM_CONFIGS) => {
    setIsConnecting(platform)

    const config = PLATFORM_CONFIGS[platform]
    const state = `${platform}_${Date.now()}`

    const clientId = getClientId(platform)
    const redirectUri = `${SITE_URL}/auth/callback`

    if (!clientId) {
      alert(`Missing Client ID for ${platform}. Please check your .env file.`)
      setIsConnecting(null)
      return
    }

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: config.defaultScopes.join(" "),
      response_type: "code",
      state: state,
    })

    localStorage.setItem(`auth_state_${platform}`, state)

    const popup = window.open(
      `${config.authUrl}?${params.toString()}`,
      `${platform}_auth`,
      "width=600,height=600,scrollbars=yes,resizable=yes",
    )

    const checkClosed = setInterval(() => {
      if (popup?.closed) {
        clearInterval(checkClosed)
        setIsConnecting(null)
        checkAuthResult(platform)
      }
    }, 1000)

    setTimeout(() => {
      if (popup && !popup.closed) {
        popup.close()
      }
      clearInterval(checkClosed)
      setIsConnecting(null)
    }, 300000)
  }

  const checkAuthResult = (platform: keyof typeof PLATFORM_CONFIGS) => {
    setTimeout(() => {
      setPlatforms((prev) =>
        prev.map((p) =>
          p.platform === platform
            ? {
                ...p,
                status: "connected",
                isConfigured: true,
                lastConnected: new Date(),
                config: {
                  clientId: getClientId(platform),
                  clientSecret: "",
                  redirectUri: `${SITE_URL}/auth/callback`,
                  scopes: PLATFORM_CONFIGS[platform].defaultScopes,
                },
              }
            : p,
        ),
      )

      const configs = JSON.parse(localStorage.getItem("socialAuthConfigs") || "{}")
      configs[platform] = {
        clientId: getClientId(platform),
        clientSecret: "",
        redirectUri: `${SITE_URL}/auth/callback`,
        scopes: PLATFORM_CONFIGS[platform].defaultScopes,
        lastConnected: new Date().toISOString(),
      }
      localStorage.setItem("socialAuthConfigs", JSON.stringify(configs))
    }, 2000)
  }

  const handleDisconnect = (platform: keyof typeof PLATFORM_CONFIGS) => {
    setPlatforms((prev) =>
      prev.map((p) =>
        p.platform === platform ? { ...p, status: "disconnected", isConfigured: false, config: undefined } : p,
      ),
    )
    const configs = JSON.parse(localStorage.getItem("socialAuthConfigs") || "{}")
    delete configs[platform]
    localStorage.setItem("socialAuthConfigs", JSON.stringify(configs))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Connected
          </Badge>
        )
      case "error":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Error
          </Badge>
        )
      default:
        return <Badge variant="outline">Disconnected</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Social Media Authentication</h2>
        <p className="text-muted-foreground">Configure OAuth connections for social media platforms</p>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Setup Required:</strong> Make sure you add{" "}
          <code>{SITE_URL}/auth/callback</code> in your platform app settings.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {platforms.map((platform) => {
          const config = PLATFORM_CONFIGS[platform.platform]
          const Icon = config.icon

          return (
            <Card key={platform.platform} className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${config.color} text-white`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{config.name}</CardTitle>
                      <CardDescription>OAuth 2.0 Integration</CardDescription>
                    </div>
                  </div>
                  {getStatusBadge(platform.status)}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Required Scopes:</h4>
                  <div className="flex flex-wrap gap-1">
                    {config.defaultScopes.map((scope) => (
                      <Badge key={scope} variant="outline" className="text-xs">
                        {scope}
                      </Badge>
                    ))}
                  </div>
                </div>

                {platform.lastConnected && (
                  <div className="text-sm text-muted-foreground">
                    Last connected: {platform.lastConnected.toLocaleDateString()}
                  </div>
                )}

                <div className="flex gap-2">
                  {platform.status === "connected" ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleConnect(platform.platform)}
                        disabled={isConnecting === platform.platform}
                      >
                        Reconnect
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDisconnect(platform.platform)}>
                        Disconnect
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => handleConnect(platform.platform)}
                      disabled={isConnecting === platform.platform}
                      className="w-full"
                    >
                      {isConnecting === platform.platform ? "Connecting..." : "Connect"}
                    </Button>
                  )}
                </div>

                <Button variant="ghost" size="sm" className="w-full" onClick={() => window.open(config.docs, "_blank")}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Documentation
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
