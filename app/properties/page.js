"use client"
import { useState, useEffect } from 'react'
import pb from '../../lib/pocketbase'
import PropertyCard from '../components/propertyCard'
import Navbar from '../components/navbar'

export default function Properties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading properties...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Available Properties</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
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
      </div>
    </div>
  )
}
