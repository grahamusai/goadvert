export default function CategoryPage({ params }) {
  const category = params.category;

  const displayCategory = category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="p-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Categories
      </Link>
      <h1 className="text-3xl font-bold">{displayCategory}</h1>
    </div>
  );
}