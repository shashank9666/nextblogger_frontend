import Link from "next/link";
import { Post } from "@/types";

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="group rounded-lg border border-border bg-bg-secondary p-6 transition-all hover:shadow-md hover:border-accent">
      {/* Category + Published Status */}
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full bg-hover-bg px-3 py-1 text-xs font-medium text-accent">
          {post.category}
        </span>
        {!post.published && (
          <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            Draft
          </span>
        )}
      </div>
      
      {/* Post Title */}
      <h2 className="mb-2 text-xl font-semibold text-text-primary group-hover:text-accent transition-colors">
        <Link href={`/posts/${post.slug}`} className="hover:underline">
          {post.title}
        </Link>
      </h2>
      
      {/* Excerpt */}
      {post.excerpt && (
        <p className="mb-3 text-text-secondary line-clamp-2">{post.excerpt}</p>
      )}

      {/* Author */}
      {post.author?.name && (
        <p className="mb-4 text-sm text-text-muted">
          By <span className="font-medium text-text-secondary">{post.author.name}</span>
        </p>
      )}

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span 
              key={tag} 
              className="rounded-full bg-hover-bg px-2 py-1 text-xs text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      {/* Read More Link */}
      <Link
        href={`/posts/${post.slug}`}
        className="inline-flex items-center text-accent font-medium hover:underline hover:text-accent-hover"
      >
        Read more
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 ml-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </Link>
    </div>
  );
}