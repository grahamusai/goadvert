import React from 'react'
import { FaAppStore } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa";

const Download = () => {
  return (
    <div className='mx-auto max-w-3xl mt-20'>
      <div className="flex gap-10">
        <div className="hidden md:block w-full md:w-1/2">
          <img src='images/phone.png' />
        </div>
        <div className="w-full md:w-1/2 md:mt-12">
          <h2 className='md:mt-8 text-center uppercase font-extrabold text-6xl text-[#020B2D]'>Download</h2>
          <h3 className='mt-3 uppercase text-center text-[#227CF4] text-4xl'>Our app</h3>
          <p className='mt-4 text-center max-w-3xl mx-auto'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
          <div className='mt-10'>
            <div className="flex justify-center items-center gap-5 mt-5">
                <a className='bg-black px-4 py-2 rounded-sn flex gap-2 text-white'><span className='text-2xl mt-1'><FaGooglePlay /></span><h2>Play Store</h2> </a>
                <a className='bg-black px-4 py-2 rounded-sn flex gap-2 text-white'><span className='text-2xl mt-1'><FaAppStore /></span><h2>App Store</h2> </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Download