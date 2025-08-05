import api from '../axios';
import { Comment } from '@/types/comment';

export type CommentPayload = {
    content: string;
    parentComment?: string; // Optional for top-level comments
};

export const createComment = async (postId: string, payload: CommentPayload) => {
    const res = await api.post(`/api/posts/${postId}/comments`, payload, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return res.data;
};

export const getComments = async (postId: string): Promise<Comment[]> => {
    const res = await api.get(`/api/posts/${postId}/comments`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return res.data;
};

export const updateComment = async (postId: string, commentId: string, payload: CommentPayload) => {
    const res = await api.put(`/api/posts/${postId}/comments/${commentId}`, payload, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return res.data;
};

export const deleteComment = async (postId: string, commentId: string) => {
    const res = await api.delete(`/api/posts/${postId}/comments/${commentId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return res.data;
};

export const likeComment = async (postId: string, commentId: string) => {
    const res = await api.post(
        `/api/posts/${postId}/comments/${commentId}/like`,
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        }
    );
    return res.data;
};

export const getAllReplies = async (postId: string, commentId: string): Promise<Comment[]> => {
    const res = await api.get(`/api/posts/${postId}/comments/${commentId}/replies`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return res.data;
};