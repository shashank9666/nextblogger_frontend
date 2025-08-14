"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function CategoryFilter({
  categories,
}: {
  categories: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "";

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category) {
      params.set("category", category);
      // Reset pagination when changing category
      params.delete("page");
    } else {
      params.delete("category");
    }

    router.push(`/posts?${params.toString()}`);
  };

  return (
    <div className="w-full sm:w-48">
      <label htmlFor="category" className="sr-only">
        Filter by category
      </label>
      <div className="relative">
        <select
          id="category"
          name="category"
          className="block w-full rounded-md border border-black/20 py-2 pl-3 pr-10 text-black focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm appearance-none"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          style={{
            backgroundImage: 'none', // Remove default arrow in some browsers
          }}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          {/* Custom Chevron down icon */}
          <svg
            className="h-5 w-5 text-black/40"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}