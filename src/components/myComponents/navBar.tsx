import Link from "next/link";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import handleLogout from "@/app/functions/logout";

export default function Navbar() {
  const router = useRouter();

  

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/profile" className="flex items-center space-x-3">
            <img src="/image.svg" alt="Logo" className="h-9 w-9" />
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-300 hover:white"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
