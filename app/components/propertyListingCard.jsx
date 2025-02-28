"use client"
import { useState, useEffect } from 'react'
import pb from '../../lib/pocketbase'
import PropertyCard from '../components/propertyCard'
import { useRouter } from 'next/navigation' // Import useRouter for navigation

export default function PropertiesListingCard() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter() // Initialize useRouter

  useEffect(() => {
    async function fetchProperties() {
      try {
        const records = await pb.collection('properties').getList(1, 50, {
          sort: '-created',
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

  // Slice the properties array to only show the first 8 items
  const displayedProperties = properties.slice(0, 8)

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-16">
        {displayedProperties.map((property) => (
          <PropertyCard
            key={property.id}
            name={property.name}
            description={property.description}
            city={property.city}
            country={property.country}
            type={property.type}
            term={property.term}
            image_url={property.image_url}
            price={property.price}
          />
        ))}
      </div>
      {/* Add a "View All Properties" button */}
      {properties.length > 8 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => router.push('/properties')} // Redirect to /properties
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            View All Properties
          </button>
        </div>
      )}
    </div>
  )
}