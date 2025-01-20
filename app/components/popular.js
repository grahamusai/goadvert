import React from 'react'
import ListingCard from './card'
import PropertyCard from './propertyCard'

const Popular = () => {
  return (
    <div className="w-full bg-white py-20 px-4">
        {/* <h2 className="text-4xl font-bold text-[#020B2D] text-center mb-8">Popular Listings</h2> */}
        <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <PropertyCard />
                <PropertyCard />
                <PropertyCard />
            </div>
        </div>
    </div>
  )
}

export default Popular