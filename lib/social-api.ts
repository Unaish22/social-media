// Real Social Media API Service 
export class SocialMediaAPI {
  private baseUrl = "/api/social"

  async getProfile(platform: string, accessToken: string) {
    const response = await fetch(
      `${this.baseUrl}/${platform}/profile?accessToken=${accessToken}`
    )
    if (!response.ok) throw new Error(`Failed to get ${platform} profile`)
    return response.json()
  }

  async postContent(platform: string, accessToken: string, content: any) {
    const response = await fetch(`${this.baseUrl}/${platform}/post`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accessToken, ...content }),
    })
    if (!response.ok) throw new Error(`Failed to post to ${platform}`)
    return response.json()
  }

  async getAnalytics(platform: string, accessToken: string, params?: any) {
    const queryParams = new URLSearchParams({ accessToken, ...params })
    const response = await fetch(
      `${this.baseUrl}/${platform}/analytics?${queryParams}`
    )
    if (!response.ok) throw new Error(`Failed to get ${platform} analytics`)
    return response.json()
  }

  async refreshToken(tokenId: string, platform: string, refreshToken: string) {
    const response = await fetch("/api/tokens/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tokenId, platform, refreshToken }),
    })
    if (!response.ok) throw new Error("Failed to refresh token")
    return response.json()
  }

  async validateToken(platform: string, accessToken: string) {
    try {
      await this.getProfile(platform, accessToken)
      return { valid: true }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { valid: false, error: error.message }
      }
      return { valid: false, error: "Unknown error" }
    }
  }

  // Facebook specific methods
  async getFacebookPages(accessToken: string) {
    const response = await fetch(
      `${this.baseUrl}/facebook/pages?accessToken=${accessToken}`
    )
    if (!response.ok) throw new Error("Failed to get Facebook pages")
    return response.json()
  }

  // Twitter specific methods
  async getTwitterFollowers(accessToken: string, username: string) {
    const response = await fetch(
      `${this.baseUrl}/twitter/followers?accessToken=${accessToken}&username=${username}`
    )
    if (!response.ok) throw new Error("Failed to get Twitter followers")
    return response.json()
  }

  // LinkedIn specific methods
  async getLinkedInCompanies(accessToken: string) {
    const response = await fetch(
      `${this.baseUrl}/linkedin/companies?accessToken=${accessToken}`
    )
    if (!response.ok) throw new Error("Failed to get LinkedIn companies")
    return response.json()
  }
}

export const socialAPI = new SocialMediaAPI()
