'use client'

import { UserSidebar } from '../components/sidebar-app';
import Navbar from '../../components/navbar';
import pb from '../../../lib/pocketbase';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import Image from 'next/image';

const Archived = () => {
  const [archivedItems, setArchivedItems] = useState([]);

  useEffect(() => {
    const fetchArchivedItems = async () => {
      try {
        const userId = pb.authStore.model.id;
        
        // Fetch archived posts
        const posts = await pb.collection('posts').getList(1, 50, {
          filter: `user = "${userId}" && isArchived = true`,
          sort: '-created'
        });

        // Fetch archived cars (previously named vehicles)
        const cars = await pb.collection('cars').getList(1, 50, {
          filter: `user = "${userId}" && isArchived = true`,
          sort: '-created'
        });

        // Fetch archived properties
        const properties = await pb.collection('properties').getList(1, 50, {
          filter: `user = "${userId}" && isArchived = true`,
          sort: '-created'
        });

        // Combine all archived items
        const allArchivedItems = [
          ...posts.items.map(item => ({ ...item, type: 'post' })),
          ...cars.items.map(item => ({ ...item, type: 'car' })),
          ...properties.items.map(item => ({ ...item, type: 'property' }))
        ].sort((a, b) => new Date(b.created) - new Date(a.created));

        setArchivedItems(allArchivedItems);
      } catch (error) {
        console.error('Error fetching archived items:', error);
      }
    };

    if (pb.authStore.isValid) {
      fetchArchivedItems();
    }
  }, []);

  return (
    <div>
      <Navbar />
      <UserSidebar />
      <div className="flex max-w-6xl mx-auto ml-64">
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">Archived Items</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {archivedItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative w-full h-48">
                  {item.image && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${item.collectionId}/${item.id}/${item.image}`}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{item.name}</CardTitle>
                    <span className="text-sm text-gray-500 capitalize">{item.type}</span>
                  </div>
                  <CardDescription>${item.price}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Archived;