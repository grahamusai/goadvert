import React from 'react'

const CalltoAction = () => {
    return (
        <div className='bg-[#020B2D] text-center text-white py-20'>
            <h3 className='text-lg text-[#227CF4] mb-8'>+100 Discount Codes</h3>
            <p className='max-w-3xl mx-auto mb-8'>Join our mailing list and gain access <br />
                to over 100 discount codes on all purchases <br />
                every month.
            </p>
            <div className="flex justify-center items-center gap-5 mt-5">
                <button className='bg-[#227CF4] px-4 py-2 rounded-full'>Subscribe</button>
            </div>
        </div>
    )
}

export default CalltoAction