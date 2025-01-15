'use client';

import { HandleLogin } from "@/app/functions/loginHandler"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AtSign, Lock, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ErrorAlert from "@/components/myComponents/alert";

export  function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  return (
    <>

   

    <form
      className="space-y-6"
      onSubmit={(e) => HandleLogin(e, router,setError)}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="user" className="text-sm font-medium text-gray-300">
            Email
          </Label>
          <div className="relative">
            <Input
              type="text"
              id="user"
              name="user" // Add name attribute
              placeholder="Enter your email or username"
              required
              className="pl-10 w-full py-3 bg-gray-800 text-white placeholder-gray-500 border-gray-700 rounded-lg focus:ring-2 focus:ring-[rgb(153,105,255)] focus:border-transparent transition-all duration-300"
            />
            <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-gray-300">
            Password
          </Label>
          <div className="relative">
            <Input
              type="password"
              id="password"
              name="password" // Add name attribute
              placeholder="Enter your password"
              required
              className="pl-10 w-full py-3 bg-gray-800 text-white placeholder-gray-500 border-gray-700 rounded-lg focus:ring-2 focus:ring-[rgb(153,105,255)] focus:border-transparent transition-all duration-300"
            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-[rgb(153,105,255)] hover:bg-[rgb(173,135,255)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(153,105,255)] transition-all duration-300"
      >
        Sign in
        <ArrowRight className="ml-2" size={20} />
      </Button>
    </form>
    {error&&(
      <ErrorAlert message={error}/>
    )}
    </>
  );
}
