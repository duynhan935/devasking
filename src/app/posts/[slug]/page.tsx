/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useParams } from 'next/navigation';
import CommentList from '@/components/comments/CommentList';
import { Spin, App } from 'antd';
import { useGetPostById } from '@/hooks/post/post.hooks';
import { useGetComments, useCreateComment, useUpdateComment, useDeleteComment, useLikeComment } from '@/hooks/comment/comment.hooks';

export default function PostDetailPage() {
    const params = useParams();
    const id = params.slug as string;
    const { message } = App.useApp();

    const { data: post, isLoading, isError, error } = useGetPostById(id);
    const { data: commentsData, isLoading: isCommentsLoading, isError: isCommentsError, refetch: refetchComments } = useGetComments(id);

    const createCommentMutation = useCreateComment();
    const updateCommentMutation = useUpdateComment();
    const deleteCommentMutation = useDeleteComment();
    const likeCommentMutation = useLikeComment();

    // Đệ quy chuyển đổi replies lồng nhau
    const mapReplies = (replies: any[]): any[] => {
        return (
            replies?.map((reply: any) => ({
                id: reply._id,
                author: reply.author?.name || 'Không rõ',
                content: reply.content,
                replies: mapReplies(reply.replies || []),
                likeCount: reply.likeCount,
                createdAt: reply.createdAt,
            })) || []
        );
    };

    const convertComments = (comments: any[]) => {
        return comments
            .filter((comment) => !comment.parentComment)
            .map((comment) => ({
                id: comment._id,
                author: comment.author?.name || 'Không rõ',
                content: comment.content,
                replies: mapReplies(comment.replies || []),
                likeCount: comment.likeCount,
                createdAt: comment.createdAt,
            }));
    };

    const displayComments = commentsData ? convertComments(commentsData) : [];

    const handleAddComment = async (content: string, parentCommentId: string | null = null) => {
        try {
            await createCommentMutation.mutateAsync({
                postId: id,
                payload: { content, parentComment: parentCommentId || undefined },
            });
            message.success('Đã thêm bình luận!');
            refetchComments();
        } catch {
            message.error('Thêm bình luận thất bại!');
        }
    };

    // Handler cập nhật comment
    const handleUpdateComment = async (commentId: string, content: string) => {
        try {
            await updateCommentMutation.mutateAsync({
                postId: id,
                commentId,
                payload: { content },
            });
            message.success('Đã cập nhật bình luận!');
            refetchComments();
        } catch {
            message.error('Cập nhật bình luận thất bại!');
        }
    };

    // Handler xoá comment
    const handleDeleteComment = async (commentId: string) => {
        try {
            await deleteCommentMutation.mutateAsync([id, commentId]);
            message.success('Đã xoá bình luận!');
            refetchComments();
        } catch (error) {
            console.error('Lỗi khi xóa comment:', error);
            message.error('Xoá bình luận thất bại!');
        }
    };

    // Handler like comment
    const handleLikeComment = async (commentId: string) => {
        try {
            await likeCommentMutation.mutateAsync({ postId: id, commentId });
            refetchComments();
        } catch (error) {
            console.error('Lỗi khi like comment:', error);
            message.error('Like bình luận thất bại!');
        }
    };

    if (isLoading || isCommentsLoading) {
        return (
            <div className="flex justify-center items-center h-60">
                <Spin />
            </div>
        );
    }

    if (isError || !post) {
        console.log(error);
        return <div className="text-center text-red-500 py-10">Không thể tải bài viết. Vui lòng thử lại sau.</div>;
    }

    if (isCommentsError || !commentsData) {
        return <div className="text-center text-red-500 py-10">Không thể tải bình luận. Vui lòng thử lại sau.</div>;
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
            <p className="text-sm text-gray-600 mb-4">Tác giả: {post.author?.name || 'Không rõ'}</p>
            <div className="text-base leading-relaxed whitespace-pre-line bg-gray-50 p-4 rounded-md border">{post.content}</div>

            <CommentList initialComments={displayComments} onAddComment={handleAddComment} onUpdateComment={handleUpdateComment} onDeleteComment={handleDeleteComment} onLikeComment={handleLikeComment} />
        </div>
    );
}
