import api from '../axios';

// Create new Post
export type PostPayload = {
    title: string;
    content: string;
    tags: string[];
    status: 'draft' | 'published';
};

export const createPost = async (payload: PostPayload) => {
  const res = await api.post("/api/posts", payload, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return res.data;
};