'use client'

import { useState } from 'react'
import ProjectCard from './card'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProjectListProps {
  transactions: {
    amount: number
    object: { type: string; name: string }
  }[]
}

export default function ProjectList({ transactions }: ProjectListProps) {
  const [scrollPosition, setScrollPosition] = useState(0)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollPosition(e.currentTarget.scrollTop)
  }

  return (
    <Card className="bg-gray-800 border border-gray-700 shadow-lg">
      <CardHeader className="border-b border-gray-700">
        <CardTitle className="text-xl font-semibold text-gray-100">Your Projects</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div
          className="h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
          onScroll={handleScroll}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {transactions.map((transaction, index) => (
              <ProjectCard
                key={index}
                name={transaction.object.name}
                xp={(transaction.amount/1000) }
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
