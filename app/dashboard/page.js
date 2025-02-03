'use client'

import { UserSidebar } from "./components/sidebar-app"
import { SidebarProvider } from "../../components/ui/sidebar"
import Navbar from "../components/navbar"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import Image from "next/image"
import  pb  from "../../lib/pocketbase"

export default function Dashboard() {
  const [userPosts, setUserPosts] = useState([])

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const userId = pb.authStore.model.id
        const records = await pb.collection('posts').getList(1, 50, {
          filter: `user = "${userId}"`,
          sort: '-created'
        });
        setUserPosts(records.items)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    if (pb.authStore.isValid) {
      fetchUserPosts()
    }
  }, [])

  return (
    <>
      <Navbar />
      
        <UserSidebar />
        <div className="flex max-w-6xl mx-auto ml-64">
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">My Posts</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="relative w-full h-48">
                  {post.image && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${post.collectionId}/${post.id}/${post.image}`}
                      alt={post.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <CardHeader>
                  <CardTitle>{post.name}</CardTitle>
                  <CardDescription>${post.price}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{post.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </>
  )
}