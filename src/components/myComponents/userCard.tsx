'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from 'lucide-react'

interface User {
  id: string;
  login: string;
  campus: string;
  attrs: {
    firstName: string;
    lastName: string;
    email: string;
    PhoneNumber: string;
    gender: string;
    country: string;
    Degree: string;
    graddate: string;
    jobtitle: string;
    placeOfBirth: string;
    emergencyTel: string;
  };
}

interface ProfileCardProps {
  user: User;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const userInfo = {
    name: user.attrs.firstName + ' ' + user.attrs.lastName,
    email: user.attrs.email,
    PhoneNumber: user.attrs.PhoneNumber,
    degree: user.attrs.Degree,
    placeOfBirth: user.attrs.placeOfBirth
  }

  return (
    <Card className="bg-gray-800 text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">User Information</CardTitle>
        <button 
          onClick={() => setIsExpanded(!isExpanded)} 
          className="text-gray-400 hover:text-white"
          aria-label={isExpanded ? "Collapse" : "Expand"}
        >
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
              <p className="text-sm text-gray-400">Phone Number</p>
              <p className="text-lg font-medium">{userInfo.PhoneNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Degree</p>
              <p className="text-lg font-medium">{userInfo.degree}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Place of Birth</p>
              <p className="text-lg font-medium">{userInfo.placeOfBirth}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
