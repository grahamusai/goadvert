'use client'

import React, { useEffect, useState } from 'react'
import CarListingCard from "./CarListingCard"
import pb from '../../lib/pocketbase'

const CarCard = () => {
    const [cars, setCars] = useState([])

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

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cars.map((car) => (
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
        </div>
    )
}

export default CarCard;