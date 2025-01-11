'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { format, parseISO, startOfMonth, subMonths, isAfter, addMonths } from "date-fns";

interface TransactionItem {
  amount: number;
  createdAt: string;
}

interface APIResponse {
  transaction: TransactionItem[];
}

interface XpChartProps {
  response: APIResponse;
}

export default function XpGainedChart({ response }: XpChartProps) {
  const today = new Date();
  const startDate = startOfMonth(subMonths(today, 5)); // Start 6 months ago

  // transform the response into monthly xP 
  const rawData = response.transaction.map(item => ({
    month: format(startOfMonth(parseISO(item.createdAt)), "yyyy-MM"),
    amount: item.amount,
  }));

  // Aggregate XP by month
  const monthlyData: Record<string, number> = rawData.reduce((acc: Record<string, number>, item) => {
    acc[item.month] = (acc[item.month] || 0) + item.amount;
    return acc;
  }, {});

  // array of months for the last 6 months
  const chartData = [];
  let currentDate = startDate;

  while (isAfter(today, currentDate) || format(currentDate, "yyyy-MM") === format(today, "yyyy-MM")) {
    const month = format(currentDate, "yyyy-MM");
    chartData.push({ month, xp: (monthlyData[month] || 0) / 1000 }); // Divide XP by 1000 to make it KB
    currentDate = addMonths(currentDate, 1); // Move to the next month
  }

  return (
    <Card className="bg-gray-800 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">XP Gained Each Month (Last 6 Months)</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            xp: {
              label: "XP (x100)",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tickFormatter={(value) => value.toLocaleString()}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="xp"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
