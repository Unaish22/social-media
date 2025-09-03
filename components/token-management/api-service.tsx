"use client"

// Social Media API Service
export class SocialMediaAPI {
  private static instance: SocialMediaAPI
  private tokens: Map<string, any> = new Map()

  static getInstance(): SocialMediaAPI {
    if (!SocialMediaAPI.instance) {
      SocialMediaAPI.instance = new SocialMediaAPI()
    }
    return SocialMediaAPI.instance
  }

  // Initialize with tokens from localStorage
  initialize() {
    const savedTokens = localStorage.getItem("socialTokens")
    if (savedTokens) {
      const tokens = JSON.parse(savedTokens)
      tokens.forEach((token: any) => {
        this.tokens.set(token.id, token)
      })
    }
  }

  // Facebook API Methods
  async facebookAPI(endpoint: string, method: "GET" | "POST" = "GET", data?: any, tokenId?: string) {
    const token = this.getActiveToken("facebook", tokenId)
    if (!token) throw new Error("No active Facebook token found")

    const url = `https://graph.facebook.com/v18.0${endpoint}`
    const options: RequestInit = {
      method,
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        "Content-Type": "application/json",
      },
    }

    if (data && method === "POST") {
      options.body = JSON.stringify(data)
    }

    try {
      const response = await fetch(url, options)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error?.message || "Facebook API error")
      }

      // Update rate limit info
      this.updateRateLimit(token.id, response.headers)

      return result
    } catch (error) {
      console.error("Facebook API Error:", error)
      throw error
    }
  }

  // Twitter API Methods
  async twitterAPI(endpoint: string, method: "GET" | "POST" = "GET", data?: any, tokenId?: string) {
    const token = this.getActiveToken("twitter", tokenId)
    if (!token) throw new Error("No active Twitter token found")

    const url = `https://api.twitter.com/2${endpoint}`
    const options: RequestInit = {
      method,
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        "Content-Type": "application/json",
      },
    }

    if (data && method === "POST") {
      options.body = JSON.stringify(data)
    }

    try {
      const response = await fetch(url, options)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.errors?.[0]?.message || "Twitter API error")
      }

      // Update rate limit info
      this.updateRateLimit(token.id, response.headers)

      return result
    } catch (error) {
      console.error("Twitter API Error:", error)
      throw error
    }
  }

  // LinkedIn API Methods
  async linkedinAPI(endpoint: string, method: "GET" | "POST" = "GET", data?: any, tokenId?: string) {
    const token = this.getActiveToken("linkedin", tokenId)
    if (!token) throw new Error("No active LinkedIn token found")

    const url = `https://api.linkedin.com/v2${endpoint}`
    const options: RequestInit = {
      method,
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
      },
    }

    if (data && method === "POST") {
      options.body = JSON.stringify(data)
    }

    try {
      const response = await fetch(url, options)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "LinkedIn API error")
      }

      // Update rate limit info
      this.updateRateLimit(token.id, response.headers)

      return result
    } catch (error) {
      console.error("LinkedIn API Error:", error)
      throw error
    }
  }

  // Helper Methods
  private getActiveToken(platform: string, tokenId?: string) {
    if (tokenId) {
      return this.tokens.get(tokenId)
    }

    // Find first active token for platform
    for (const [id, token] of this.tokens) {
      if (token.platform === platform && token.isActive && new Date() < new Date(token.expiresAt)) {
        return token
      }
    }

    return null
  }

  private updateRateLimit(tokenId: string, headers: Headers) {
    const token = this.tokens.get(tokenId)
    if (!token) return

    const remaining = headers.get("x-rate-limit-remaining")
    const reset = headers.get("x-rate-limit-reset")

    if (remaining) {
      token.rateLimitRemaining = Number.parseInt(remaining)
    }

    if (reset) {
      token.rateLimitReset = new Date(Number.parseInt(reset) * 1000)
    }

    // Update localStorage
    const allTokens = Array.from(this.tokens.values())
    localStorage.setItem("socialTokens", JSON.stringify(allTokens))
  }

  // Refresh token method
  async refreshToken(tokenId: string): Promise<boolean> {
    const token = this.tokens.get(tokenId)
    if (!token || !token.refreshToken) return false

    try {
      // Platform-specific refresh logic would go here
      // For demo purposes, we'll simulate a successful refresh

      token.accessToken = `refreshed_${token.platform}_${Date.now()}`
      token.expiresAt = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) // 60 days
      token.lastRefreshed = new Date()
      token.rateLimitRemaining = 1000

      // Update localStorage
      const allTokens = Array.from(this.tokens.values())
      localStorage.setItem("socialTokens", JSON.stringify(allTokens))

      return true
    } catch (error) {
      console.error("Token refresh failed:", error)
      return false
    }
  }

  // Validate token method
  async validateToken(tokenId: string): Promise<boolean> {
    const token = this.tokens.get(tokenId)
    if (!token) return false

    try {
      // Make a simple API call to validate the token
      switch (token.platform) {
        case "facebook":
          await this.facebookAPI("/me", "GET", null, tokenId)
          break
        case "twitter":
          await this.twitterAPI("/users/me", "GET", null, tokenId)
          break
        case "linkedin":
          await this.linkedinAPI("/people/~", "GET", null, tokenId)
          break
      }
      return true
    } catch (error) {
      console.error("Token validation failed:", error)
      return false
    }
  }

  // Get user profile
  async getUserProfile(platform: string, tokenId?: string) {
    try {
      switch (platform) {
        case "facebook":
          return await this.facebookAPI("/me?fields=id,name,email,picture", "GET", null, tokenId)
        case "twitter":
          return await this.twitterAPI("/users/me?user.fields=id,name,username,profile_image_url", "GET", null, tokenId)
        case "linkedin":
          return await this.linkedinAPI(
            "/people/~?projection=(id,firstName,lastName,emailAddress,profilePicture)",
            "GET",
            null,
            tokenId,
          )
        default:
          throw new Error("Unsupported platform")
      }
    } catch (error) {
      console.error("Failed to get user profile:", error)
      throw error
    }
  }

  // Post content
  async postContent(platform: string, content: any, tokenId?: string) {
    try {
      switch (platform) {
        case "facebook":
          return await this.facebookAPI("/me/feed", "POST", content, tokenId)
        case "twitter":
          return await this.twitterAPI("/tweets", "POST", content, tokenId)
        case "linkedin":
          return await this.linkedinAPI("/ugcPosts", "POST", content, tokenId)
        default:
          throw new Error("Unsupported platform")
      }
    } catch (error) {
      console.error("Failed to post content:", error)
      throw error
    }
  }

  // Get analytics
  async getAnalytics(platform: string, tokenId?: string) {
    try {
      switch (platform) {
        case "facebook":
          return await this.facebookAPI("/me/insights", "GET", null, tokenId)
        case "twitter":
          return await this.twitterAPI("/users/me/tweets?tweet.fields=public_metrics", "GET", null, tokenId)
        case "linkedin":
          return await this.linkedinAPI("/organizationalEntityShareStatistics", "GET", null, tokenId)
        default:
          throw new Error("Unsupported platform")
      }
    } catch (error) {
      console.error("Failed to get analytics:", error)
      throw error
    }
  }
}

// Export singleton instance
export const socialAPI = SocialMediaAPI.getInstance()
