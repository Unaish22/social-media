"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileImage, FileText, FileVideo, Images, MessageSquare } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PostTypeInfo {
  type: string;
  aiTip: string;
}

export function PostType() {
  const [selectedGoal, setSelectedGoal] = useState("brand-awareness");

  const postTypes: PostTypeInfo[] = [
    { type: "image", aiTip: "Images drive 20% more clicks on Instagram." },
    { type: "video", aiTip: "Videos get 2x more shares on Facebook." },
    { type: "text", aiTip: "Text posts spark discussions on Twitter." },
    { type: "carousel", aiTip: "Carousels increase storytelling engagement by 15%." },
    { type: "story", aiTip: "Stories with polls boost engagement by 25%." },
  ];

  const recommendedTypes = selectedGoal === "brand-awareness" ? ["carousel", "story"] : ["image", "video"];

  return (
    <TooltipProvider>
      <div>
        <h2 className="text-xl font-semibold mb-4">Choose Post Type</h2>
        <p className="text-muted-foreground mb-4">Select the type of content you want to create.</p>
        <div className="mb-4">
          <label className="text-sm font-medium">Goal:</label>
          <select
            value={selectedGoal}
            onChange={(e) => setSelectedGoal(e.target.value)}
            className="ml-2 border rounded-md p-1"
          >
            <option value="brand-awareness">Brand Awareness</option>
            <option value="engagement">Engagement</option>
            <option value="sales">Sales</option>
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {postTypes.map(({ type, aiTip }) => (
            <Tooltip key={type}>
              <TooltipTrigger asChild>
                <Button
                  variant={recommendedTypes.includes(type) ? "default" : "outline"}
                  className="h-auto flex-col py-6"
                >
                  {type === "image" && <FileImage className="h-8 w-8 mb-2 text-primary" />}
                  {type === "video" && <FileVideo className="h-8 w-8 mb-2 text-primary" />}
                  {type === "text" && <FileText className="h-8 w-8 mb-2 text-primary" />}
                  {type === "carousel" && <Images className="h-8 w-8 mb-2 text-primary" />}
                  {type === "story" && <MessageSquare className="h-8 w-8 mb-2 text-primary" />}
                  <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{aiTip}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}