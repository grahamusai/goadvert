'use client'
import React, { useEffect } from 'react'
import { UserSidebar } from '../components/sidebar-app';
import Navbar from '../components/navbar';
import pb from '../../../lib/pocketbase';
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { toast } from "sonner"
import { useRouter } from 'next/navigation';

const Account = () => {
  const router = useRouter();
  const LISTING_TYPES = [
    'Basic',
    'Premium',
    'Business',
  ];

  useEffect(() => {
    if (!pb.authStore.isValid) {
      router.push('/login');
    }
  }, [router]);

  return (
    <>
      <Navbar />
      <UserSidebar />
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Change UserName</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Change Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Whatsapp Number</Label>
            <Input id="number" type="number" placeholder="Enter WhatApp Number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Upgrade Account</Label>
            <select
              name="type"

              className="w-full p-2 border rounded"
            >
              {LISTING_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Change Password</Label>
            <Input id="password" type="password" placeholder="Enter your new password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="logo">Logo</Label>
            <Input id="logo" type="file" accept="image/*" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-blue-600">Save Changes</Button>
        </CardFooter>
      </Card>
    </>
  )
}

export default Account