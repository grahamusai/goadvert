"use client"
import { useState } from 'react';
import pb from '../../../lib/pocketbase';
import { UserSidebar } from '../components/sidebar-app';
import Navbar from '../../components/navbar';

export default function New({ userId }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            // Create a preview URL for the selected image
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!pb.authStore.isValid) {
                throw new Error('You must be logged in to create a post');
            }

            // Create FormData object to handle file upload
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('user', userId);

            // Only append image if one was selected
            if (image) {
                formData.append('image', image);
            }

            // Create the post with the FormData
            await pb.collection('posts').create(formData);

            // Clean up the preview URL
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }

            alert('Ad created successfully!');

            // Reset form
            setTitle('');
            setDescription('');
            setImage(null);
            setImagePreview(null);
        } catch (error) {
            console.error('Error creating ad:', error);
            alert(error.message || 'Failed to create ad.');
        }
    };

    return (
        <>
            <Navbar />
            <UserSidebar />
            <div className='p-4 sm:ml-64'>
                <form onSubmit={handleSubmit} className='flex flex-col max-w-3xl'>
                        <label className="text-lg font text-slate-800 py-2">Post Name</label>
                        <input
                            type="text"
                            placeholder="2 Bed Apartment"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className='border-2 border-black py-2 rounded-md px-2 mb-5'
                        />
                    
                        <label className="text-lg font text-slate-800 py-2">Description</label>
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className='border-2 border-black py-2 rounded-md px-2 mb-5'
                        />

                    <label className="text-lg font text-slate-800 py-2">Feature Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className='mb-3'
                    />

                    {imagePreview && (
                        <div className="mb-5">
                            <p className="text-sm text-slate-600 mb-2">Preview:</p>
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="max-w-md h-auto rounded-lg shadow-sm"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="bg-black px-10 py-2 text-white mt-5 hover:bg-gray-800 transition-colors"
                    >
                        Create Ad
                    </button>
                </form>
            </div>
        </>
    );
}