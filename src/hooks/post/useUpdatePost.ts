import { useMutation } from '@tanstack/react-query';
import { PostPayload, updatePost } from '@/lib/api/post.api';

export const useUpdatePost = () => {
    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: PostPayload }) => updatePost(payload, id),
    });
};
