"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Download, TrendingUp } from "lucide-react"
import { OverviewChart } from "@/components/analytics/overview-chart"
import { PlatformPerformance } from "@/components/analytics/platform-performance"
import { EngagementBreakdown } from "@/components/analytics/engagement-breakdown"
import { TopPerformingPosts } from "@/components/analytics/top-performing-posts"
import { AIInsights } from "@/components/analytics/ai-insights"

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Get insights about your social media performance</p>
        </div>

        <div className="flex items-center gap-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Total Reach</p>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold">1,284,368</h3>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  12.5%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">vs last period</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Engagement Rate</p>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold">4.8%</h3>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  0.7%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">vs last period</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Follower Growth</p>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold">+8,742</h3>
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  <TrendingUp className="h-3 w-3 mr-1 rotate-180" />
                  2.3%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">vs last period</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold">2.4%</h3>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  0.3%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">vs last period</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Platform Comparison</CardTitle>
            <CardDescription>Compare performance across different platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <OverviewChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Breakdown</CardTitle>
            <CardDescription>Types of engagement with your content</CardDescription>
          </CardHeader>
          <CardContent>
            <EngagementBreakdown />
          </CardContent>
        </Card>
      </div>

      <PlatformPerformance />

      <TopPerformingPosts />

      <AIInsights />
    </div>
  )
}
