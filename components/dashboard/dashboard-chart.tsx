"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  {
    date: "Mon",
    engagement: 1200,
    reach: 3200,
    conversions: 320,
  },
  {
    date: "Tue",
    engagement: 1350,
    reach: 3500,
    conversions: 350,
  },
  {
    date: "Wed",
    engagement: 1800,
    reach: 3800,
    conversions: 380,
  },
  {
    date: "Thu",
    engagement: 1650,
    reach: 4200,
    conversions: 420,
  },
  {
    date: "Fri",
    engagement: 1950,
    reach: 4500,
    conversions: 400,
  },
  {
    date: "Sat",
    engagement: 2100,
    reach: 4800,
    conversions: 450,
  },
  {
    date: "Sun",
    engagement: 1800,
    reach: 5000,
    conversions: 420,
  },
]

export function DashboardChart() {
  return (
    <ChartContainer
      config={{
        engagement: {
          label: "Engagement",
          color: "hsl(var(--chart-1))",
        },
        reach: {
          label: "Reach",
          color: "hsl(var(--chart-2))",
        },
        conversions: {
          label: "Conversions",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
          <XAxis dataKey="date" stroke="hsl(var(--border))" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="hsl(var(--border))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="engagement" stroke="var(--color-engagement)" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="reach" stroke="var(--color-reach)" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="conversions" stroke="var(--color-conversions)" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
