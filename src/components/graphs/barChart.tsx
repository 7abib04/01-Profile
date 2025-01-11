'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

interface AuditRatio {
  auditRatio: number;
  totalDown: number;
  totalUp: number;
}

interface ProjectPassFailChartProps {
  data: AuditRatio;
}

export default function XPChart({ data }: ProjectPassFailChartProps) {
  const chartData = [
    { name: "Done", value: data.totalUp/1000000 },//make it megabyte
    { name: "Received", value: data.totalDown/1000000 },
    // { name: "Audit Ratio", value: data.auditRatio },
  ];

  return (
    <Card className="bg-gray-800 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">XP Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: {
              label: "XP",
              color: "rgb(153, 105, 255)",
            },
          }}
          className="h-[300px]"
        >
          <BarChart
            data={chartData}
            layout="vertical"
            width={500} 
            height={300} 
          >
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#FFFFFF" }} 
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="value"
              fill="var(--color-value)"
              radius={[0, 4, 4, 0]} 
            />
          </BarChart>
          
        </ChartContainer>
        <div className="bg-gray-700 rounded-lg p-4 text-center mt-4">
          <p className="text-xl font-bold">Audit Ratio</p>
          <p className="text-4xl font-extrabold text-green-400">
            {data.auditRatio.toFixed(1)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
