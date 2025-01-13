import React from 'react'
import ListingCard from './card'

const Ads = () => {
    return (
        <div className="md:flex gap-10 py-10 max-w-6xl mx-auto">
            <div className="w-full md:w-1/2 bg-blue-500 flex justify-center items-center">
                <h2 className=' py-4 text-2xl font-bold text-center text-white'>Place Your Ad Here</h2>
            </div>
            <div className="w-full md:w-1/2">
                <h2 className='text-4xl font-bold text-center text-[#020B2D] mb-8 mt-10'>Trending Listings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-10">
                    <ListingCard />
                    <ListingCard />
                    <span className='hidden md:block'>
                    <ListingCard />
                    <ListingCard />
                    </span>
                    
                </div>
            </div>

        </div>
    )
}

export default Ads