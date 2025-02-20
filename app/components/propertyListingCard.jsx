"use client"
import { useState, useEffect } from 'react'
import pb from '../../lib/pocketbase'
import PropertyCard from '../components/propertyCard'

export default function PropertiesListingCard() {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
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
  )
}
