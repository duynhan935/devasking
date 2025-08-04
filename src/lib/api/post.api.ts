import api from '../axios';
import { Post } from '@/types/post';

// Create new Post
export type PostPayload = {
    title: string;
    content: string;
    tags: string[];
    status: 'draft' | 'published';
};

export const createPost = async (payload: PostPayload) => {
    const res = await api.post('/api/posts', payload, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return res.data;
};

export const getMyPosts = async (): Promise<Post[]> => {
    const res = await api.get('/api/users/me/posts', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });

    return res.data;
};

export const getAllPosts = async () => {
    const res = await api.get('/api/posts', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return res.data;
};

export const getPostById = async (id: string) => {
    const res = await api.get(`/api/posts/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return res.data;
};

export const updatePost = async (payload: PostPayload, id: string) => {
    const res = await api.put(`/api/posts/${id}`, payload, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return res.data;
};

export const deletePost = async (id: string) => {
    const res = await api.delete(`/api/posts/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return res.data;
};

