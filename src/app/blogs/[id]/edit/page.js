"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  /* ================= FETCH BLOG ================= */
  useEffect(() => {
    if (!id) return;

    async function fetchBlog() {
      try {
        const res = await api.get(`/blogs/${id}`);
        setForm({
          title: res.data.title || "",
          content: res.data.content || "",
          author: res.data.author || "",
        });
      } catch (err) {
        setError("Failed to load blog");
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      await api.put(`/blogs/${id}`, form);
      router.push(`/blogs/${id}`);
    } catch (err) {
      setError("Failed to update blog");
    } finally {
      setSaving(false);
    }
  };

  /* ================= STATES ================= */
  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <h1 className="text-xl font-bold">Loading blog...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Edit Blog
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black"
          />

          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md h-40 resize-none focus:ring-2 focus:ring-black"
          />

          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-black text-white py-3 rounded-md font-semibold border border-black hover:bg-white hover:text-black transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Update Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}
