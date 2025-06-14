'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image'
import { LogOut } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="absolute w-full top-0 z-50 backdrop-blur-sm">
      <div className="mx-auto px-[20px] lg:px-[80px] py-3 flex justify-between items-center">
        
        {/* Logo Image */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo/logo.png" // 🔁 Replace with your actual path (e.g. /logo.png or /images/logo.svg)
            alt="AetherAI Logo"
            width={100}
            height={100}
            priority
          />
        </Link>

        {/* User Info + Logout */}
        <div className="flex items-center lg:gap-4">
          <div className="items-center gap-2 hidden lg:flex">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-gray-800">Ahmed Syed</span>
          </div>
          <Link href="/logout">
            <Button variant="link" className="text-blue-600 text-sm flex items-center gap-2"><LogOut /> Log out</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
