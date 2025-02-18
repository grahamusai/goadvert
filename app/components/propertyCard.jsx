'use client'
import supabase from "../../lib/supabase"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Skeleton } from "../../components/ui/skeleton"
import { useEffect, useState } from "react"
import pb from "../../lib/pocketbase"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer"

function PropertyItem({ property }) {
  // Parse image_urls if it's a string
  const images = property.image_urls ? JSON.parse(property.image_urls) : (property.image_url ? [property.image_url] : []);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Card className="max-w-sm overflow-hidden rounded-3xl group">
      <div className="relative aspect-[4/3]">
        <img
          src={images[currentImageIndex] || '/images/property.png'}
          alt={property.name}
          className="object-cover w-full h-full"
        />
        {images.length > 1 && (
          <>
            <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={previousImage}
                className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-all"
              >
                ←
              </button>
              <button
                onClick={nextImage}
                className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-all"
              >
                →
              </button>
            </div>
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
              {currentImageIndex + 1}/{images.length}
            </div>
          </>
        )}
      </div>
      <CardContent className="p-4 space-y-2">
        <h2 className="font-bold text-lg">{property.name}</h2>
        {/* <p className="text-sm text-muted-foreground">{property.description}</p> */}
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm text-muted-foreground">
            {property.city}, {property.country}
          </p>
          <span className="px-2 py-1 text-xs bg-gray-100 rounded-full">
            {property.type}
          </span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="text-lg font-bold">{property.price} USD</p>
          <p className="text-sm text-muted-foreground">/{property.term}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {/* Drawer */}
        <Drawer>
          <DrawerTrigger className="w-full bg-blue-500 py-2 text-white rounded-sm">View Details</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-xl font-bold">{property.name}</DrawerTitle>
              <DrawerDescription className="text-lg font-medium">{property.description}</DrawerDescription>
              <DrawerDescription className="text-lg font-bold">{property.price}</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button className="w-full bg-blue-500 py-2 text-white rounded-sm">Add To Cart</Button>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </CardFooter>
    </Card>
  );
}

export default function PropertyCard() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProperties() {
      try {
        const records = await pb.collection('properties').getList(1, 50, {
          sort: '-created'
        })
        setProperties(records.items)
      } catch (error) {
        console.error('Error fetching properties:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {loading ? (
        Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="max-w-sm overflow-hidden rounded-3xl">
            <div className="relative aspect-[4/3]">
              <Skeleton className="w-full h-full" />
            </div>
            <CardContent className="p-4 space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <div className="flex items-center justify-between mt-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
              <div className="flex items-center justify-between mt-3">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        properties.map((property) => (
          <PropertyItem key={property.id} property={property} />
        ))
      )}
    </div>
  )
}