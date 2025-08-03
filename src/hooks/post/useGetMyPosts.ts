import { getMyPosts } from '@/lib/api/post.api';
import { useQuery } from '@tanstack/react-query';
import { Post } from '@/types/post';

export const useMyPosts = () => {
    return useQuery<Post[]>({
        queryKey: ['my-posts'],
        queryFn: getMyPosts,
    });
};  
