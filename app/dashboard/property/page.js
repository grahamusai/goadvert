"use client"
import { useState } from 'react';
import pb from '../../../lib/pocketbase';
import supabase from '../../../lib/supabase';
import { UserSidebar } from '../components/sidebar-app';
import Navbar from '../../components/navbar';

const LISTING_TYPES = [
    'House',
    'Stand',
    'Land',
    'Flat',
    'Apartment',
    'Commercial Property',
    'Other'
];
const LISTING_TERMS = [
    'Paid Monthly',
    'Once Off',
    'Installments'
];

export default function New() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: LISTING_TYPES[0],
        price: '',
        city: '',
        country: '',
        term: LISTING_TERMS[0],
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
                        .from('property-images')
                        .upload(fileName, image);

                    if (uploadError) {
                        throw new Error('Error uploading image: ' + uploadError.message);
                    }

                    // Get the public URL
                    const { data: { publicUrl } } = supabase.storage
                        .from('property-images')
                        .getPublicUrl(fileName);
                    
                    imageUrls.push(publicUrl);
                }
            }

            // Create form data for PocketBase
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('type', formData.type);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('city', formData.city);
            formDataToSend.append('country', formData.country);
            formDataToSend.append('term', formData.term);
            formDataToSend.append('user', authData.id);
            if (imageUrls.length > 0) {
                // Store the array of image URLs as a JSON string
                formDataToSend.append('image_urls', JSON.stringify(imageUrls));
                // Keep the first image as the main image_url for backwards compatibility
                formDataToSend.append('image_url', imageUrls[0]);
            }

            // Create property listing in PocketBase
            await pb.collection('properties').create(formDataToSend);

            setSuccess(true);
            // Reset form
            setFormData({
                name: '',
                description: '',
                type: LISTING_TYPES[0],
                price: '',
                city: '',
                country: '',
                term: LISTING_TERMS[0],
            });
            setImages([]);
            setPreviews([]);
            
        } catch (err) {
            setError(err.message);
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
                        <h1 className="text-2xl font-bold mb-6">Add New Property</h1>

                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                                Property added successfully!
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-2">Property Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">Property Type</label>
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
                            </div>

                            <div>
                                <label className="block mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                    rows="4"
                                    required
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-2">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">Payment Terms</label>
                                    <select
                                        name="term"
                                        value={formData.term}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                    >
                                        {LISTING_TERMS.map((term) => (
                                            <option key={term} value={term}>
                                                {term}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-2">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2">Property Images</label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full p-2 border rounded"
                                />
                                {previews.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {previews.map((preview, index) => (
                                            <img
                                                key={index}
                                                src={preview}
                                                alt={`Preview ${index + 1}`}
                                                className="w-32 h-32 object-cover rounded"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                disabled={loading}
                            >
                                {loading ? 'Adding Property...' : 'Add Property'}
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}