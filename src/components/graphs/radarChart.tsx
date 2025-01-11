'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

interface Skills {
  type: string;
  amount: number;
}

interface ChartProps {
  data: Skills[];
}

export default function SkillsRadarChart({ data }: ChartProps) {
  const groupedData = data.reduce((acc, curr) => {
    const existingSkill = acc.find((item) => item.type === curr.type);
    if (existingSkill) {
      existingSkill.amount += curr.amount;
    } else {
      acc.push({ type: curr.type, amount: curr.amount });
    }
    return acc;
  }, [] as Skills[]);

  return (
    <Card className="bg-gray-800 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Skills</CardTitle>
      </CardHeader>
      <CardContent>
        {groupedData.length === 0 ? (
          <p className="text-center text-gray-400">No data available</p>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={groupedData}>
                <PolarGrid stroke="rgba(255, 255, 255, 0.3)" />
                <PolarAngleAxis dataKey="type" stroke="rgba(255, 255, 255, 0.6)" />
                <PolarRadiusAxis angle={30} domain={[0, Math.max(...groupedData.map((d) => d.amount))]} />
                <Radar
                  name="Skill Level"
                  dataKey="amount"
                  fill="rgb(153, 105, 255)"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
