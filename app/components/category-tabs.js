'use client'

import { Building2, Car, Truck, Building, LayoutGrid, BriefcaseBusiness } from 'lucide-react'
import { cn } from "../../lib/utils"

const categories = [
  {
    id: "properties",
    label: "Properties",
    icon: Building2,
  },
  {
    id: "cars",
    label: "Cars",
    icon: Car,
  },
  {
    id: "logistics",
    label: "Logistics",
    icon: Truck,
  },
  {
    id: "hotels",
    label: "Hotels",
    icon: Building,
  },
  {
    id: "properties-2",
    label: "Jobs",
    icon: BriefcaseBusiness,
  },
]

export function CategoryTabs() {
  return (
    <div className="hidden md:flex justify-center items-center mt-5">
      <button className="flex items-center gap-2 font-bold rounded-tr-[20px] bg-gradient-to-r from-[#0171EE] to-[#00A7F6] text-white px-7 py-5 mr-4">
        <LayoutGrid className="h-5 w-5" />
        All Categories
      </button>
      <nav className="flex gap-[75px] p-1 bg-white rounded-lg shadow-xl shadow-[#0171EE]/[.2]">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <button
              key={category.id}
              className={cn(
                "flex items-center gap-2 px-4 py-3  transition-colors",
                "hover:bg-blue-50",
                category.id === "properties" && "border-b-2 border-blue-500 bg-blue-50 shadow-sm"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{category.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

