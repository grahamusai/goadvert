"use client"
import * as React from "react"
import { useState, useEffect } from "react";
import pb from '../../../lib/pocketbase' // Import pocketbase instance
import { FaHeart } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FaBoxArchive } from "react-icons/fa6";

export function UserSidebar() {

  const [user, setUser] = useState(null)
  // Get the current user's name
  useEffect(() => {
    const authData = pb.authStore.model
    if (authData) {
      setUser(authData)
    }
  }, [])

  return (
    <>

      <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-20 mt-28 mx-5 rounded-2xl overflow-y-auto bg-[#1C274C] dark:bg-gray-800">
          <h3 className="text-slate-200 font-bold mb-10">Hello {pb.authStore.model?.name || "Guest"}</h3>
          <ul className="space-y-2 font-medium">
            <li>
              <a href="#" className="flex items-center p-2 text-slate-300 rounded-lg dark:text-white hover:bg-slate-800 dark:hover:bg-gray-700 group">
                <MdSpaceDashboard />
                <span className="ms-3">Dashboard</span>
              </a>
            </li>

            <li>
              <a href="#" className="flex items-center p-2 text-slate-300 rounded-lg dark:text-white hover:bg-slate-800 dark:hover:bg-gray-700 group">
                <FaCirclePlus />
                <span className="flex-1 ms-3 whitespace-nowrap">Post an Ad</span>

              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-slate-300 rounded-lg dark:text-white hover:bg-slate-800 dark:hover:bg-gray-700 group">

                <FaFileAlt />
                <span className="flex-1 ms-3 whitespace-nowrap">My Ads</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">0</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-slate-300 rounded-lg dark:text-white hover:bg-slate-800 dark:hover:bg-gray-700 group">
                <FaHeart />
                <span className="flex-1 ms-3 whitespace-nowrap">Favourite Ads</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-slate-300 rounded-lg dark:text-white hover:bg-slate-800 dark:hover:bg-gray-700 group">
                <FaHeart />
                <span className="flex-1 ms-3 whitespace-nowrap">Plans & Billing </span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-slate-300 rounded-lg dark:text-white hover:bg-slate-800 dark:hover:bg-gray-700 group">
                <IoSettings />
                <span className="flex-1 ms-3 whitespace-nowrap">Account Settings</span>
              </a>
            </li>

            <li>
              <a href="#" className="flex items-center p-2 text-slate-300 rounded-lg dark:text-white hover:bg-slate-800 dark:hover:bg-gray-700 group">
                <FaSignOutAlt />
                <span className="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="flex items-center justify-center gap-5">
            <div className="w-full md:w-1/3 bg-[#E8F7FF] rounded-md p-5 flex items-center justify-between">
              <div>
              <h2 className="text-2xl font-bold">20</h2>
              <p>Posted Ads</p>
              </div>
              <div className="text-4xl text-blue-400 bg-white/50 p-2 rounded-md">
                <FaFileAlt />
              </div>
            </div>
            <div className="w-full md:w-1/3 bg-[#E8F7FF] rounded-md p-5 flex items-center justify-between">
              <div>
              <h2 className="text-2xl font-bold">20</h2>
              <p>Favourite Ads</p>
              </div>
              <div className="text-4xl text-green-500 bg-white/50 p-2 rounded-md">
                <FaHeart />
              </div>
            </div>
            <div className="w-full md:w-1/3 bg-[#FFE5E5] rounded-md p-5 flex items-center justify-between">
              <div>
              <h2 className="text-2xl font-bold">20</h2>
              <p>Expired Ads</p>
              </div>
              <div className="text-4xl text-red-400 bg-white/50 p-2 rounded-md">
                <FaBoxArchive />
              </div>
            </div>
           


          </div>
        </div>
      </div>
    </>


  )
}