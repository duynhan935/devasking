// hooks/post/useGetPostById.ts
import { useQuery } from '@tanstack/react-query';
import { getPostById } from '@/lib/api/post.api';
import { Post } from '@/types/post';

export const useGetPostById = (id: string) => {
    return useQuery<Post>({
        queryKey: ['post', id],
        queryFn: () => getPostById(id),
        enabled: !!id, // chỉ gọi API nếu có id
        staleTime: 1000 * 60 * 5, // cache 5 phút
    });
};
