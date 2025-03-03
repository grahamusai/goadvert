"use client"
import { Home, MessageSquare, Settings, User } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "../../../components/ui/sidebar"
import Chart from "./chart"
import RevenueChart from "./revenueChart"
import { MdSpaceDashboard } from "react-icons/md";
import { GoFileDirectoryFill } from "react-icons/go";
import { FaCirclePlus, FaBoxArchive } from "react-icons/fa6";
import { FaSignOutAlt, FaCar, FaFileAlt } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FaMoneyBillWave, FaClipboardList } from "react-icons/fa";
import { LuBuilding2 } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Button } from "../../../components/ui/button"

export function MobileSidebar() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex h-14 items-center border-b bg-background px-4">
          <SidebarTrigger />
          <div className="ml-2 font-semibold"></div>
        </header>
        <main className="flex-1 p-4">
          <div className="rounded-lg  text-center">
            <Chart />
            <div className="mt-3">
              <RevenueChart  />
            </div>
            
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

function AppSidebar() {
  const { isMobile } = useSidebar()

  return (
    <Sidebar className="text-white">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-white">Admin</div>
            {/* <div className="text-xs text-muted-foreground">Admin</div> */}
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="text-white mt-5">
        <SidebarMenu>
          <a href="/dashboard">
            <SidebarMenuItem className="pt-5">
              <SidebarMenuButton>
                <MdSpaceDashboard />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </a>
          <a href="/dashboard/new">
            <SidebarMenuItem className="pt-5">
              <SidebarMenuButton>
                <FaCirclePlus className="h-5 w-5" />
                <span>Create Listing</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </a>
          <a href="/dashboard/listings">
            <SidebarMenuItem className="pt-5">
              <SidebarMenuButton>
                <FaFileAlt className="h-5 w-5" />
                <span>My Listings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </a>
          <a href="dashboard/archived">
            <SidebarMenuItem className="pt-5">
              <SidebarMenuButton>
                <FaBoxArchive className="h-5 w-5" />
                <span>Archived</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </a>
          <a href="#">
            <SidebarMenuItem className="pt-5">
              <SidebarMenuButton>
                <FaMoneyBillWave className="h-5 w-5" />
                <span>Plans and Billing</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </a>
          <a href="/dashboard/account">
            <SidebarMenuItem className="pt-5">
              <SidebarMenuButton>
                <IoSettings className="h-5 w-5" />
                <span>Account Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </a>
          <SidebarMenuItem className="pt-5">
            <SidebarMenuButton>
              <FaSignOutAlt className="h-5 w-5" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <Button variant="outline" className="w-full">
          Log out
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}

