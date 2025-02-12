import React from 'react'
import { LuBrainCircuit } from "react-icons/lu";
import { BsChatLeftDots } from "react-icons/bs";
import { BsHouse } from "react-icons/bs";
import { LuMap } from "react-icons/lu";

const Services = () => {
    return (
        <div className='px-10 py-10 max-w-6xl mx-auto'>
            <h2 className='text-4xl font-bold text-center text-[#020B2D] mb-8'>Services</h2>
            <div className="container">
                <div className="md:flex gap-10">
                    <div className="w-full md:w-1/2">
                        <img src="/images/services.png" alt="property" className="w-full h-full" />
                    </div>
                    <div className="mt-10 w-full md:w-1/2">
                        <h3 className="text-lg font-bold text-[#227CF4]">Quality Property</h3>
                        <h2 className=' text-2xl font-bold my-3'>Looking for Luxurious Properties? We have you covered!</h2>
                        <p className="text-gray-600 hidden md:block">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                        </p>
                        <div className="flex gap-5 mb-5">
                            <div className="w-1/2 ">
                                <div className='text-4xl text-blue-500 mt-6'>
                                    <LuBrainCircuit />
                                </div>
                                <h3 className='text-lg font-bold  mt-3'>Artificial Intelligence</h3>
                                <p className='text-sm md:text-sm'>Our goal is utilise AI to enhance your experience, simplify the way you advertise, sell, rent, or buy properties, and bring the future of online business to your fingertips.</p>
                            </div>
                            <div className="w-1/2">
                                <div className='text-4xl text-blue-500 mt-6'>
                                    <BsChatLeftDots />
                                </div>
                                <h3 className='text-lg font-bold  mt-3'>Live Chat</h3>
                                <p className='text-sm md:text-base'>User-friendly feature designed to provide instant
                                support and guidance whenever you need it. </p>
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <div className="w-1/2 ">
                                <div className='text-4xl text-blue-500 mt-6 font-bold'>
                                    <LuMap />
                                </div>
                                <h3 className='text-lg font-bold  mt-3'>Intergrated Map</h3>
                                <p className='text-sm md:text-base'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis ducimus suscipit libero!</p>
                            </div>
                            <div className="w-1/2">
                                <div className='text-4xl text-blue-500 mt-6 font-extrabold'>
                                    <BsHouse />
                                </div>
                                <h3 className='text-lg font-bold  mt-3'>Easy Property Sales</h3>
                                <p className='text-sm md:text-base'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis ducimus suscipit libero!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services