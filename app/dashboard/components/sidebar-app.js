"use client"
import * as React from "react"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import pb from '../../../lib/pocketbase' // Import pocketbase instance
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { Archive } from "lucide-react"
import { FaHeart } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { GoFileDirectoryFill } from "react-icons/go";
import { FaCirclePlus, FaBoxArchive } from "react-icons/fa6";
import { FaSignOutAlt, FaCar, FaFileAlt } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FaMoneyBillWave, FaClipboardList } from "react-icons/fa";
import { LuBuilding2 } from "react-icons/lu";

export function UserSidebar() {

  const router = useRouter();

  const [user, setUser] = useState(null)
  const [postsCount, setPostsCount] = useState(0)
  const [archivedPostsCount, setArchivedPostsCount] = useState(0) // New state for archived posts count

  useEffect(() => {
    const authData = pb.authStore.model
    if (authData) {
      setUser(authData)
      // Fetch user's posts count
      const fetchPostsCount = async () => {
        try {
          const records = await pb.collection('posts').getList(1, 1, {
            filter: `user = "${authData.id}"`,
          });
          setPostsCount(records.totalItems);
        } catch (error) {
          console.error('Error fetching posts count:', error);
        }
      };

      // Fetch user's archived posts count
      const fetchArchivedPostsCount = async () => {
        try {
          const records = await pb.collection('posts').getList(1, 1, {
            filter: `user = "${authData.id}" && isArchived = true`, // Assuming the field is `isArchived`
          });
          setArchivedPostsCount(records.totalItems);
        } catch (error) {
          console.error('Error fetching archived posts count:', error);
        }
      };

      fetchPostsCount();
      fetchArchivedPostsCount();
    }
  }, [])

  return (
    <>
      <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-20 mt-28 mx-5 rounded-2xl overflow-y-auto bg-[#1C274C] dark:bg-gray-800">
          <h3 className="text-slate-200 font-bold mb-10">Hello {pb.authStore.model?.name || "Guest"}</h3>
          <ul className="space-y-2 font-medium">
            <li>
              <a href="/dashboard" className="flex items-center p-2 text-slate-300 rounded-lg dark:text-white hover:bg-slate-800 dark:hover:bg-gray-700 group">
                <MdSpaceDashboard />
                <span className="ms-3">Dashboard</span>
              </a>
            </li>

            <li>
              <Popover>
                <PopoverTrigger className="flex items-center p-2 text-slate-300 rounded-lg dark:text-white hover:bg-slate-800 dark:hover:bg-gray-700 group"> <FaCirclePlus /><span className="flex-1 ms-3 whitespace-nowrap">Post an Ad</span></PopoverTrigger>
                <PopoverContent className="w-80 bg-slate-800 ">
                  <a href="/dashboard/property" className="hover:bg-slate-900 dark:hover:bg-gray-700 group">
                    <div className=" flex items-center text-slate-300 ">
                      <LuBuilding2 />
                      <h2 className="pl-3">Property</h2>
                    </div>
                  </a>

                  <hr className="my-3" />
                  <a href="/dashboard/vehicle">
                    <div className=" flex items-center text-slate-300 ">
                      <FaCar />
                      <h2 className="pl-3">Vehicle</h2>
                    </div>
                  </a>
                  <hr className="my-3" />
                  <a href="/dashboard/business">
                    <div className=" flex items-center text-slate-300 ">
                      <GoFileDirectoryFill />
                      <h2 className="pl-3">Business Listing</h2>
                    </div>
                  </a>
                  <hr className="my-3" />
                  <a href="/dashboard/new">
                    <div className=" flex items-center text-slate-300 ">
                      <FaClipboardList />
                      <h2 className="pl-3">Other Listing</h2>
                    </div>
                  </a>
                </PopoverContent>
              </Popover>
            </li>
            <li>
              <a href="/dashboard/listings" className="flex items-center p-2 text-slate-300 rounded-lg dark:text-white hover:bg-slate-800 dark:hover:bg-gray-700 group">
                <FaFileAlt />
                <span className="flex-1 ms-3 whitespace-nowrap">My Ads</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">{postsCount}</span>
              </a>
            </li>
            <li>
              <a href="/dashboard/archived" className="flex items-center p-2 text-slate-300 rounded-lg dark:text-white hover:bg-slate-800 dark:hover:bg-gray-700 group">
              <Archive className="h-4 w-4" />
                <span className="flex-1 ms-3 whitespace-nowrap">Archived</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-slate-300 rounded-lg dark:text-white hover:bg-slate-800 dark:hover:bg-gray-700 group">
                <FaMoneyBillWave />
                <span className="flex-1 ms-3 whitespace-nowrap">Plans & Billing </span>
              </a>
            </li>
            <li>
              <a href="/dashboard/account" className="flex items-center p-2 text-slate-300 rounded-lg dark:text-white hover:bg-slate-800 dark:hover:bg-gray-700 group">
                <IoSettings />
                <span className="flex-1 ms-3 whitespace-nowrap">Account Settings</span>
              </a>
            </li>

            <li>
              <button onClick={() => {
                pb.authStore.clear();
                router.push('/');
              }} className="w-full flex items-center p-2 text-slate-300 rounded-lg dark:text-white hover:bg-slate-800 dark:hover:bg-gray-700 group">
                <FaSignOutAlt />
                <span className="pl-2">Sign Out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="flex items-center justify-center gap-5">
            <div className="w-full md:w-1/3 bg-[#E8F7FF] rounded-md p-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{postsCount}</h2>
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
                <FaBoxArchive />
              </div>
            </div>
            <div className="w-full md:w-1/3 bg-[#FFE5E5] rounded-md p-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{archivedPostsCount}</h2> {/* Display archived posts count */}
                <p>Archived Ads</p>
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