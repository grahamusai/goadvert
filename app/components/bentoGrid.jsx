import Image from "next/image"
import { MapPin } from 'lucide-react'

const locations = [
  {
    city: "Harare",
    listings: 25,
    imageUrl: "/images/harare.jpg",
  },
  {
    city: "Bulawayo",
    listings: 25,
    imageUrl: "/images/bulawayo.jpg",
  },
  {
    city: "Mutare",
    listings: 25,
    imageUrl: "/images/mutare.jpg",
  },
  {
    city: "Johannesburg",
    listings: 25,
    imageUrl: "/images/joburg.jpg",
  },
  {
    city: "Capetown",
    listings: 25,
    imageUrl: "/images/capetown.jpg",
  },
  {
    city: "Pretoria",
    listings: 25,
    imageUrl: "/images/pretoria.jpg",
  },
]

export default function BentoGrid() {
  return (
    <div className="container max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 auto-rows-[240px]">
        {locations.map((location, index) => {
          // Define the column span classes based on index
          const isWide = index === 3 // Bulawayo
          const colSpanClass = "md:col-span-2"

          return (
            <div
              key={location.city}
              className={`group relative overflow-hidden rounded-3xl ${colSpanClass} bg-gray-100 hover:shadow-xl transition-shadow`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={location.imageUrl}
                  alt={location.city}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes={isWide ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
              </div>

              {/* Content */}
              <div className="relative h-full p-6 flex flex-col justify-between text-white">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm font-medium">{location.city}</span>
                </div>
                <div>
                  <p className="text-sm opacity-90">{location.listings} listings</p>
                </div>
              </div>

              {/* Clickable Area */}
              <a href="/" className="absolute inset-0">
                <span className="sr-only">View listings in {location.city}</span>
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}

