import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import Link from "next/link";
import { FaHouse } from "react-icons/fa6";
import { FaCar } from "react-icons/fa";
import { FaTruckMoving } from "react-icons/fa6";
import { FaHotel } from "react-icons/fa";
import { MdBusinessCenter } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { TbGridDots } from "react-icons/tb";

export default function PropertySearch() {
  return (
    <section>
      <div className="w-full bg-[#020B2D] py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-center text-4xl md:text-6xl font-bold text-white mb-4">
            Buy, Sell or Rent
          </h1>
          <p className="text-center text-gray-300 mb-8 max-w-3xl mx-auto">
            Are you looking for an effective way to advertise your business, products, and services? By placing ads here website, businesses can reach a large audience quickly and cheaply.
          </p>

          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Toggle Buttons */}
              <div className="flex rounded-md overflow-hidden border">
                <Button
                  variant="ghost"
                  className="flex-1 rounded-none bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Rent
                </Button>
                <div className="w-px bg-border" />
                <Button
                  variant="ghost"
                  className="flex-1 rounded-none hover:bg-accent"
                >
                  Sell
                </Button>
              </div>

              {/* Search Fields */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Location Input */}
                <div className="flex md:col-span-1">
                  <Input
                    type="text"
                    placeholder="City, Region, Country"
                    className="rounded-r-none"
                  />
                  <Input
                    type="text"
                    placeholder="+10km"
                    className="max-w-[80px] rounded-l-none border-l-0"
                  />
                </div>

                {/* Price Range */}
                <Input
                  type="text"
                  placeholder="Prices From"
                  className="md:col-span-1"
                />

                {/* Rooms */}
                <Input
                  type="text"
                  placeholder="Rooms From"
                  className="md:col-span-1"
                />

                {/* Action Buttons */}
                <div className="flex gap-2 md:col-span-1">
                  <Button variant="outline" className="flex-1">
                    More Filters
                  </Button>
                  <Button className="flex-1">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-white py-12 px-4 flex justify-center items-center gap-4">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-lg text-center text-white">
          <Link href="/">
            <div className="flex justify-center items-center gap-2">
              <FaHouse /> |
              <h3 className="">
                Properties
              </h3>
            </div>
          </Link>
        </div>
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-lg text-center text-white">
          <Link href="/">
            <div className="flex justify-center items-center gap-2">
              <FaCar /> |
              <h3 className="">
                Vehicles
              </h3>
            </div>
          </Link>
        </div>
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-lg text-center text-white">
          <Link href="/">
            <div className="flex justify-center items-center gap-2">
              <FaTruckMoving /> |
              <h3 className="">
                Logistics
              </h3>
            </div>
          </Link>
        </div>
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-lg text-center text-white">
          <Link href="/">
            <div className="flex justify-center items-center gap-2">
              <FaHotel /> |
              <h3 className="">
                Hotels
              </h3>
            </div>
          </Link>
        </div>
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-lg text-center text-white">
          <Link href="/">
            <div className="flex justify-center items-center gap-2">
              <FaMoneyBillTrendUp /> |
              <h3 className="">
                Businesses
              </h3>
            </div>
          </Link>
        </div>
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-lg text-center text-white">
          <Link href="/">
            <div className="flex justify-center items-center gap-2">
              <MdBusinessCenter /> |
              <h3 className="">
                Jobs
              </h3>
            </div>
          </Link>
        </div>
        <div className="bg-gray-300 p-4 rounded-lg text-center text-slate-700">
          <Link href="/">
            <div className="flex justify-center items-center gap-2">
              <TbGridDots /> |
              <h3 className="">
                Other
              </h3>
            </div>
          </Link>
        </div>
      </div>
    </section>

  )
}

