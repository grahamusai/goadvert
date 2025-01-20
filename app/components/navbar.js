"use client"
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Search } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"


import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Input } from "../../components/ui/input"

export default function Navbar() {
  const publishableKey = process.env.NEXT_PUBLIC_YOUR_KEY_NAME;
  return (
    <ClerkProvider publishableKey={publishableKey}>
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              EN
              <span className="sr-only">Select language</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>Spanish</DropdownMenuItem>
            <DropdownMenuItem>French</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex max-w-xl flex-1 items-center gap-2 rounded-full border bg-background px-3">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search"
          className="border-0 bg-transparent p-2 focus-visible:ring-0"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm">
            Buy
          </Button>
          <Button variant="ghost" size="sm">
            Sell
          </Button>
          <Button variant="ghost" size="sm">
            Rent
          </Button>
          <Button variant="ghost" size="sm">
            Contact Us
          </Button>
        </div>
        <DropdownMenu>
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
              USD
              <span className="sr-only">Select currency</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>USD</DropdownMenuItem>
            <DropdownMenuItem>EUR</DropdownMenuItem>
            <DropdownMenuItem>GBP</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-2">
          <SignedOut>
            <SignInButton mode="modal" afterSignInUrl="/dashboard">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
    </ClerkProvider>
  )
}
