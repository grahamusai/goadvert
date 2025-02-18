import React from 'react'
import { UserSidebar } from '../components/sidebar-app';
import Navbar from '../../components/navbar';

const Businesss = () => {
  return (
    <>
      <Navbar />
      <UserSidebar />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Add New Business</h1>

      </div>
    </>
  )
}

export default Businesss