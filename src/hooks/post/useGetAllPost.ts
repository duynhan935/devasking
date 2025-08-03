import { getAllPosts } from '@/lib/api/post.api';
import { useQuery } from '@tanstack/react-query';

export const useGetAllPosts = () => {
    return useQuery({
        queryKey: ['my-posts'],
        queryFn: getAllPosts,
    });
};
