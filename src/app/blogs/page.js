import { Suspense } from "react";
import BlogsClient from "./BlogsClient";

export default function BlogsPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <h1 className="text-2xl font-bold">Loading blogs...</h1>
        </div>
      }
    >
      <BlogsClient />
    </Suspense>
  );
}
