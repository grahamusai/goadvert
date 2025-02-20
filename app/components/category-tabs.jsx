'use client'
import { FaCar } from "react-icons/fa";
import { LuTruck, LuHotel, LuBriefcase, LuBuilding2 } from "react-icons/lu";
import { BiCategory } from "react-icons/bi";
import { MdPhonelink } from "react-icons/md";
import { GoFileDirectoryFill } from "react-icons/go";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import PropertyCard from "./propertyCard";
import Categories from "./categories";
import CarCard from "./carCard";
import { GiAmpleDress } from "react-icons/gi";
import PropertyListingCard from "./propertyListingCard";
import { useEffect, useState } from "react";

export function CategoryTabs() {



  return (
    <>
      <Tabs defaultValue="properties" className="hidden md:block w-full my-4 max-w-[80rem] mx-auto">
        {/* Headers */}
        <TabsList>
          <TabsTrigger value="properties" className="w-full "><LuBuilding2 />&nbsp;Properties</TabsTrigger>
          <TabsTrigger value="cars"><FaCar />&nbsp;Cars</TabsTrigger>
          <TabsTrigger value="hotels"><LuHotel />&nbsp;Hotels</TabsTrigger>
          <TabsTrigger value="jobs"><LuBriefcase />&nbsp;Jobs</TabsTrigger>
          <TabsTrigger value="electronics"><MdPhonelink />&nbsp;Electronics</TabsTrigger>
          <TabsTrigger value="logistics"><GiAmpleDress />&nbsp;Clothing</TabsTrigger>
          <TabsTrigger value="business"><GoFileDirectoryFill />&nbsp;Business Directory</TabsTrigger>
          <TabsTrigger value="all" className="w-full bg-blue-500 text-white"><BiCategory />&nbsp;All categories</TabsTrigger>
        </TabsList>

        {/* Content */}

        <TabsContent value="properties" className="">
          <PropertyListingCard />
        </TabsContent>
        <TabsContent value="cars"><CarCard /></TabsContent>
        <TabsContent value="logistics">Logistics</TabsContent>
        <TabsContent value="hotels">Hotels</TabsContent>
        <TabsContent value="jobs">Jobs</TabsContent>
        <TabsContent value="electronics">Electronics</TabsContent>
        <TabsContent value="business">Business Directory</TabsContent>
        <TabsContent value="all" className="">
          <Categories />
        </TabsContent>
      </Tabs>
      <div className="md:hidden">
        <Categories />
      </div>
    </>
  )
}

