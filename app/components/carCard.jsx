import React from 'react'
import CarListingCard from "./CarListingCard"

const CarCard = () => {

    const sampleCars = [
        {
          make: "Toyota",
          model: "Camry",
          year: 2022,
          price: 25000,
          mileage: 15000,
          fuelType: "Gasoline",
          transmission: "Automatic",
          imageUrl: "/images/mini.jpg",
        },
        {
          make: "Tesla",
          model: "Model 3",
          year: 2023,
          price: 45000,
          mileage: 5000,
          fuelType: "Electric",
          transmission: "Automatic",
          imageUrl: "/images/camry.webp",
        },
        {
          make: "Ford",
          model: "F-150",
          year: 2021,
          price: 35000,
          mileage: 20000,
          fuelType: "Diesel",
          transmission: "Automatic",
          imageUrl: "/images/mini.jpg",
        },
      ]
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleCars.map((car, index) => (
          <CarListingCard key={index} {...car} />
        ))}
      </div>
    </div>
  )
}

export default CarCard;