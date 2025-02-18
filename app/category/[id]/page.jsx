import { ArrowLeft } from "lucide-react";
import Link from "next/link";
export default function CategoryPage({ params }) {
  const category = params.category;

  return (
    <div className="p-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Categories
      </Link>
      {/* <h1 className="text-3xl font-bold">{displayCategory}</h1> */}

      <h1>{category}</h1>
    </div>
  );
}