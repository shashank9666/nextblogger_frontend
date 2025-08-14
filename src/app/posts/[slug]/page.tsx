import { apiRequest } from "@/lib/api";
import { Post } from "@/types";
import { formatDate } from "@/utils/date";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post: Post = await apiRequest(`/api/posts/${slug}`);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <article className="prose prose-lg max-w-none">
        {/* Post Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {post.category && (
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {post.category}
              </span>
            )}
            {!post.published && (
              <span className="inline-block px-2 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                Draft
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-4">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span>
              Published on {formatDate(post.createdAt)}
            </span>
            {post.updatedAt && post.updatedAt !== post.createdAt && (
              <span className="text-gray-400">
                (Updated on {formatDate(post.updatedAt)})
              </span>
            )}
            {/* Show Author - FIXED */}
            {post.author?.name && (
              <span className="text-gray-700 font-medium">
                by {post.author.name}
              </span>
            )}
          </div>
        </header>

        {/* Post Content */}
        <div className="prose prose-lg max-w-none">
          <div className="whitespace-pre-line text-gray-700">{post.content}</div>
        </div>

        {/* Post Footer */}
        <footer className="mt-12 pt-6 border-t border-gray-200">
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex justify-end">
            <a
              href="/posts"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              Back to all posts
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </footer>
      </article>
    </div>
  );
}
