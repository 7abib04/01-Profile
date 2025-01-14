'use client'
import {LoginForm} from "@/components/myComponents/login";
export default function Home() {
  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-gray-900  p-4`}>
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold text-white">Hello Rebooter</h2>
          <p className="text-xl text-gray-400">Sign in to your 01 account</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
