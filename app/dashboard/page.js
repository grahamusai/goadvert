'use client'

import { UserSidebar } from "./components/sidebar-app"
import { SidebarProvider } from "../../components/ui/sidebar"
import Navbar from "../components/navbar"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import Image from "next/image"
import pb from "../../lib/pocketbase"
import { toast } from "sonner"

export default function Dashboard() {
  const [userContent, setUserContent] = useState({
    posts: [],
    properties: [],
    cars: []
  })

  const fetchUserContent = async () => {
    try {
      const userId = pb.authStore.model.id
      const [posts, properties, cars] = await Promise.all([
        pb.collection('posts').getList(1, 50, {
          filter: `user = "${userId}"`,
          sort: '-created'
        }),
        pb.collection('properties').getList(1, 50, {
          filter: `user = "${userId}"`,
          sort: '-created'
        }),
        pb.collection('cars').getList(1, 50, {
          filter: `user = "${userId}"`,
          sort: '-created'
        })
      ]);

      setUserContent({
        posts: posts.items,
        properties: properties.items,
        cars: cars.items
      })
    } catch (error) {
      console.error('Error fetching content:', error)
      toast.error('Failed to fetch your content')
    }
  }

  useEffect(() => {
    if (pb.authStore.isValid) {
      fetchUserContent()
    }
  }, [])

  const handleDelete = async (collectionName, id) => {
    try {
      await pb.collection(collectionName).delete(id)
      toast.success('Item deleted successfully')
      fetchUserContent() // Refresh the content
    } catch (error) {
      console.error('Error deleting item:', error)
      toast.error('Failed to delete item')
    }
  }

  const renderContent = (items, collectionName) => {
    return items.map((item) => (
      <Card key={item.id} className="overflow-hidden">
        <div className="relative w-full h-48">
          {item.image && (
            <Image
              src={`${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${item.collectionId}/${item.id}/${item.image}`}
              alt={item.name}
              fill
              className="object-cover"
            />
          )}
        </div>
        <CardHeader>
          <CardTitle>{item.name}</CardTitle>
          <CardDescription>${item.price}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">{item.description}</p>
        </CardContent>
        <CardFooter>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => handleDelete(collectionName, item.id)}
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
    ))
  }

  return (
    <>
      <Navbar />
      <UserSidebar />
      <div className="flex max-w-6xl mx-auto ml-64">
        <main className="flex-1 p-6">
          <div className="space-y-8">
            <section>
              <h1 className="text-2xl font-bold mb-6">My Posts</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderContent(userContent.posts, 'posts')}
              </div>
            </section>

            <section>
              <h1 className="text-2xl font-bold mb-6">My Properties</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderContent(userContent.properties, 'properties')}
              </div>
            </section>

            <section>
              <h1 className="text-2xl font-bold mb-6">My Cars</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderContent(userContent.cars, 'cars')}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  )
}