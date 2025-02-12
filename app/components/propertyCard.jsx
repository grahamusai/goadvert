'use client'
import supabase from "../../lib/supabase"
import { Card, CardContent } from "../../components/ui/card"
import { Skeleton } from "../../components/ui/skeleton" // Import the Skeleton component
import { useEffect, useState } from "react"
import pb from "../../lib/pocketbase"

export default function PropertyCard() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true) // Add a loading state

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
        setLoading(false) // Set loading to false after fetching data
      }
    }

    fetchProperties()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {loading ? (
        // Display skeleton while loading
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
        // Display actual content once data is loaded
        properties.map((property) => (
          <Card key={property.id} className="max-w-sm overflow-hidden rounded-3xl">
            <div className="relative aspect-[4/3]">
              <img
                src={property.image_url || '/images/property.png'}
                alt={property.name}
                className="object-cover w-full h-full"
              />
            </div>
            <CardContent className="p-4 space-y-2">
              <h2 className="font-bold text-lg">{property.name}</h2>
              <p className="text-sm text-muted-foreground">{property.description}</p>
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
          </Card>
        ))
      )}
    </div>
  )
}