import { Trophy } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  name: string
  result: string
}

export default function ProjectCard({ name, result }: ProjectCardProps) {
  return (
    <Card className="bg-gray-700 hover:bg-gray-600 transition-colors duration-200 border-gray-600">
      <CardContent className="p-4 flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-100">{name}</h3>
        <Badge variant="secondary" className={`${result === "fail" ? "bg-red-500" : "bg-green-500"} text-gray-900 text-xs`}
        >
          <Trophy className="h-3 w-3 mr-1" />
          {result} 
        </Badge>
      </CardContent>
    </Card>
  )
}

