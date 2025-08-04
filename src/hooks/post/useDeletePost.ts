import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '@/lib/api/post.api';

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
