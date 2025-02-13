"use client"
import { Search } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from 'react'
import pb from '../../lib/pocketbase'
import { useRouter } from 'next/navigation'
import { MdSupportAgent } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Input } from "../../components/ui/input"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    setIsLoggedIn(pb.authStore.isValid)

    // Listen to auth state changes
    pb.authStore.onChange((auth) => {
      setIsLoggedIn(auth.isValid)
    })
  }, [])

  const handleLogout = async () => {
    pb.authStore.clear()
    router.push('/')
  }

  return (
    <nav className="flex h-24 items-center max-w-6xl mx-auto justify-between gap-4  px-4 md:px-6">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-14 w-14 overflow-hidden  ">
            <Image
              src="/images/Logo.png"
              alt="Logo"
              className="object-cover"
              fill
              sizes="40px"
            />
          </div>
        </Link>
        <DropdownMenu className="hidden md:block">
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              EN
              <span className="sr-only">Select language</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>Deutsch</DropdownMenuItem>
            <DropdownMenuItem>French</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="hidden md:flex max-w-xl flex-1 items-center gap-2 rounded-full border bg-background px-3">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search"
          className="border-0 bg-transparent p-2 focus-visible:ring-0"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className=" items-center gap-2 flex">
          <Link href="#" variant="ghost" className='hover:text-blue-500 transition-colors text-sm'>
            Buy
          </Link>
          <Link href="/payment" variant="ghost" className='hover:text-blue-500 transition-colors text-sm'>
            Sell
          </Link>
          <Link href="/payment" variant="ghost" className='hover:text-blue-500 transition-colors text-sm'>
            Rent
          </Link>
          <Link href="/login" variant="ghost" className='hover:text-blue-500 transition-colors text-2xl'>
            {/* <MdSupportAgent /> */}
          </Link>
        </div>
        <DropdownMenu className="hidden md:block">
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <div className="relative h-5 w-5 overflow-hidden rounded-full">
                <Image
                  src="/images/flagg.png"
                  alt="US Flag"
                  className="object-cover"
                  fill
                  sizes="20px"
                />
              </div>
              <span className="hidden md:block">USD</span>
              <span className="sr-only">Select currency</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>USD</DropdownMenuItem>
            <DropdownMenuItem>EUR</DropdownMenuItem>
            <DropdownMenuItem>CHF</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <FaCartShopping />
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:text-red-600"
            >
              Logout
            </button>
          ) : (
            <a href="/login" className="text-sm hover:text-primary">
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
  )
}
