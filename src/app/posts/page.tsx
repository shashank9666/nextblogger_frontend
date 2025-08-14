import Link from "next/link";
import { apiRequest } from "@/lib/api";
import { Post } from "@/types";
import PostCard from "@/components/PostCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; category?: string }>; // ✅ Fixed for Next.js 15+
}) {
  const { query, category } = await searchParams; // ✅ Added await

  const posts: Post[] = await apiRequest("/api/posts");

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = query
      ? post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(query.toLowerCase())
      : true;

    const matchesCategory = category
      ? post.category === category
      : true;

    return matchesSearch && matchesCategory;
  });

  // Unique categories
  const categories = [...new Set(posts.map((post) => post.category))];

  return (
    <div className="min-h-screen bg-white pt-20"> {/* ✅ Added pt-20 for fixed header */}
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Search & Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-end justify-between">
          <SearchBar placeholder="Search posts..." />
          <CategoryFilter categories={categories} />
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-700">
            Showing {filteredPosts.length}{" "}
            {filteredPosts.length === 1 ? "post" : "posts"}
            {query && ` for "${query}"`}
            {category && ` in ${category}`}
          </p>
          <div className="text-sm text-gray-500">
            Sort by:{" "}
            <span className="font-medium text-gray-900">Newest</span>
          </div>
        </div>

        {/* Post Grid */}
        {filteredPosts.length === 0 ? (
          <div className="py-12 text-center">
            <h2 className="text-xl font-medium text-gray-900 mb-2">No posts found</h2>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
