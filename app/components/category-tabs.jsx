'use client'
import { FaCar } from "react-icons/fa";
import { LuTruck, LuHotel, LuBriefcase, LuBuilding2 } from "react-icons/lu";
import { BiCategory } from "react-icons/bi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import PropertyCard from "./propertyCard";
import CarCard from "./carCard";
import pb from '../../lib/pocketbase'
import { useEffect, useState } from "react";

export function CategoryTabs() {

  const [userproperties, setUserproperties] = useState([]);

  useEffect(() => {
    const fetchUserproperties = async () => {
      try {
        const userId = pb.authStore.model.id
        const records = await pb.collection('properties').getList(1, 50, {
          filter: `user = "${userId}"`,
          sort: '-created'
        });
        setUserproperties(records.items)
      } catch (error) {
        console.error('Error fetching properties:', error)
      }
    }

    if (pb.authStore.isValid) {
      fetchUserproperties()
    }
  }, [])

  return (
    <>
      <Tabs defaultValue="all" className="w-full my-4 mx-auto max-w-6xl">
        {/* Headers */}
        <TabsList>
          <TabsTrigger value="all" className="w-full bg-blue-500 text-white"><BiCategory />&nbsp;All categories</TabsTrigger>
          <TabsTrigger value="properties" className="w-full "><LuBuilding2 />&nbsp;Properties</TabsTrigger>
          <TabsTrigger value="cars"><FaCar />&nbsp;Cars</TabsTrigger>
          <TabsTrigger value="hotels"><LuHotel />&nbsp;Hotels</TabsTrigger>
          <TabsTrigger value="jobs"><LuBriefcase />&nbsp;Jobs</TabsTrigger>
          <TabsTrigger value="electronics"><LuBriefcase />&nbsp;Electronics</TabsTrigger>
          <TabsTrigger value="logistics"><LuTruck />&nbsp;Logistics</TabsTrigger>
        </TabsList>

        {/* Content */}
        <TabsContent value="properties" className="col-span-3">
          <div className="">
            {userproperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="cars"><CarCard /></TabsContent>
        <TabsContent value="logistics">Logistics</TabsContent>
        <TabsContent value="hotels">Hotels</TabsContent>
        <TabsContent value="jobs">Jobs</TabsContent>
        <TabsContent value="electronics">Electronics</TabsContent>
      </Tabs>

    </>
  )
}

