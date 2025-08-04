import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllPosts, getPostById, createPost, updatePost, deletePost, PostPayload, getMyPosts } from '@/lib/api/post.api';
import { Post } from '@/types/post';
import { useEffect, useState } from 'react';

// Get all posts
export const useGetAllPosts = () => {
    return useQuery({
        queryKey: ['my-posts'],
        queryFn: getAllPosts,
    });
};

// Get post by ID
export const useGetPostById = (id: string) => {
    return useQuery<Post>({
        queryKey: ['post', id],
        queryFn: () => getPostById(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });
};

// Create post
export const useCreatePost = () => {
    return useMutation({
        mutationFn: (payload: PostPayload) => createPost(payload),
    });
};

// Update post
export const useUpdatePost = () => {
    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: PostPayload }) => updatePost(payload, id),
    });
};

// Delete post
export const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deletePost(id),
        onSuccess: () => {
            // Refetch danh sách bài viết sau khi xoá
            queryClient.invalidateQueries({ queryKey: ['my-posts'] });
        },
    });
};

// Get my posts
export const useMyPosts = () => {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setEnabled(true);
        }
    }, []);

    return useQuery<Post[]>({
        queryKey: ['my-posts'],
        queryFn: getMyPosts,
        enabled,
    });
};
