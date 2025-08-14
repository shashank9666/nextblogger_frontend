"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { apiRequest } from "@/lib/api";
import { Post } from "@/types";
import Link from "next/link";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const loadedRef = useRef(false);

  // Fetch posts from backend
  useEffect(() => {
    apiRequest<Post[]>("/api/posts")
      .then((data) => {
        setPosts(data);
        loadedRef.current = true;
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  // Animate hero title/subtitle
  useEffect(() => {
    if (!loadedRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(titleRef.current, {
        y: -40,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          subtitleRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ".cta-button",
          {
            y: 10,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate post cards when loaded
  useEffect(() => {
    if (!loadedRef.current || posts.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 30,
        stagger: {
          each: 0.1,
          from: "center",
        },
        duration: 0.7,
        ease: "back.out(1.2)",
        delay: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [posts]);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen w-full bg-white text-black antialiased flex flex-col"
    >
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <div className="w-full max-w-4xl mx-auto px-4 flex flex-col items-center">
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            NextBlogger
          </h1>
          <p
            ref={subtitleRef}
            className="mt-4 text-lg md:text-xl text-black/80 leading-relaxed max-w-2xl"
          >
            Share your ideas with the world. A modern publishing platform built
            with Next.js and Node.js.
          </p>
          <div className="mt-8 cta-button">
            <Link
              href="/posts"
              className="inline-block rounded-md px-8 py-3 bg-white border-1 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:from-indigo-500 hover:to-purple-500"
            >
              View All Posts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}