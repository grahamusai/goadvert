"use client"

import React from "react"

import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Textarea } from "../../../components/ui/textarea"

export default function BusinessListingForm() {
  const [operatingHours, setOperatingHours] = useState({
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  })

  const handleOperatingHoursChange = (day, value) => {
    setOperatingHours((prev) => ({ ...prev, [day]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Handle form submission here
    console.log("Form submitted")
    setLoading(true)
    setError('')
    setSuccess(false)
    try {
      const authData = pb.authStore.model
      if (!authData) {
        throw new Error("You must be logged in to create a business")
      }
      let imagesUrl = []
      if (imagesUrl.length > 0) {
        // Upload all images to Supabase Storage
        for (const image of images){
          const fileExt = image.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const { data, error: uploadError } = await supabase.storage.from('business-images').upload(fileName, image);
          if (uploadError) {
            throw new Error('Error uploading image: ' + uploadError.message);
          }
          // Get the public URL
          const { data: { publicUrl } } = supabase.storage.from('business-images').getPublicUrl(fileName);
          imagesUrl.push(publicUrl);
        }
      }
      // Create for data for Pocketbase
      const businessData = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('country', formData.country);
      formDataToSend.append('term', formData.term);
      formDataToSend.append('images', imagesUrl);
      if (imageUrls.length > 0) {
        formDataToSend.append('images', JSON.stringify(imageUrls));
        formDataToSend.append('images', JSON.stringify(imageUrls));
      }
      formDataToSend.append('operating_hours', JSON.stringify(operatingHours));
      const { data, error } = await pb.collection('businesses').create(businessData);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>List Your Business</CardTitle>
        <CardDescription>Fill out the form below to add your business to our directory.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input id="businessName" placeholder="Enter your business name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Business Category</Label>
            <Select required>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="restaurant">Restaurant</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="service">Service</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Describe your business" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" placeholder="Enter your business address" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="Enter phone number" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter email address" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website URL</Label>
            <Input id="website" type="url" placeholder="https://www.example.com" />
          </div>

          <div className="space-y-2">
            <Label>Operating Hours</Label>
            {Object.keys(operatingHours).map((day) => (
              <div key={day} className="flex items-center space-x-2">
                <Label htmlFor={day} className="w-24">
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </Label>
                <Input
                  id={day}
                  placeholder="e.g. 9:00 AM - 5:00 PM"
                  value={operatingHours[day]}
                  onChange={(e) => handleOperatingHoursChange(day, e.target.value)}
                />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Logo</Label>
            <Input id="logo" type="file" accept="image/*" />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Submit Listing
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
