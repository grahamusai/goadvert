"use client"
import { useState } from 'react';
import pb from '../../../lib/pocketbase';
import supabase from '../../../lib/supabase';
import { UserSidebar } from '../components/sidebar-app';
import Navbar from '../../components/navbar';

const LISTING_TYPES = [
    'Car',
    'Truck',
    'Motorcycle',
    'Bike',
    'Boat',
    'Other'
];
const TRANSMISSIONS = [
    'Manual',
    'Automatic'
];
const FUEL_TYPES = [
    'Gas',
    'Diesel',
    'Electric',
    'LPG',
    'CNG',
    'Hybrid',
    'Other'
];

export default function New() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        make: '',
        model: '',
        year: '',
        price: '',
        mileage: '',
        type: LISTING_TYPES[0],
        transmission: TRANSMISSIONS[0],
        fuelType: FUEL_TYPES[0],
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
                        .from('vehicle-images')
                        .upload(fileName, image);

                    if (uploadError) {
                        throw new Error('Error uploading image: ' + uploadError.message);
                    }

                    // Get the public URL
                    const { data: { publicUrl } } = supabase.storage
                        .from('vehicle-images')
                        .getPublicUrl(fileName);
                    
                    imageUrls.push(publicUrl);
                }
            }

            // Create form data for PocketBase
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('make', formData.make);
            formDataToSend.append('model', formData.model);
            formDataToSend.append('year', formData.year);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('mileage', formData.mileage);
            formDataToSend.append('transmission', formData.transmission);
            formDataToSend.append('fuelType', formData.fuelType);
            formDataToSend.append('user', authData.id);
            if (imageUrls.length > 0) {
                // Store the array of image URLs as a JSON string
                formDataToSend.append('image_urls', JSON.stringify(imageUrls));
                // Keep the first image as the main image_url for backwards compatibility
                formDataToSend.append('image_url', imageUrls[0]);
            }

            // Create vehicle listing in PocketBase
            await pb.collection('cars').create(formDataToSend);

            setSuccess(true);
            // Reset form
            setFormData({
                title: '',
                description: '',
                make: '',
                model: '',
                year: '',
                price: '',
                mileage: '',
                transmission: TRANSMISSIONS[0],
                fuelType: FUEL_TYPES[0],
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
                        <h1 className="text-2xl font-bold mb-6">Add New Vehicle</h1>

                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                                Vehicle added successfully!
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <label className="block mb-2">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-2 border rounded active:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">Type</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-2 border rounded active:outline-none"
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
                                    required
                                    className="w-full p-2 border rounded h-32"
                                />
                            </div>

                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <label className="block mb-2">Make</label>
                                    <input
                                        type="text"
                                        name="make"
                                        value={formData.make}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-2 border rounded active:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">Model</label>
                                    <input
                                        type="text"
                                        name="model"
                                        value={formData.model}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-2 border rounded active:outline-none"
                                    />
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <label className="block mb-2">Year</label>
                                    <input
                                        type="number"
                                        name="year"
                                        value={formData.year}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-2 border rounded active:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-2 border rounded active:outline-none"
                                    />
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <label className="block mb-2">Mileage</label>
                                    <input
                                        type="text"
                                        name="mileage"
                                        value={formData.mileage}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-2 border rounded active:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">Fuel Type</label>
                                    <select
                                        name="fuelType"
                                        value={formData.fuelType}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-2 border rounded active:outline-none"
                                    >
                                        {FUEL_TYPES.map((fuelType) => (
                                            <option key={fuelType} value={fuelType}>
                                                {fuelType}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <label className="block mb-2">Transmission</label>
                                    <select
                                        name="transmission"
                                        value={formData.transmission}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-2 border rounded active:outline-none"
                                    >
                                        {TRANSMISSIONS.map((transmission) => (
                                            <option key={transmission} value={transmission}>
                                                {transmission}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2">Feature Images</label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full p-2 border rounded"
                                />
                                {previews.length > 0 && (
                                    <div className="mt-2">
                                        {previews.map((preview, index) => (
                                            <img
                                                key={index}
                                                src={preview}
                                                alt="Preview"
                                                className="max-w-xs rounded mr-2"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full p-2 text-white rounded ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                                    }`}
                            >
                                {loading ? 'Adding LISTING...' : 'Add Vehicle'}
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}