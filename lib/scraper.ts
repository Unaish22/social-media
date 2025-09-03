export interface Post {
  user: string
  text: string
  stats: { likes: string; comments: string; time: string }
  imageUrl: string
}

export async function scrapeTopPosts(query: string): Promise<Post[]> {
  // Replace with real scraping
  return Array.from({ length: 6 }, (_, i) => ({
    user: ["@brand_alpha", "@glow_skin", "@derma_daily"][i % 3],
    text: `Stub post #${i + 1} for “${query}”. Replace with real captions!`,
    stats: {
      likes: `${(1.2 + Math.random() * 5).toFixed(1)}k`,
      comments: `${30 + Math.floor(Math.random() * 400)}`,
      time: `${i + 1} days ago`,
    },
    imageUrl: `https://picsum.photos/seed/${query.replace(/\s/g, "")}${i}/600/400`,
  }))
}