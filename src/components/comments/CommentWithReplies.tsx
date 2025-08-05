/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button, Spin } from 'antd';
import { useGetCommentReplies } from '@/hooks/comment/comment.hooks';
import CommentItem, { CommentType } from './CommentItem';

interface CommentWithRepliesProps {
    comment: CommentType;
    onReply?: (parentId: string, replyContent: string) => void;
    onUpdate?: (commentId: string, content: string) => Promise<void> | void;
    onDelete?: (commentId: string) => Promise<void> | void;
    onLike?: (commentId: string) => Promise<void> | void;
}

export default function CommentWithReplies({ comment, onReply, onUpdate, onDelete, onLike }: CommentWithRepliesProps) {
    const params = useParams();
    const postId = params.slug as string;
    const [showReplies, setShowReplies] = useState(false);

    const { data: repliesData, isLoading: repliesLoading, isError: repliesError } = useGetCommentReplies(postId, comment.id);

    // Đệ quy chuyển đổi replies lồng nhau
    const mapReplies = (replies: any[]): CommentType[] => {
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

    const displayReplies = repliesData ? mapReplies(repliesData) : [];

    const handleToggleReplies = () => {
        setShowReplies(!showReplies);
    };

    return (
        <div className="mb-4">
            {/* Comment chính */}
            <CommentItem comment={comment} onReply={onReply} onUpdate={onUpdate} onDelete={onDelete} onLike={onLike} />

            {/* Nút hiển thị replies */}
            {repliesData && repliesData.length > 0 && (
                <div className="ml-6 mt-2">
                    <Button type="link" size="small" onClick={handleToggleReplies} className="p-0 h-auto text-xs text-blue-600">
                        {showReplies ? 'Ẩn phản hồi' : `Xem ${repliesData.length} phản hồi`}
                    </Button>
                </div>
            )}

            {/* Hiển thị replies */}
            {showReplies && (
                <div className="ml-6 mt-2 border-l border-gray-200 pl-4 space-y-2">
                    {repliesLoading && <Spin size="small" />}
                    {repliesError && <div className="text-red-500 text-xs">Không thể tải phản hồi</div>}
                    {displayReplies.map((reply) => (
                        <CommentWithReplies key={reply.id} comment={reply} onReply={onReply} onUpdate={onUpdate} onDelete={onDelete} onLike={onLike} />
                    ))}
                </div>
            )}
        </div>
    );
}
