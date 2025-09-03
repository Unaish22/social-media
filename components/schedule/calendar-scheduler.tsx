"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
  MoreHorizontal,
  Plus,
  Search,
  Twitter,
  Youtube,
  AlertTriangle,
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InstagramIcon as TiktokIcon } from "lucide-react";

export function CalendarScheduler() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState("month");
  const [showHighPerforming, setShowHighPerforming] = useState(false);
  const [activePlatform, setActivePlatform] = useState("all");
  const [balanceWarning, setBalanceWarning] = useState("");

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "instagram": return "border-pink-500 bg-pink-50 text-pink-700";
      case "facebook": return "border-blue-500 bg-blue-50 text-blue-700";
      case "twitter": return "border-sky-500 bg-sky-50 text-sky-700";
      case "linkedin": return "border-blue-700 bg-blue-50 text-blue-700";
      case "youtube": return "border-red-500 bg-red-50 text-red-700";
      case "tiktok": return "border-gray-800 bg-gray-50 text-gray-800";
      default: return "border-gray-500 bg-gray-50 text-gray-700";
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram": return <Instagram className="h-3 w-3" />;
      case "facebook": return <Facebook className="h-3 w-3" />;
      case "twitter": return <Twitter className="h-3 w-3" />;
      case "linkedin": return <Linkedin className="h-3 w-3" />;
      case "youtube": return <Youtube className="h-3 w-3" />;
      case "tiktok": return <TiktokIcon className="h-3 w-3" />;
      default: return null;
    }
  };

  // Sample scheduled posts data
  const scheduledPosts = [
    { id: 1, title: "Spring Collection Teaser", date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1), time: "10:30 AM", platform: "instagram", isHighPerforming: true },
    { id: 2, title: "Industry News Update", date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 2), time: "2:15 PM", platform: "twitter", isHighPerforming: false },
    { id: 3, title: "Weekend Special Offer", date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 4), time: "9:00 AM", platform: "facebook", isHighPerforming: false },
    { id: 4, title: "Industry Insights Article", date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 7), time: "11:00 AM", platform: "linkedin", isHighPerforming: false },
    { id: 5, title: "Product Demo Challenge", date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 9), time: "3:30 PM", platform: "tiktok", isHighPerforming: false },
    { id: 6, title: "Product Tutorial Video", date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 11), time: "2:00 PM", platform: "youtube", isHighPerforming: true },
    { id: 7, title: "Customer Testimonial", date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 14), time: "12:45 PM", platform: "instagram", isHighPerforming: false },
    { id: 8, title: "Community Spotlight", date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 16), time: "10:00 AM", platform: "facebook", isHighPerforming: false },
    { id: 9, title: "Industry Chat Thread", date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 18), time: "1:30 PM", platform: "twitter", isHighPerforming: false },
    { id: 10, title: "Case Study Publication", date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 21), time: "9:30 AM", platform: "linkedin", isHighPerforming: false },
    { id: 11, title: "Expert Interview Series", date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 23), time: "4:00 PM", platform: "youtube", isHighPerforming: false },
    { id: 12, title: "Product Launch Announcement", date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 25), time: "11:15 AM", platform: "instagram", isHighPerforming: true },
    { id: 13, title: "Weekend Event Reminder", date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 25), time: "3:30 PM", platform: "facebook", isHighPerforming: false },
    { id: 14, title: "Behind the Scenes", date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 28), time: "2:45 PM", platform: "tiktok", isHighPerforming: false },
    { id: 15, title: "Monthly Recap Thread", date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 30), time: "10:00 AM", platform: "twitter", isHighPerforming: false },
  ];

  useEffect(() => {
    // Mock content balance analysis
    const analyzeBalance = () => {
      const postTypes = scheduledPosts.map((post) => post.title.toLowerCase());
      const productPosts = postTypes.filter((title) => title.includes("product") || title.includes("sale")).length;
      if (productPosts > scheduledPosts.length * 0.5) {
        setBalanceWarning("Too many product posts this month—add an educational video for balance.");
      } else {
        setBalanceWarning("");
      }
    };
    analyzeBalance();
  }, [currentMonth]);

  const getPostsForDay = (day: number) => {
    let posts = scheduledPosts.filter(
      (post) =>
        post.date.getDate() === day &&
        post.date.getMonth() === currentMonth.getMonth() &&
        post.date.getFullYear() === currentMonth.getFullYear(),
    );
    if (activePlatform !== "all") {
      posts = posts.filter((post) => post.platform === activePlatform);
    }
    if (showHighPerforming) {
      posts = posts.filter((post) => post.isHighPerforming);
    }
    return posts;
  };

  return (
    <div className="space-y-4">
      {balanceWarning && (
        <Card className="mb-4 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <p className="text-sm text-yellow-800">{balanceWarning}</p>
            </div>
          </CardContent>
        </Card>
      )}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input type="text" placeholder="Search content..." className="pl-10 pr-4 py-2 w-full" />
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant={activePlatform === "all" ? "default" : "outline"} className="cursor-pointer" onClick={() => setActivePlatform("all")}>
          All
        </Badge>
        <Badge
          variant={activePlatform === "instagram" ? "default" : "outline"}
          className="cursor-pointer bg-pink-50 text-pink-700 border-pink-300"
          onClick={() => setActivePlatform("instagram")}
        >
          <Instagram className="h-3 w-3 mr-1" />
          Instagram
        </Badge>
        <Badge
          variant={activePlatform === "facebook" ? "default" : "outline"}
          className="cursor-pointer bg-blue-50 text-blue-700 border-blue-300"
          onClick={() => setActivePlatform("facebook")}
        >
          <Facebook className="h-3 w-3 mr-1" />
          Facebook
        </Badge>
        <Badge
          variant={activePlatform === "twitter" ? "default" : "outline"}
          className="cursor-pointer bg-sky-50 text-sky-700 border-sky-300"
          onClick={() => setActivePlatform("twitter")}
        >
          <Twitter className="h-3 w-3 mr-1" />
          Twitter
        </Badge>
        <Badge
          variant={activePlatform === "linkedin" ? "default" : "outline"}
          className="cursor-pointer bg-blue-50 text-blue-700 border-blue-300"
          onClick={() => setActivePlatform("linkedin")}
        >
          <Linkedin className="h-3 w-3 mr-1" />
          LinkedIn
        </Badge>
        <Badge
          variant={activePlatform === "tiktok" ? "default" : "outline"}
          className="cursor-pointer bg-gray-50 text-gray-800 border-gray-300"
          onClick={() => setActivePlatform("tiktok")}
        >
          <TiktokIcon className="h-3 w-3" />
          <span className="ml-1">TikTok</span>
        </Badge>
        <Badge
          variant={activePlatform === "youtube" ? "default" : "outline"}
          className="cursor-pointer bg-red-50 text-red-700 border-red-300"
          onClick={() => setActivePlatform("youtube")}
        >
          <Youtube className="h-3 w-3 mr-1" />
          YouTube
        </Badge>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-medium">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h2>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch id="high-performing" checked={showHighPerforming} onCheckedChange={setShowHighPerforming} />
            <Label htmlFor="high-performing">High performing only</Label>
          </div>
          <div className="flex items-center gap-2">
            <Select value={view} onValueChange={setView}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="day">Day</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-7 border-b">
            {dayNames.map((day, index) => (
              <div key={index} className="p-2 text-center text-sm font-medium">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-start-${index}`} className="min-h-[120px] p-2 border-r border-b bg-gray-50"></div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const isToday =
                new Date().getDate() === day &&
                new Date().getMonth() === currentMonth.getMonth() &&
                new Date().getFullYear() === currentMonth.getFullYear();
              const postsForDay = getPostsForDay(day);
              const isHighEngagement = postsForDay.some((post) => post.isHighPerforming);

              return (
                <div
                  key={`day-${day}`}
                  className={`min-h-[120px] p-2 border-r border-b ${isToday ? "bg-blue-50" : ""} ${isHighEngagement ? "bg-green-50" : ""}`}
                >
                  <div className="text-sm font-medium mb-1">{day}</div>
                  <div className="space-y-1">
                    {postsForDay.map((post) => (
                      <div
                        key={post.id}
                        className={`text-xs p-1 rounded border-l-2 ${getPlatformColor(post.platform)} ${post.isHighPerforming ? "ring-1 ring-primary" : ""}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {getPlatformIcon(post.platform)}
                            <span>{post.time}</span>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="font-medium truncate">{post.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            {Array.from({ length: (7 - ((firstDayOfMonth + daysInMonth) % 7)) % 7 }).map((_, index) => (
              <div key={`empty-end-${index}`} className="min-h-[120px] p-2 border-r border-b bg-gray-50"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}