export type User = {
  _id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category: string;
  tags: string[];
  authorId: string;
  author?: User;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreatePostData = {
  title: string;
  excerpt?: string;
  content: string;
  category: string;
  tags: string[];
  published: boolean;
};

// This matches your backend response structure
export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};
