import { CommentPayload, createComment, updateComment, deleteComment, getComments } from '@/lib/api/comment.api';
import { useMutation, useQuery } from '@tanstack/react-query';

// Hook for creating a comment
export const useCreateComment = () => {
    return useMutation({
        mutationFn: ({ postId, payload }: { postId: string; payload: CommentPayload }) => createComment(postId, payload),
    });
};

// Hook for updating a comment
export const useUpdateComment = () => {
    return useMutation({
        mutationFn: ({ postId, commentId, payload }: { postId: string; commentId: string; payload: CommentPayload }) => updateComment(postId, commentId, payload),
    });
};

// Hook for deleting a comment
export const useDeleteComment = () => {
    return useMutation({
        mutationFn: ([postId, commentId]: [string, string]) => deleteComment(postId, commentId),
    });
};

// Hook for fetching comments
export const useGetComments = (postId: string) => {
    return useQuery({
        queryKey: ['comments', postId],
        queryFn: () => getComments(postId),
        enabled: !!postId,
    });
};
