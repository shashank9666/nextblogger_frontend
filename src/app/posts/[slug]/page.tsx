// src/app/posts/[slug]/page.tsx
import { serverApiRequest } from "@/lib/server-api";
import { formatDate } from "@/utils/date";
import type { Post } from "@/types";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await serverApiRequest<Post>(`/api/posts/${slug}`);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 mt-12">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="mt-2 text-sm text-gray-500">
        {post.author?.name ? `By ${post.author.name}` : ""}
        {post.createdAt ? ` • ${formatDate(post.createdAt)}` : ""}
      </div>
      {post.excerpt && <p className="mt-4 text-gray-700">{post.excerpt}</p>}
      <div className="prose prose-slate mt-8">
        {post.content}
      </div>
    </article>
  );
}
