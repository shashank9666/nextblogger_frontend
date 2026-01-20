"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

/* ================= HELPERS ================= */
const isHTML = (str = "") => /<\/?[a-z][\s\S]*>/i.test(str);

export default function BlogDetailPage() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:5173/blogs/${id}`);
        if (!res.ok) throw new Error("Blog not found");

        const data = await res.json();
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  /* ================= STATES ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg">Loading blog...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  /* ================= CONTENT ================= */
  return (
    <div 
      className="min-h-screen bg-gray-100 pt-32 pb-12 px-6 md:px-12 lg:px-20"
      style={{
        paddingTop: '60px',
        paddingBottom: '3rem',
        minHeight: '100vh',
        backgroundColor: '#f3f4f6'
      }}
    >
      {/* CARD CONTAINER with spacing on all sides - now full width */}
      <article 
        className="bg-white rounded-2xl shadow-lg p-8 md:p-12 lg:p-16 w-full"
        style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          padding: '4rem',
          width: '100%'
        }}
      >
        {/* TITLE */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          {blog.title}
        </h1>

        {/* META */}
        <p className="text-gray-500 mb-12">
          By {blog.author || "Anonymous"} •{" "}
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>

        {/* CONTENT */}
        {isHTML(blog.content) ? (
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        ) : (
          <div className="text-gray-800 text-lg leading-relaxed whitespace-pre-line">
            {blog.content}
          </div>
        )}
      </article>
    </div>
  );
}