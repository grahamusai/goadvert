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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
    setPreviews([]);
    for (const file of e.target.files) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviews((prevPreviews) => [...prevPreviews, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Upload images to Supabase
      const imageUrls = [];
      if (images.length > 0) {
        for (const image of images) {
          const fileName = `${Date.now()}-${image.name}`;
          const { data, error: uploadError } = await supabase.storage
            .from('listing-images')
            .upload(fileName, image);

          if (uploadError) throw uploadError;

          // Get the public URL for the uploaded image
          const { data: { publicUrl } } = supabase.storage
            .from('listing-images')
            .getPublicUrl(fileName);

          imageUrls.push(publicUrl);
        }
      }

      // Create post in PocketBase
      const postData = {
        ...formData,
        image_url: imageUrls.join(','), // Store multiple image URLs as comma-separated string
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        user: pb.authStore.model.id // Associate with current user
      };

      await pb.collection('posts').create(postData);

      setSuccess(true);
      setFormData({
        name: '',
        description: '',
        type: LISTING_TYPES[0],
        price: '',
      });
      setImages([]);
      setPreviews([]);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Failed to create listing');
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
                Listing added successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name/Title</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded active:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-2 border rounded h-32"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded active:outline-none"
                  required
                >
                  {LISTING_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded active:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-blue-700 hover:file:bg-indigo-100"
                />
              </div>

              {previews.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {previews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
              >
                {loading ? 'Creating...' : 'Create Listing'}
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}