
import {
  Building2,
  Car,
  Cog,
  Dumbbell,
  GraduationCapIcon as Graduation,
  Headphones,
  Heart,
  Home,
  Hotel,
  Laptop,
  Library,
  ShoppingBag,
  Store,
  Truck,
  Warehouse,
} from "lucide-react"



function CategoryIcon({ icon, label }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-16 h-16 md:w-20 shadow-lg shadow-blue-200 md:h-20 rounded-full bg-blue-600 flex items-center justify-center text-white">
        {icon}
      </div>
      <span className="text-xs md:text-sm text-center font-medium">{label}</span>
    </div>
  )
}

export default function Categories() {
  const categories = [
    { icon: <Building2 className="w-8 h-8" />, label: "Accommodation" },
    { icon: <Store className="w-8 h-8" />, label: "Commercial" },
    { icon: <Home className="w-8 h-8" />, label: "Real Estate & Property" },
    { icon: <Truck className="w-8 h-8" />, label: "Transport & Logistics" },
    { icon: <Building2 className="w-8 h-8" />, label: "Corporate business" },
    { icon: <Dumbbell className="w-8 h-8" />, label: "Body, mind & soul" },
    { icon: <ShoppingBag className="w-8 h-8" />, label: "Online-Shopping" },
    { icon: <Laptop className="w-8 h-8" />, label: "Electronics & Gadgets" },
    { icon: <Graduation className="w-8 h-8" />, label: "Education" },
    { icon: <Library className="w-8 h-8" />, label: "Jobs" },
    { icon: <Headphones className="w-8 h-8" />, label: "Entertainment" },
    { icon: <Heart className="w-8 h-8" />, label: "Healthcare" },
    { icon: <Cog className="w-8 h-8" />, label: "Services" },
    { icon: <Car className="w-8 h-8" />, label: "Car Sales/Rentals" },
    { icon: <Hotel className="w-8 h-8" />, label: "Hotel & Tourism" },
    { icon: <Warehouse className="w-8 h-8" />, label: "Office, Home & Garden" },
  ]

  return (
    <div className="p-6">
      <div className="grid grid-cols-3 md:grid-cols-5 gap-6 md:gap-8">
        {categories.map((category, index) => (
          <CategoryIcon key={index} {...category} />
        ))}
      </div>
    </div>
  )
}

