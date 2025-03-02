'use client'

import { UserSidebar } from "./components/sidebar-app"
import { SidebarProvider } from "../../components/ui/sidebar"
import Navbar from "./components/navbar"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import Image from "next/image"
import pb from "../../lib/pocketbase"
import { toast } from "sonner"
import { MobileSidebar } from "./components/mobile-sidebar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip"
import { Archive } from "lucide-react"
import Chart from "./components/chart"
import RevenueChart from "./components/revenueChart"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    if (!pb.authStore.isValid) {
      router.push('/login');
    }
  }, [router]);

  const [userContent, setUserContent] = useState({
    posts: [],
    properties: [],
    cars: []
  })
  const [editItem, setEditItem] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [deleteItem, setDeleteItem] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    price: ''
  })
  const [imageIndices, setImageIndices] = useState({});

  const nextImage = (itemId, maxLength) => {
    setImageIndices(prev => ({
      ...prev,
      [itemId]: ((prev[itemId] || 0) + 1) % maxLength
    }));
  };

  const previousImage = (itemId, maxLength) => {
    setImageIndices(prev => ({
      ...prev,
      [itemId]: ((prev[itemId] || 0) - 1 + maxLength) % maxLength
    }));
  };

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

  const handleDeleteClick = (collectionName, id) => {
    setDeleteItem({ collectionName, id })
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    try {
      await pb.collection(deleteItem.collectionName).delete(deleteItem.id)
      toast.success('Item deleted successfully')
      setIsDeleteModalOpen(false)
      fetchUserContent() // Refresh the content
    } catch (error) {
      console.error('Error deleting item:', error)
      toast.error('Failed to delete item')
    }
  }

  const handleEdit = (item, collectionName) => {
    setEditItem({ ...item, collectionName })
    setEditForm({
      name: item.name,
      description: item.description,
      price: item.price
    })
    setIsEditModalOpen(true)
  }

  const handleUpdate = async () => {
    try {
      await pb.collection(editItem.collectionName).update(editItem.id, {
        name: editForm.name,
        description: editForm.description,
        price: editForm.price
      })
      toast.success('Item updated successfully')
      setIsEditModalOpen(false)
      fetchUserContent() // Refresh the content
    } catch (error) {
      console.error('Error updating item:', error)
      toast.error('Failed to update item')
    }
  }

  const handleArchive = async (collectionName, id) => {
    try {
      await pb.collection(collectionName).update(id, {
        isArchived: true
      })
      toast.success('Item archived successfully! You can view it in the Archived section.')
      fetchUserContent() // Refresh the content
    } catch (error) {
      console.error('Error archiving item:', error)
      toast.error('Failed to archive item')
    }
  }

  const renderContent = (items, collectionName) => {
    return items.map((item) => {
      const images = item.image_urls ? JSON.parse(item.image_urls) : (item.image ? [`${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${item.collectionId}/${item.id}/${item.image}`] : []);
      const currentImageIndex = imageIndices[item.id] || 0;

      return (
        <Card key={item.id} className="overflow-hidden">
          <div className="relative w-full h-48">
            {images.length > 0 ? (
              <>
                <Image
                  src={images[currentImageIndex] || "/images/image.png"}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                {images.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between p-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        previousImage(item.id, images.length);
                      }}
                      className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75"
                    >
                      ←
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        nextImage(item.id, images.length);
                      }}
                      className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75"
                    >
                      →
                    </button>
                  </div>
                )}
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                  {currentImageIndex + 1}/{images.length}
                </div>
              </>
            ) : (
              <Image
                src="/images/image.png"
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
          <CardFooter className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit(item, collectionName)}
            >
              Edit
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleArchive(collectionName, item.id)}
                    disabled={item.isArchived}
                  >
                    <Archive className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {item.isArchived ? 'Archived' : 'Archive'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDeleteClick(collectionName, item.id)}
            >
              Delete
            </Button>
          </CardFooter>
        </Card>
      );
    });
  };

  return (
    <div >
      < Navbar />
      <div className="hidden md:block">
        <UserSidebar />
      </div>
      <div className="md:hidden">
        <MobileSidebar />
      </div>
      
      
      <div className="hidden md:flex max-w-6xl mx-auto ml-64 ">
        <main className="flex-1 p-6">
          <div className=" flex gap-5">
            <div className="w-full md:w-1/2">
              <Chart />
            </div>
            <div className="w-full md:w-1/2">
              <RevenueChart />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}