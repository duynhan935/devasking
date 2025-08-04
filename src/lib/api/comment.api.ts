import api from '../axios';
import { Comment } from '@/types/comment';

export type CommentPayload = {
    content: string;    
    parentComment?: string; // Optional for top-level comments
};

export const createComment = async (payload: CommentPayload) => {
    const res = await api.post('/api/comments', payload, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return res.data;
};
