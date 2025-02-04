import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Search } from 'lucide-react'


export default function PropertySearch() {
  return (
    <section>
      <div className="w-full bg-[#020B2D] py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-center text-4xl md:text-6xl font-bold text-white mb-4">
            Buy, Sell or Rent
          </h1>
         

          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Toggle Buttons */}
              <div className="flex rounded-md overflow-hidden border">
              <Button color="primary">Button</Button>
                <div className="w-px bg-border" />
                <Button
                  variant="ghost"
                  className="flex-1 rounded-none hover:bg-accent"
                >
                  Services
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
      
    </section>

  )
}

