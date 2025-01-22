import { UserSidebar } from "./components/sidebar-app"
import { SidebarProvider } from "../../components/ui/sidebar"
import Navbar from "../components/navbar"

export default function Dashboard() {
  return (
    <>
      <Navbar />
         <UserSidebar />
    </>

  )
}