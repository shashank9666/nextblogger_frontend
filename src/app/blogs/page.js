"use client";

import api from "@/lib/api";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

/* ================= HELPERS ================= */
const isHTML = (str = "") => /<\/?[a-z][\s\S]*>/i.test(str);

const getFirstLine = (text = "") =>
  text.split("\n")[0].slice(0, 200);

export default function Blogs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await api.get("/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  /* SEARCH FILTER */
  useEffect(() => {
    if (!searchQuery) {
      setFilteredBlogs(blogs);
    } else {
      const q = searchQuery.toLowerCase();
      setFilteredBlogs(
        blogs.filter(
          (b) =>
            b.title.toLowerCase().includes(q) ||
            (!isHTML(b.content) &&
              b.content.toLowerCase().includes(q))
        )
      );
    }
  }, [searchQuery, blogs]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this blog?")) return;

    try {
      setDeletingId(id);
      await api.delete(`/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch {
      alert("Failed to delete blog");
    } finally {
      setDeletingId(null);
    }
  };

  /* ================= STATES ================= */
  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Loading blogs...</h1>
      </div>
    );
  }

  if (!filteredBlogs.length) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          No blogs found
        </h1>
      </div>
    );
  }

  /* ================= LIST ================= */
  return (
    <div className="min-h-screen w-screen bg-gray-100 flex justify-center py-28 px-4">
      <div className="w-full max-w-3xl space-y-8">
        {filteredBlogs.map((blog) => (
          <article
            key={blog._id}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            {/* TITLE */}
            <Link href={`/blogs/${blog._id}`}>
              <h2 className="text-2xl font-bold mb-2 hover:underline cursor-pointer">
                {blog.title}
              </h2>
            </Link>

            {/* META */}
            <p className="text-sm text-gray-500 mb-4">
              By {blog.author || "Anonymous"} •{" "}
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>

            {/* CONTENT PREVIEW */}
            <div className="text-gray-600 italic mb-6">
              {isHTML(blog.content)
                ? "..."
                : getFirstLine(blog.content)}
            </div>

            {/* ACTIONS */}
            <div className="flex gap-4">
              <button
                onClick={() =>
                  router.push(`/blogs/${blog._id}/edit`)
                }
                className="px-4 py-2 text-sm border border-black rounded-lg hover:bg-black hover:text-white transition"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(blog._id)}
                disabled={deletingId === blog._id}
                className="px-4 py-2 text-sm border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition disabled:opacity-50"
              >
                {deletingId === blog._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
