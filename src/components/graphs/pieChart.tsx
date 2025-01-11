'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#4CAF50', '#F44336'];

interface PassFailData {
  name: string;
  value: number;
}

export default function ProjectPassFailChart({ data }: { data: PassFailData[] }) {
  // Calculate the total for percentage calculation
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="bg-gray-800 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Auditing Pass/Fail</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-center text-gray-400">No data available</p>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  label={({ name, value }) => `${name}: ${(value / total * 100).toFixed(1)}%`}
                  outerRadius="80%"
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }: any) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="p-2 bg-gray-700 text-white rounded">
                          <p className="text-sm font-bold">{payload[0].name}</p>
                          <p className="text-sm">Value: {payload[0].value}</p>
                          <p className="text-sm">
                            Percentage: {((payload[0].value / total) * 100).toFixed(1)}%
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
