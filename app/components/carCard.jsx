'use client'

import React, { useEffect, useState } from 'react'
import CarListingCard from "./CarListingCard"
import pb from '../../lib/pocketbase'
import { useRouter } from 'next/navigation' // Import useRouter for navigation

const CarCard = () => {
    const [cars, setCars] = useState([])
    const router = useRouter() // Initialize useRouter

    useEffect(() => {
        async function fetchCars() {
            try {
                const records = await pb.collection('cars').getList(1, 50, {
                    sort: '-created'
                });
                setCars(records.items);
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        }

        fetchCars();
    }, []);

    // Slice the cars array to only show the first 8 items
    const displayedCars = cars.slice(0, 8)

    return (
        <div >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                {displayedCars.map((car) => (
                    <CarListingCard
                        key={car.id}
                        make={car.make}
                        model={car.model}
                        year={car.year}
                        price={car.price}
                        mileage={car.mileage}
                        fuelType={car.fuelType}
                        transmission={car.transmission}
                        imageUrl={car.image_url}
                        title={car.title}
                        description={car.description}
                    />
                ))}
            </div>
            {/* Add a "View All Cars" button */}
            {cars.length > 8 && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => router.push('/cars')} // Redirect to /cars
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        View All Cars
                    </button>
                </div>
            )}
        </div>
    )
}

export default CarCard;