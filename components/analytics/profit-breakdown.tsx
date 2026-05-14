"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "EUR/USD", value: 4500, color: "#00d4aa" },
  { name: "GBP/USD", value: 3200, color: "#3b82f6" },
  { name: "USD/JPY", value: 2800, color: "#8b5cf6" },
  { name: "Gold", value: 2100, color: "#f59e0b" },
  { name: "Others", value: 2292, color: "#6b7280" }
]

export function ProfitBreakdown() {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card className="bg-card border-border h-full">
      <CardHeader>
        <CardTitle>Profit by Asset</CardTitle>
        <CardDescription>
          Distribution of profits across trading pairs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))"
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Profit"]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2 mt-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">
                  ${item.value.toLocaleString()}
                </span>
                <span className="text-muted-foreground text-xs">
                  ({((item.value / total) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
