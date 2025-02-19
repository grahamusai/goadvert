'use client'
import React, { useEffect } from 'react'
import { UserSidebar } from '../components/sidebar-app';
import Navbar from '../components/navbar';
import pb from '../../../lib/pocketbase';
import { useRouter } from 'next/navigation';

const NewListing = () => {
  const router = useRouter();

  useEffect(() => {
    if (!pb.authStore.isValid) {
      router.push('/login');
    }
  }, [router]);

  return (
    <>
      <Navbar />
      <UserSidebar />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Create New Listing</h1>
        {/* Add your new listing form component here */}
      </div>
    </>
  )
}

export default NewListing
