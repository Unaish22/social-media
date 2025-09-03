"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Facebook, Instagram, Linkedin, RefreshCw, Twitter, AlertTriangle } from "lucide-react";

interface PlatformWarning {
  platform: string;
  issue: string;
}

export function PreviewPost() {
  const [warnings, setWarnings] = useState<PlatformWarning[]>([
    { platform: "instagram", issue: "Image ratio (16:9) not optimal for Instagram (use 4:5)." },
  ]);
  const [predictions, setPredictions] = useState({
    instagram: { likes: 1400, shares: 92 },
    facebook: { likes: 1000, shares: 50 },
    twitter: { likes: 800, retweets: 120, replies: 50 },
    linkedin: { reactions: 600, comments: 30 },
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Preview Post</h2>
      <p className="text-muted-foreground mb-6">See how your post will look on different platforms.</p>
      {warnings.length > 0 && (
        <Card className="mb-4 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <p className="text-sm text-yellow-800">
                {warnings.map((w) => `${w.platform}: ${w.issue}`).join(", ")}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
      <Card className="mb-4">
        <CardContent className="p-4">
          <p className="text-sm">Predicted Engagement:</p>
          <p className="text-sm text-muted-foreground">
            Instagram: {predictions.instagram.shares} shares
            <br />
            Facebook: {predictions.facebook.likes} likes, {predictions.facebook.shares} shares
            <br />
            Twitter: {predictions.twitter.likes} likes, {predictions.twitter.retweets} retweets, {predictions.twitter.replies} replies
            <br />
            LinkedIn: {predictions.linkedin.reactions} reactions, {predictions.linkedin.comments} comments
          </p>
        </CardContent>
      </Card>
      <Tabs defaultValue="instagram">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="instagram" className="flex items-center gap-2">
            <Instagram className="h-4 w-4" />
            <span>Instagram</span>
          </TabsTrigger>
          <TabsTrigger value="facebook" className="flex items-center gap-2">
            <Facebook className="h-4 w-4" />
            <span>Facebook</span>
          </TabsTrigger>
          <TabsTrigger value="twitter" className="flex items-center gap-2">
            <Twitter className="h-4 w-4" />
            <span>Twitter</span>
          </TabsTrigger>
          <TabsTrigger value="linkedin" className="flex items-center gap-2">
            <Linkedin className="h-4 w-4" />
            <span>LinkedIn</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="instagram" className="mt-4">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-0">
              <div className="p-3 border-b flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                <div>
                  <p className="text-sm font-medium">your_brand</p>
                </div>
              </div>
              <div>
                <img src="/placeholder.svg?height=400&width=400" alt="Post preview" className="w-full aspect-square object-cover" />
              </div>
              <div className="p-3">
                <div className="flex gap-4 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-heart"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-message-circle"
                  >
                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-send"
                  >
                    <path d="M22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </div>
                <p className="text-sm font-medium mb-1">your_brand</p>
                <p className="text-sm">
                  ✨ SUMMER SALE ALERT! ✨<br />
                  <br />
                  Beat the heat with our refreshing skincare collection – now 30% OFF this weekend only! 🌞<br />
                  <br />
                  Our dermatologist-approved formulas will keep your skin glowing all summer long. Stock up on your favorites or try something new!
                  <br />
                  <br />
                  Shop now through Sunday at midnight. Link in bio.
                </p>
                <p className="text-sm text-blue-500 mt-1">#SummerSkincare #WeekendSale #SkincareSale #SummerGlow</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="facebook" className="mt-4">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div>
                  <p className="text-sm font-medium">Your Brand</p>
                  <p className="text-xs text-muted-foreground">Just now</p>
                </div>
              </div>
              <p className="text-sm mb-3">
                ✨ SUMMER SALE ALERT! ✨<br />
                <br />
                Beat the heat with our refreshing skincare collection – now 30% OFF this weekend only! 🌞<br />
                <br />
                Our dermatologist-approved formulas will keep your skin glowing all summer long. Stock up on your favorites or try something new!
                <br />
                <br />
                Shop now through Sunday at midnight.
              </p>
              <div className="rounded-lg overflow-hidden mb-3">
                <img src="/placeholder.svg?height=300&width=500" alt="Post preview" className="w-full object-cover" />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{predictions.facebook.likes} Likes</span>
                <span>{predictions.facebook.shares} Shares</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="twitter" className="mt-4">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div>
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-medium">Your Brand</p>
                    <p className="text-xs text-muted-foreground">@your_brand · Just now</p>
                  </div>
                  <p className="text-sm mt-1">
                    ✨ SUMMER SALE ALERT! ✨<br />
                    <br />
                    Beat the heat with our refreshing skincare collection – now 30% OFF this weekend only! 🌞<br />
                    <br />
                    Shop now through Sunday at midnight.
                    <br />
                    <br />
                    #SummerSkincare #WeekendSale
                  </p>
                  <div className="rounded-lg overflow-hidden mt-3">
                    <img src="/placeholder.svg?height=250&width=450" alt="Post preview" className="w-full object-cover" />
                  </div>
                  <div className="flex gap-6 mt-3 text-sm text-muted-foreground">
                    <span>{predictions.twitter.replies} Replies</span>
                    <span>{predictions.twitter.retweets} Retweets</span>
                    <span>{predictions.twitter.likes} Likes</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="linkedin" className="mt-4">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                <div>
                  <p className="text-sm font-medium">Your Brand</p>
                  <p className="text-xs text-muted-foreground">Company · Just now</p>
                </div>
              </div>
              <p className="text-sm mb-3">
                ✨ SUMMER SALE ALERT! ✨<br />
                <br />
                Beat the heat with our refreshing skincare collection – now 30% OFF this weekend only!
                <br />
                <br />
                Our dermatologist-approved formulas will keep your skin glowing all summer long. Stock up on your favorites or try something new!
                <br />
                <br />
                Shop now through Sunday at midnight.
                <br />
                <br />
                #SummerSkincare #WeekendSale #SkincareSale
              </p>
              <div className="rounded-lg overflow-hidden mb-3">
                <img src="/placeholder.svg?height=300&width=500" alt="Post preview" className="w-full object-cover" />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{predictions.linkedin.reactions} Reactions</span>
                <span>{predictions.linkedin.comments} Comments</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="flex justify-center mt-6">
        <Button variant="outline" onClick={() => setWarnings([])}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Regenerate Content
        </Button>
      </div>
    </div>
  );
}