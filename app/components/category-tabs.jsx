'use client'
import { FaCar } from "react-icons/fa";
import { LuTruck, LuHotel, LuBriefcase, LuBuilding2 } from "react-icons/lu";
import { BiCategory } from "react-icons/bi";
import { MdPhonelink } from "react-icons/md";
import { GoFileDirectoryFill } from "react-icons/go";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import PostsCard from "./postsCard";
import Categories from "./categories";
import CarCard from "./carCard";
import { GiAmpleDress } from "react-icons/gi";
import PropertyListingCard from "./propertyListingCard";
import { useEffect, useState } from "react";
import pb from '../../lib/pocketbase';
export function CategoryTabs() {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    async function fetchPosts() {
      try {
        const records = await pb.collection('posts').getList(1, 50, {
          sort: '-created',
        });
        setPosts(records.items);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
    fetchPosts();
  }, []);

  const filterPostsByType = (type) => {
    return posts.filter(post => post.type.toLowerCase() === type.toLowerCase());
  };

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
          <TabsTrigger value="clothing"><GiAmpleDress />&nbsp;Clothing</TabsTrigger>
          <TabsTrigger value="business"><GoFileDirectoryFill />&nbsp;Business Directory</TabsTrigger>
          <TabsTrigger value="all" className="w-full bg-blue-500 text-white"><BiCategory />&nbsp;All categories</TabsTrigger>
        </TabsList>

        {/* Content */}
        <TabsContent value="properties" className="">
          <PropertyListingCard />
        </TabsContent>
        <TabsContent value="cars" className="">
          <CarCard />
        </TabsContent>
        <TabsContent value="hotel" className="">
          {filterPostsByType('hotel').map((post) => (
            <PostsCard key={post.id} {...post} />
          ))}
        </TabsContent>
        <TabsContent value="jobs" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filterPostsByType('jobs').map((post) => (
            <PostsCard key={post.id} {...post} />
          ))}
        </TabsContent>
        <TabsContent value="electronics" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filterPostsByType('electronics').map((post) => (
            <PostsCard key={post.id} {...post} />
          ))}
        </TabsContent>
        <TabsContent value="clothing" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filterPostsByType('clothing').map((post) => (
            <PostsCard key={post.id} {...post} />
          ))}
        </TabsContent>
        <TabsContent value="business" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filterPostsByType('business').map((post) => (
            <PostsCard key={post.id} {...post} />
          ))}
        </TabsContent>
        <TabsContent value="all" className="">
          <Categories />
        </TabsContent>
      </Tabs>
      <div className="md:hidden">
        <Categories />
      </div>
    </>
  );
}
