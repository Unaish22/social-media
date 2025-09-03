"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Facebook, Instagram, Linkedin, PlusCircle, Twitter, Youtube } from "lucide-react";
import { useOnboarding } from "@/components/onboarding/onboarding-context";

interface PlatformRecommendation {
  platform: string;
  reason: string;
  engagementScore: number;
  competitorActivity: string;
}

export function ChoosePlatforms() {
  const { selectedPlatforms, setSelectedPlatforms } = useOnboarding();
  const [recommendations, setRecommendations] = useState<PlatformRecommendation[]>([]);

  useEffect(() => {
    // Mock AI-driven platform recommendations
    const fetchRecommendations = async () => {
      const mockRecommendations: PlatformRecommendation[] = [
        { platform: "instagram", reason: "Best for visuals (30% more clicks)", engagementScore: 0.85, competitorActivity: "70% of skincare brands active" },
        { platform: "facebook", reason: "High ROI for ads", engagementScore: 0.75, competitorActivity: "50% of competitors post daily" },
        { platform: "twitter", reason: "Real-time engagement", engagementScore: 0.65, competitorActivity: "Trending for skincare hashtags" },
        { platform: "linkedin", reason: "Professional audience", engagementScore: 0.55, competitorActivity: "20% of brands share articles" },
        { platform: "youtube", reason: "Video tutorials drive engagement", engagementScore: 0.70, competitorActivity: "30% of brands post monthly" },
      ];
      setRecommendations(mockRecommendations);
    };
    fetchRecommendations();
  }, []);

  const togglePlatform = (platform: keyof typeof selectedPlatforms) => {
    setSelectedPlatforms({
      ...selectedPlatforms,
      [platform]: !selectedPlatforms[platform],
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Choose Platforms</h2>
      <p className="text-muted-foreground mb-6">
        Select the social media platforms where you want to publish your content. AI recommendations based on engagement and competitor activity.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {recommendations.map(({ platform, reason, engagementScore, competitorActivity }) => (
          <Button
            key={platform}
            variant={selectedPlatforms[platform as keyof typeof selectedPlatforms] ? "default" : "outline"}
            className="h-auto flex-col py-6 relative"
            onClick={() => togglePlatform(platform as keyof typeof selectedPlatforms)}
          >
            <Badge className="absolute top-2 right-2">{reason}</Badge>
            {platform === "instagram" && <Instagram className="h-8 w-8 mb-2 text-pink-600" />}
            {platform === "facebook" && <Facebook className="h-8 w-8 mb-2 text-blue-600" />}
            {platform === "twitter" && <Twitter className="h-8 w-8 mb-2 text-blue-400" />}
            {platform === "linkedin" && <Linkedin className="h-8 w-8 mb-2 text-blue-700" />}
            {platform === "youtube" && <Youtube className="h-8 w-8 mb-2 text-red-600" />}
            <span>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
            <span className="text-xs text-muted-foreground mt-1">Engagement: {(engagementScore * 100).toFixed(0)}%</span>
            <span className="text-xs text-muted-foreground">{competitorActivity}</span>
          </Button>
        ))}
        <Button variant="outline" className="h-auto flex-col py-6 border-dashed">
          <PlusCircle className="h-8 w-8 mb-2 text-muted-foreground" />
          <span>Add More</span>
          <span className="text-xs text-muted-foreground">Try Threads for text-based updates</span>
        </Button>
      </div>
    </div>
  );
}