"use client"

import { useState, useEffect } from "react"
import { signIn, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useOnboarding } from "@/components/onboarding/onboarding-context"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function AccountConnection() {
  const { selectedPlatforms, accountDetails, updateAccountDetail } = useOnboarding()
  const { data: session } = useSession()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (session?.accessToken && session?.provider) {
      updateAccountDetail(session.provider, "accessToken", session.accessToken)
      if (session.user?.email) {
        updateAccountDetail(session.provider, "username", session.user.email)
      }
    }
  }, [session, updateAccountDetail])

  const handleSocialLogin = async (provider: string) => {
    try {
      setError(null)
      await signIn(provider, { callbackUrl: "/onboarding" })
    } catch (err) {
      setError(`Failed to connect with ${provider}`)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Connect your social media accounts</h2>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {selectedPlatforms.facebook && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleSocialLogin("facebook")}
              >
                <Facebook className="h-5 w-5 mr-2 text-blue-600" />
                Facebook
              </Button>
            )}
            {selectedPlatforms.twitter && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleSocialLogin("twitter")}
              >
                <Twitter className="h-5 w-5 mr-2 text-blue-400" />
                Twitter
              </Button>
            )}
            {selectedPlatforms.instagram && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleSocialLogin("instagram")}
              >
                <Instagram className="h-5 w-5 mr-2 text-pink-500" />
                Instagram
              </Button>
            )}
          </div>

          <div className="text-sm text-gray-500 text-center">
            Connected accounts:
            <ul className="mt-2">
              {Object.entries(accountDetails).map(([platform, details]) => {
                if (
                  typeof details === "object" &&
                  details !== null &&
                  "accessToken" in details &&
                  details.accessToken &&
                  selectedPlatforms[platform as keyof typeof selectedPlatforms]
                ) {
                  return (
                    <li key={platform} className="text-green-600">
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}: Connected
                    </li>
                  )
                }
                return null
              })}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
