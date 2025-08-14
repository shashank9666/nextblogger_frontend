"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

export default function NewPostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    published: false,
    authorId: "", // You'll need to set this based on your auth system
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert tags string to array
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const postData = {
        ...formData,
        tags: tagsArray,
        authorId: formData.authorId || "66e123456789abcdef123456", // Replace with actual user ID
      };

      await apiRequest("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      // Redirect to posts list on success
      router.push("/posts");
    } catch (error) {
      console.error("Failed to create post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className=" mt-16 border-gray-200 bg-white py-2 sm:py-2 px-4 sm:px-6 lg:px-8 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-md sm:text-2xl md:text-3xl font-bold text-gray-900">
            Create New Post
          </h1>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-6xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8 pb-20">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Title - Full width */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm sm:text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="Enter post title..."
            />
          </div>

          {/* Excerpt - Full width */}
          <div>
            <label
              htmlFor="excerpt"
              className="block text-sm font-medium text-gray-700"
            >
              Excerpt
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              rows={2}
              value={formData.excerpt}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm sm:text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="Brief description of the post..."
            />
          </div>

          {/* Horizontal group for Category and Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category *
              </label>
              <input
                type="text"
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm sm:text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="e.g., Technology, Design, Business..."
              />
            </div>

            {/* Tags */}
            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700"
              >
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm sm:text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="Separate tags with commas (e.g., react, javascript, web)"
              />
            </div>
          </div>

          {/* Author ID and Published Status - Horizontal on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Author ID */}
            <div>
              <label
                htmlFor="authorId"
                className="block text-sm font-medium text-gray-700"
              >
                Author ID *
              </label>
              <input
                type="text"
                id="authorId"
                name="authorId"
                required
                value={formData.authorId}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm sm:text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="Enter your user ID (temporary field)"
              />
              <p className="mt-1 text-xs sm:text-sm text-gray-500">
                Replace this with actual user authentication later
              </p>
            </div>

            {/* Published Status - Aligned to bottom */}
            <div className="flex items-end">
              <div className="flex items-center h-full">
                <input
                  type="checkbox"
                  id="published"
                  name="published"
                  checked={formData.published}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="published"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Publish immediately
                </label>
              </div>
            </div>
          </div>

          {/* Content - Full width */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content *
            </label>
            <textarea
              id="content"
              name="content"
              rows={2}
              required
              value={formData.content}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm sm:text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="Write your post content here..."
            />
          </div>

          {/* Buttons - Fixed at bottom on mobile */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-4 sm:static sm:border-none sm:py-0 sm:px-0 ">
            <div className="max-w-6xl mx-auto flex gap-3 sm:gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 sm:flex-none inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm
                 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSubmitting ? "Creating..." : "Create Post"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/posts")}
                className="flex-1 sm:flex-none inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
