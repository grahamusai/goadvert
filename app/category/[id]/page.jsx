import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import SliderBanner from "../../components/sliderBanner";
import Navbar from "../../components/navbar";

export default function CategoryPage({ params }) {
  const categoryId = params.id;

  return (
    <div className="p-6">
      <Navbar />
      <SliderBanner />
      <h1 className="text-3xl font-bold mb-4">Category: {categoryId}</h1>
    </div>
  );
}