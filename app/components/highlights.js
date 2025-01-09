import React from 'react'
import BentoGrid from './bentoGrid';

const Highlights = () => {
    return (
        <div className='my-20 bg-[#E1E6EC]'>
            <div className='max-w-6xl mx-auto text-center py-12'>
                <h2 className="text-4xl font-bold text-[#020B2D]  mb-8">Properties By Area</h2>
                <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; <br /> Proin sodales ultrices nulla blandit volutpat.</p>
            </div>
            <BentoGrid />
        </div>
    )
}

export default Highlights;