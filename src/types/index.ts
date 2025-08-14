export type User = {
  _id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type Post = {
  category: string;
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  tags: string[];
  authorId: string; // keep the ID for reference in DB
  author?: User;    // ✅ new property so we can access author.name etc.
  published: boolean;
  createdAt: string;
  updatedAt: string;
};
