"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Only trigger search on blogs page
    if (pathname !== "/blogs") return;

    if (value.trim() === "") {
      // Empty search → show all blogs
      router.replace("/blogs");
    } else {
      // Live search
      router.replace(`/blogs?search=${encodeURIComponent(value)}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-screen">
      <div className="w-screen bg-white/10 backdrop-blur-md shadow-xl border-b border-white/20">
        <div className="flex items-center justify-between py-4 px-6 md:px-12 lg:px-20 gap-6">

          {/* LOGO */}
          <Link href="/">
            <h1 className="text-2xl font-bold">Nextblogger</h1>
          </Link>

          {/* SEARCH BAR (LIVE) */}
          <div className="flex-1 max-w-xl hidden md:flex">
            <input
              type="text"
              placeholder="Search blogs..."
              value={query}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white/90"
            />
          </div>

          {/* WRITE BUTTON */}
          <Link href="/blogs/new">
            <button className="bg-black px-4 py-2 text-white border border-black rounded-xl hover:bg-white hover:text-black transition">
              Write
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
