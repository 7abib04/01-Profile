import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';

interface AuditRatio {
  auditRatio: number;
  totalDown: number;
  totalUp: number;
}

interface ProjectPassFailChartProps {
  data: AuditRatio;
}

// Define a type for chart data
interface ChartData {
  name: string;
  value: number;
}

export default function XPChart({ data }: ProjectPassFailChartProps) {
  const chartData: ChartData[] = [
    { name: 'Done', value: data.totalUp / 1000000 }, // Convert to megabytes
    { name: 'Receive', value: data.totalDown / 1000000 },
  ];

  const renderCustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as ChartData; // Safely cast to ChartData
      return (
        <div className="p-2 bg-gray-700 text-white rounded">
          <p className="text-sm font-bold">{data.name}</p>
          <p className="text-sm">Value: {data.value.toFixed(2)} MB</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-gray-800 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Audit Ratio</CardTitle>
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
              <Tooltip content={renderCustomTooltip} />
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
          <p className={`text-4xl font-extrabold ${data.auditRatio > 1.5 ? 'text-green-500' : data.auditRatio < 1 ? 'text-red-500' : 'text-yellow-500'}`}>
            <span>{data.auditRatio.toFixed(1)}</span>
            <span className="text-base">
              {data.auditRatio > 1.5 ? ' Perfect' : data.auditRatio < 1 ? ' Careful buddy!' : ' You can do better!'}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
