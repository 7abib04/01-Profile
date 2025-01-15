'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import handleLogout from '@/app/functions/logout'

type ErrorviewProps = {
    message: string;
  };



export default function Errorview({ message }: ErrorviewProps) {
 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <Card className="w-full max-w-md bg-gray-800 text-gray-100 shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 mr-2 text-yellow-400" />
            Error Encountered
          </CardTitle>
          <CardDescription className="text-gray-400 text-center">
            We apologize for the inconvenience. An unexpected error has occurred.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-medium text-gray-300 bg-gray-700 p-3 rounded-md">
              {message}
            </p>
          </motion.div>
          
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleLogout} 
            className="bg-[rgb(153,105,255)] hover:bg-[rgb(171,133,253)] text-white"
          >
            login page
            
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

