'use client'
import { LuBuilding2 } from "react-icons/lu";
import { FaCar } from "react-icons/fa";
import { LuTruck } from "react-icons/lu";
import { LuHotel } from "react-icons/lu";
import { LuBriefcase } from "react-icons/lu";
import { BiCategory } from "react-icons/bi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import PropertyCard from "./propertyCard";
import CarCard from "./carCard";
import CarListingCard from "./CarListingCard";

export function CategoryTabs() {
  return (
    <>
      <Tabs defaultValue="all" className="w-full my-4 mx-auto max-w-6xl">
        {/* Headers */}
        <TabsList>
          <TabsTrigger value="all" className="w-full bg-blue-500 text-white"><BiCategory />&nbsp;All categories</TabsTrigger>
          <TabsTrigger value="properties" className="w-full "><LuBuilding2 />&nbsp;Properties</TabsTrigger>
          <TabsTrigger value="cars"><FaCar />&nbsp;Cars</TabsTrigger>
          <TabsTrigger value="logistics"><LuTruck />&nbsp;Logistics</TabsTrigger>
          <TabsTrigger value="hotels"><LuHotel />&nbsp;Hotels</TabsTrigger>
          <TabsTrigger value="jobs"><LuBriefcase />&nbsp;Jobs</TabsTrigger>
        </TabsList>

        {/* Content */}
        <TabsContent value="properties">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <PropertyCard />
            <PropertyCard />
            <PropertyCard />
          </div>
        </TabsContent>
        <TabsContent value="cars"><CarCard /></TabsContent>
        <TabsContent value="logistics">Logistics</TabsContent>
        <TabsContent value="hotels">Hotels</TabsContent>
        <TabsContent value="jobs">Jobs</TabsContent>
      </Tabs>

    </>
  )
}

