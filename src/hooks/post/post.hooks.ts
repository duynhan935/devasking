import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllPosts, getPostById, createPost, updatePost, deletePost, PostPayload, getMyPosts, searchPosts } from '@/lib/api/post.api';
import { Post } from '@/types/post';
import { useEffect, useState } from 'react';

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
            queryClient.invalidateQueries({ queryKey: ['all-posts'] });
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

export const usePostsWithSearch = (searchQuery?: string, page: number = 1, limit: number = 10) => {
    // Nếu có search query -> dùng search API
    const searchResults = useQuery({
        queryKey: ['search-posts', searchQuery, page, limit],
        queryFn: () => searchPosts(searchQuery!, page, limit),
        enabled: !!searchQuery && searchQuery.trim().length > 0,
        staleTime: 1000 * 60 * 2,
    });

    // Nếu không có search query -> lấy tất cả bài viết
    const allPosts = useQuery({
        queryKey: ['all-posts', page, limit],
        queryFn: getAllPosts,
        enabled: !searchQuery || searchQuery.trim().length === 0,
        staleTime: 1000 * 60 * 5,
    });

    if (searchQuery && searchQuery.trim().length > 0) {
        const total = searchResults.data?.total || 0;
        const hasNextPage = page * limit < total;
        
        return {
            data: searchResults.data?.posts,
            isLoading: searchResults.isLoading,
            error: searchResults.error,
            isSearching: true,
            total,
            hasNextPage,
            hasPrevPage: page > 1,
        };
    }

    const total = allPosts.data?.total || 0;
    const hasNextPage = page * limit < total;

    return {
        data: allPosts.data?.posts,
        isLoading: allPosts.isLoading,
        error: allPosts.error,
        isSearching: false,
        total,
        hasNextPage,
        hasPrevPage: page > 1,
    };
};
