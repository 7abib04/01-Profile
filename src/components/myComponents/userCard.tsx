'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function ProfileCard(data:any) {
  const [isExpanded, setIsExpanded] = useState(false)
  const user = data.user[0]
  const userInfo = {
    name: user.attrs.firstName + ' ' + user.attrs.lastName,
    email: user.attrs.email,
    phone: user.attrs.Phone,
    degree: user.attrs.Degree,
    placeOfBirth:user.attrs.placeOfBirth
  }

  return (
    <Card className="bg-gray-800 text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">User Information</CardTitle>
        <button onClick={() => setIsExpanded(!isExpanded)} className="text-gray-400 hover:text-white">
          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium">{userInfo.name}</p>
          <p className="text-sm text-gray-400">{userInfo.email}</p>
        </div>
        {isExpanded && (
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-sm text-gray-400">phone number</p>
              <p className="text-lg font-medium">{userInfo.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Degree</p>
              <p className="text-lg font-medium">{userInfo.degree}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Completed Projects</p>
              <p className="text-lg font-medium">{userInfo.placeOfBirth}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

