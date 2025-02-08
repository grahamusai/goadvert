import React from 'react';
import Image from 'next/image';
import { FaCartShopping } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import Link from 'next/link';

const Topnav = () => {
  return (
    <div className="w-full container mx-auto max-w-6xl py-2  flex justify-between items-center">
        <Image src="/images/Logo.png" alt="logo" width={60} height={60} />
        <div className="hidden md:flex items-center space-x-4">
            <Link href="#" className="bg-[#d9d9d9] p-4  rounded-full text-slate-700 hover:text-gray-900"><FaCartShopping /></Link>
            <Link href="#" className="bg-[#d9d9d9] p-4  rounded-full text-slate-700 hover:text-gray-900"><HiDotsHorizontal /></Link>
        </div>
    </div>
  )
}

export default Topnav