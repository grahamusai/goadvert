"use client"

import { Home, MessageCircle, PlusCircle, Bell, User } from "lucide-react"
import { RiDashboard3Fill } from "react-icons/ri";
import Link from "next/link"
import { usePathname } from "next/navigation"

export function FloatingNavbar() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">

      <nav className="bg-white rounded-full px-6 py-4 shadow-lg flex items-center gap-8">
        <Link
          href="/dashboard"
          className={`${pathname === "/" ? "text-blue-500" : "text-gray-600"} hover:text-blue-500 transition-colors`}
        >
          <RiDashboard3Fill className="w-6 h-6" />
        </Link>
        <Link
          href="/messages"
          className={`${pathname === "/messages" ? "text-blue-500" : "text-gray-600"} hover:text-blue-500 transition-colors`}
        >
          <MessageCircle className="w-6 h-6" />
        </Link>
        <Link
          href="/dashboard/new"
          className={`${pathname === "/dashboard/new" ? "text-blue-500" : "text-gray-600"} hover:text-blue-500 transition-colors`}
        >
          <PlusCircle className="w-6 h-6" />
        </Link>
        <Link
          href="/notifications"
          className={`${pathname === "/notifications" ? "text-blue-500" : "text-gray-600"} hover:text-blue-500 transition-colors`}
        >
          <Bell className="w-6 h-6" />
        </Link>
        <Link
          href="/profile"
          className={`${pathname === "/profile" ? "text-blue-500" : "text-gray-600"} hover:text-blue-500 transition-colors`}
        >
          <User className="w-6 h-6" />
        </Link>
      </nav>
    </div>
  )
}

