'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CategoryFilter from "@/components/CategoryFilter";
import PostCard from "@/components/PostCard";
import SearchBar from "@/components/SearchBar";
import type { Post } from "@/types";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

type PostsResponse = {
  posts: Post[];
  pagination: { current: number; total: number; count: number; limit: number };
  filters?: { category?: string; tags?: string; author?: string; search?: string; status?: string };
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Wrap the component that uses useSearchParams in Suspense
function PostsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || undefined;
  const category = searchParams.get('category') || undefined;
  
  const mainRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`${API_URL}/api/posts`, {
          cache: "no-store",
        });
        
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }
        
        const data: PostsResponse = await res.json();
        setPosts(data.posts ?? []);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = query
      ? post.title.toLowerCase().includes(query.toLowerCase()) ||
        (post.excerpt ?? "").toLowerCase().includes(query.toLowerCase())
      : true;

    const matchesCategory = category ? post.category === category : true;

    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(posts.map((p) => p.category)));

  useEffect(() => {
    if (isLoading || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ['.search-bar', '.category-filter'],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out'
        }
      );

      gsap.fromTo(
        '.posts-info',
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.4,
          ease: 'back.out'
        }
      );

      cardRefs.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: i * 0.1,
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
              },
              ease: 'back.out'
            }
          );
        }
      });

      if (mainRef.current) {
        gsap.fromTo(
          mainRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.inOut'
          }
        );
      }
    }, mainRef);

    return () => ctx.revert();
  }, [isLoading, filteredPosts]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-primary pt-20 flex items-center justify-center">
        <div className="text-xl">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary pt-20" ref={mainRef}>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="search-bar w-full sm:w-auto">
            <SearchBar placeholder="Search posts..." />
          </div>
          <div className="category-filter">
            <CategoryFilter categories={categories} />
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="posts-info text-text-secondary">
            Showing {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
            {query && ` for "${query}"`}
            {category && ` in ${category}`}
          </p>
          <div className="text-sm text-text-muted">
            Sort by: <span className="font-medium text-text-primary">Newest</span>
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="py-12 text-center">
            <h2 className="mb-2 text-xl font-medium text-text-primary">No posts found</h2>
            <p className="text-text-muted">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <div 
                key={post._id}
                ref={el => {
                  if (el) cardRefs.current[index] = el;
                }}
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default function PostsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bg-primary pt-20 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    }>
      <PostsContent />
    </Suspense>
  );
}