import React from 'react'
import BentoGrid from './bentoGrid';

const Highlights = () => {
    return (
        <div className='my-20 bg-[#E1E6EC]'>
            <div className='max-w-4xl mx-auto text-center py-12'>
                <h2 className="text-4xl font-bold text-[#020B2D]  mb-8">Properties By Area</h2>
                <p>See our properties by location and find your dream home</p>
            </div>
            <BentoGrid />
        </div>
    )
}

export default Highlights;