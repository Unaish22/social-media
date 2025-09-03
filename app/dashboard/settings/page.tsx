"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Facebook, Instagram, Linkedin, Plus, Twitter, X } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("brand")
  const [brandName, setBrandName] = useState("Your Brand")
  const [brandDescription, setBrandDescription] = useState(
    "Your brand description goes here. This helps establish your brand voice and personality.",
  )
  const [primaryColor, setPrimaryColor] = useState("#3B82F6")
  const [secondaryColor, setSecondaryColor] = useState("#10B981")
  const [hashtags, setHashtags] = useState(["marketing", "branding", "digital"])
  const [newHashtag, setNewHashtag] = useState("")

  // Connected accounts state
  const [connectedAccounts, setConnectedAccounts] = useState({
    facebook: false,
    instagram: true,
    twitter: true,
    linkedin: false,
    pinterest: false,
  })

  // Notification preferences state
  const [notifications, setNotifications] = useState({
    email: {
      accountUpdates: true,
      marketingNews: false,
      productUpdates: true,
    },
    push: {
      messageReceived: true,
      engagementActivity: true,
      scheduledPosts: false,
    },
    frequency: "daily",
  })

  // Toggle connected account
  const toggleAccount = (account: string) => {
    setConnectedAccounts({
      ...connectedAccounts,
      [account]: !connectedAccounts[account as keyof typeof connectedAccounts],
    })
  }

  // Toggle notification setting
  const toggleNotification = (type: string, setting: string) => {
    setNotifications({
      ...notifications,
      [type]: {
        ...notifications[type as keyof typeof notifications],
        [setting]:
          !notifications[type as keyof typeof notifications][
            setting as keyof (typeof notifications)[keyof typeof notifications]
          ],
      },
    })
  }

  // Add hashtag
  const addHashtag = () => {
    if (newHashtag && !hashtags.includes(newHashtag)) {
      setHashtags([...hashtags, newHashtag])
      setNewHashtag("")
    }
  }

  // Remove hashtag
  const removeHashtag = (tag: string) => {
    setHashtags(hashtags.filter((hashtag) => hashtag !== tag))
  }

  // Handle frequency change
  const handleFrequencyChange = (frequency: string) => {
    setNotifications({
      ...notifications,
      frequency,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Brand Manager</h1>
              <p className="text-sm text-gray-500">Manage your brand settings and preferences</p>
            </div>
            <Button>Save Changes</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          {/* Tabs */}
          <Tabs defaultValue="brand" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="brand">Brand</TabsTrigger>
              <TabsTrigger value="accounts">Accounts</TabsTrigger>
              <TabsTrigger value="hashtags">Hashtags</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            {/* Tab Content */}
            <CardContent className="p-6">
              {/* Brand Tab */}
              <TabsContent value="brand" className="space-y-8">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Brand Identity</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Logo Upload */}
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">Brand Logo</Label>
                      <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 cursor-pointer overflow-hidden">
                        <div className="text-center p-6">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          <p className="mt-1 text-sm text-gray-500">Drag and drop your logo or click to upload</p>
                          <p className="mt-1 text-xs text-gray-400">PNG, JPG, SVG up to 5MB</p>
                        </div>
                      </div>
                    </div>

                    {/* Brand Details */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="brandName">Brand Name</Label>
                        <Input
                          id="brandName"
                          value={brandName}
                          onChange={(e) => setBrandName(e.target.value)}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="brandDescription">Brand Description</Label>
                        <Textarea
                          id="brandDescription"
                          rows={4}
                          value={brandDescription}
                          onChange={(e) => setBrandDescription(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Brand Colors */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Brand Colors</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex items-center mt-1">
                        <div
                          className="w-10 h-10 rounded-md mr-3 border border-gray-300"
                          style={{ backgroundColor: primaryColor }}
                        ></div>
                        <Input
                          type="color"
                          id="primaryColor"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="h-10 w-20 border-none p-0"
                        />
                        <Input
                          type="text"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="ml-3"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="secondaryColor">Secondary Color</Label>
                      <div className="flex items-center mt-1">
                        <div
                          className="w-10 h-10 rounded-md mr-3 border border-gray-300"
                          style={{ backgroundColor: secondaryColor }}
                        ></div>
                        <Input
                          type="color"
                          id="secondaryColor"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          className="h-10 w-20 border-none p-0"
                        />
                        <Input
                          type="text"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          className="ml-3"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Brand Tone & Style */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Brand Tone & Style</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-2">Tone</h4>
                        <div className="space-y-2">
                          {["Professional", "Friendly", "Casual", "Authoritative", "Playful"].map((tone) => (
                            <div key={tone} className="flex items-center">
                              <input
                                type="radio"
                                id={tone}
                                name="tone"
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                              />
                              <Label htmlFor={tone} className="ml-2 text-sm text-gray-700">
                                {tone}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-2">Style</h4>
                        <div className="space-y-2">
                          {["Minimalist", "Bold", "Elegant", "Modern", "Classic"].map((style) => (
                            <div key={style} className="flex items-center">
                              <input
                                type="radio"
                                id={style}
                                name="style"
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                              />
                              <Label htmlFor={style} className="ml-2 text-sm text-gray-700">
                                {style}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-2">Personality</h4>
                        <div className="space-y-2">
                          {["Innovative", "Trustworthy", "Energetic", "Sophisticated", "Approachable"].map(
                            (personality) => (
                              <div key={personality} className="flex items-center">
                                <Checkbox id={personality} />
                                <Label htmlFor={personality} className="ml-2 text-sm text-gray-700">
                                  {personality}
                                </Label>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="brandGuidelines">Brand Voice Guidelines</Label>
                      <Textarea
                        id="brandGuidelines"
                        rows={4}
                        placeholder="Describe how your brand should sound in communications..."
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Connected Accounts Tab */}
              <TabsContent value="accounts" className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">Connected Accounts</h2>
                <p className="text-sm text-gray-500">
                  Connect your social media accounts to streamline your brand management.
                </p>

                <div className="bg-white rounded-lg overflow-hidden">
                  <ul className="divide-y divide-gray-200">
                    {[
                      {
                        id: "facebook",
                        name: "Facebook",
                        icon: <Facebook className="h-4 w-4" />,
                        color: "bg-blue-600",
                      },
                      {
                        id: "instagram",
                        name: "Instagram",
                        icon: <Instagram className="h-4 w-4" />,
                        color: "bg-pink-600",
                      },
                      { id: "twitter", name: "Twitter", icon: <Twitter className="h-4 w-4" />, color: "bg-blue-400" },
                      {
                        id: "linkedin",
                        name: "LinkedIn",
                        icon: <Linkedin className="h-4 w-4" />,
                        color: "bg-blue-700",
                      },
                      {
                        id: "pinterest",
                        name: "Pinterest",
                        icon: (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                            <path d="M21 12c0 4.418 -4.03 8 -9 8a9.863 9.863 0 0 1 -4.255 -.949l-3.745 .949v-3.586a8.955 8.955 0 0 1 -1 -4.414c0 -4.418 4.03 -8 9 -8s9 3.582 9 8z" />
                          </svg>
                        ),
                        color: "bg-red-600",
                      },
                    ].map((account) => (
                      <li key={account.id} className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`${account.color} text-white p-2 rounded-full`}>{account.icon}</div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{account.name}</p>
                              <p className="text-xs text-gray-500">
                                {connectedAccounts[account.id as keyof typeof connectedAccounts]
                                  ? "Connected"
                                  : "Not connected"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Switch
                              checked={connectedAccounts[account.id as keyof typeof connectedAccounts]}
                              onCheckedChange={() => toggleAccount(account.id)}
                            />
                            {connectedAccounts[account.id as keyof typeof connectedAccounts] ? (
                              <Button variant="link" className="ml-4 text-sm text-red-600 hover:text-red-800">
                                Disconnect
                              </Button>
                            ) : (
                              <Button variant="link" className="ml-4 text-sm text-primary hover:text-primary/80">
                                Connect
                              </Button>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              {/* Hashtags Tab */}
              <TabsContent value="hashtags" className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">Default Hashtags</h2>
                <p className="text-sm text-gray-500">Manage your default hashtags to use across your content.</p>

                <div className="flex items-center space-x-2">
                  <div className="flex-1">
                    <Input
                      type="text"
                      value={newHashtag}
                      onChange={(e) => setNewHashtag(e.target.value)}
                      placeholder="Add a new hashtag (without #)"
                    />
                  </div>
                  <Button onClick={addHashtag}>Add Hashtag</Button>
                </div>

                <div>
                  <h3 className="text-md font-medium text-gray-700 mb-3">Your Hashtags</h3>
                  <div className="flex flex-wrap gap-2">
                    {hashtags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center"
                      >
                        <span className="text-gray-800">#{tag}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-2 h-4 w-4 text-gray-500 hover:text-gray-700"
                          onClick={() => removeHashtag(tag)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                    {hashtags.length === 0 && <p className="text-sm text-gray-500 italic">No hashtags added yet</p>}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-md font-medium text-gray-900 mb-2">Hashtag Groups</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Create groups of hashtags for different types of content.
                  </p>

                  <div className="space-y-4">
                    <div className="bg-white p-3 rounded-md border border-gray-200">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-800">Marketing</h4>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="text-primary h-8">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4 mr-1"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 h-8">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4 mr-1"
                            >
                              <path d="M3 6h18" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              <line x1="10" y1="11" x2="10" y2="17" />
                              <line x1="14" y1="11" x2="14" y2="17" />
                            </svg>
                            Delete
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs">#marketing</Badge>
                        <Badge className="bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs">#digital</Badge>
                        <Badge className="bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs">#strategy</Badge>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-md border border-gray-200">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-800">Product</h4>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="text-primary h-8">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4 mr-1"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 h-8">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4 mr-1"
                            >
                              <path d="M3 6h18" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              <line x1="10" y1="11" x2="10" y2="17" />
                              <line x1="14" y1="11" x2="14" y2="17" />
                            </svg>
                            Delete
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs">#product</Badge>
                        <Badge className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs">
                          #innovation
                        </Badge>
                        <Badge className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs">#design</Badge>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full border-dashed flex items-center justify-center">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Hashtag Group
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">Notification Preferences</h2>
                <p className="text-sm text-gray-500">Customize how and when you receive notifications.</p>

                <div className="bg-white rounded-lg overflow-hidden">
                  <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                    <h3 className="text-md font-medium text-gray-900">Email Notifications</h3>
                  </div>
                  <ul className="divide-y divide-gray-200">
                    {[
                      {
                        id: "accountUpdates",
                        name: "Account Updates",
                        description: "Important information about your account",
                      },
                      {
                        id: "marketingNews",
                        name: "Marketing News",
                        description: "Tips, trends, and industry updates",
                      },
                      { id: "productUpdates", name: "Product Updates", description: "New features and improvements" },
                    ].map((item) => (
                      <li key={item.id} className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.description}</p>
                          </div>
                          <Switch
                            checked={notifications.email[item.id as keyof typeof notifications.email]}
                            onCheckedChange={() => toggleNotification("email", item.id)}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-lg overflow-hidden">
                  <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                    <h3 className="text-md font-medium text-gray-900">Push Notifications</h3>
                  </div>
                  <ul className="divide-y divide-gray-200">
                    {[
                      { id: "messageReceived", name: "Messages", description: "When you receive a new message" },
                      {
                        id: "engagementActivity",
                        name: "Engagement Activity",
                        description: "Likes, comments, and shares on your content",
                      },
                      {
                        id: "scheduledPosts",
                        name: "Scheduled Posts",
                        description: "Reminders about your scheduled content",
                      },
                    ].map((item) => (
                      <li key={item.id} className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.description}</p>
                          </div>
                          <Switch
                            checked={notifications.push[item.id as keyof typeof notifications.push]}
                            onCheckedChange={() => toggleNotification("push", item.id)}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-lg overflow-hidden">
                  <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                    <h3 className="text-md font-medium text-gray-900">Notification Frequency</h3>
                  </div>
                  <div className="px-4 py-5 sm:px-6">
                    <div className="space-y-4">
                      {["real-time", "daily", "weekly"].map((frequency) => (
                        <div key={frequency} className="flex items-center">
                          <input
                            type="radio"
                            id={frequency}
                            name="frequency"
                            checked={notifications.frequency === frequency}
                            onChange={() => handleFrequencyChange(frequency)}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                          />
                          <Label htmlFor={frequency} className="ml-2 text-sm text-gray-700">
                            {frequency === "real-time"
                              ? "Real-time (as they happen)"
                              : frequency === "daily"
                                ? "Daily digest"
                                : "Weekly summary"}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      This setting affects the frequency of all notifications, except for critical account updates.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </main>
    </div>
  )
}
