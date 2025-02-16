"use client"
import { useState } from 'react';
import pb from '../../../lib/pocketbase';
import supabase from '../../../lib/supabase';
import { UserSidebar } from '../components/sidebar-app';
import Navbar from '../../components/navbar';

const LISTING_TYPES = [
  'Accomodation',
  'Commercial',
  'Real Estate',
  'Transport',
  'Business',
  'Mind, Body & Soul',
  'Online-Shopping',
  'Electronics & Gadgets',
  'Education',
  'Jobs',
  'Entertainment',
  'Healthcare',
  'Services',
  'Car Sales/Rentals',
  'Hotel & Tourism',
  'Office, Home & Garden',
];

export default function New() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: LISTING_TYPES[0],
    price: '',
  });
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImages(files);
      // Create preview URLs for all selected images
      const newPreviews = files.map(file => URL.createObjectURL(file));
      // Revoke old preview URLs to avoid memory leaks
      previews.forEach(preview => URL.revokeObjectURL(preview));
      setPreviews(newPreviews);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Check if user is authenticated
      const authData = pb.authStore.model;
      if (!authData) {
        throw new Error('You must be logged in to create a post');
      }

      let imageUrls = [];
      
      if (images.length > 0) {
        // Upload all images to Supabase Storage
        for (const image of images) {
          const fileExt = image.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const { data, error: uploadError } = await supabase.storage
            .from('listing-images')
            .upload(fileName, image);

          if (uploadError) {
            throw new Error('Error uploading image: ' + uploadError.message);
          }

          // Get the public URL
          const { data: { publicUrl } } = supabase.storage
            .from('listing-images')
            .getPublicUrl(fileName);
          
          imageUrls.push(publicUrl);
        }
      }

      // Create form data for PocketBase
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('price', parseFloat(formData.price));
      formDataToSend.append('user', authData.id);
      formDataToSend.append('username', authData.username);
      
      if (imageUrls.length > 0) {
        // Store the array of image URLs as a JSON string
        formDataToSend.append('image_urls', JSON.stringify(imageUrls));
        // Keep the first image as the main image_url for backwards compatibility
        formDataToSend.append('image_url', imageUrls[0]);
      }

      // Using the imported pb instance
      await pb.collection('posts').create(formDataToSend);
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        type: LISTING_TYPES[0],
        price: '',
      });
      setImages([]);
      setPreviews([]);
      setSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      
        <UserSidebar />
        <div className="flex">
        <main className="flex-1 p-6">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Add New Listing</h1>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                LISTING added successfully!
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded active:outline-none"
                />
              </div>
              
              <div>
                <label className="block mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded h-32"
                />
              </div>
              
              <div>
                <label className="block mb-2">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  {LISTING_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block mb-2">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded"
                />
                {previews.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {previews.map((preview, index) => (
                      <img
                        key={index}
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className={`w-full p-2 text-white rounded ${
                  loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {loading ? 'Adding LISTING...' : 'Add LISTING'}
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}