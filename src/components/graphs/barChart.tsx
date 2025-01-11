'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

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
    { name: 'Done', value: data.totalUp / 1000000 }, // Convert to megabytes
    { name: 'Received', value: data.totalDown / 1000000 },
  ];

  return (
    <Card className="bg-gray-800 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">XP Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer>
            <BarChart data={chartData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#FFFFFF' }}
              />
              <Tooltip
                content={({ active, payload }: any) =>
                  active && payload && payload.length ? (
                    <div className="p-2 bg-gray-700 text-white rounded">
                      <p className="text-sm font-bold">{payload[0].name}</p>
                      <p className="text-sm">Value: {payload[0].value.toFixed(2)} MB</p>
                    </div>
                  ) : null
                }
              />
              <Bar
                dataKey="value"
                fill="rgb(153, 105, 255)"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
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
