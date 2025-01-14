import { Trophy } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  name: string
  xp: number
}

export default function ProjectCard({ name, xp }: ProjectCardProps) {
  return (
    <Card className="bg-gray-700 hover:bg-gray-600 transition-colors duration-200 border-gray-600">
      <CardContent className="p-4 flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-100">{name}</h3>
        <Badge variant="secondary" className="bg-yellow-500 text-gray-900 text-xs">
          <Trophy className="h-3 w-3 mr-1" />
          {xp} XP
        </Badge>
      </CardContent>
    </Card>
  )
}

