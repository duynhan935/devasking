import { createPost, PostPayload } from '@/lib/api/post.api';
import { useMutation } from '@tanstack/react-query';

export const useCreatePost = () => {
    return useMutation({
        mutationFn: (payload: PostPayload) => createPost(payload),
    });
};
