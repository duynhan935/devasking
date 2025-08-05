'use client';
import { useState, useEffect } from 'react';
import CommentItem, { CommentType } from './CommentItem';
import CommentForm from './CommentForm';

interface CommentListProps {
    initialComments: CommentType[];
    onAddComment?: (content: string, parentCommentId?: string | null) => Promise<void>;
    onUpdateComment?: (commentId: string, content: string) => Promise<void>;
    onDeleteComment?: (commentId: string) => Promise<void>;
    onLikeComment?: (commentId: string) => Promise<void>;
}

export default function CommentList({ initialComments, onAddComment, onUpdateComment, onDeleteComment, onLikeComment }: CommentListProps) {
    const [comments, setComments] = useState<CommentType[]>(initialComments);
    const [showNewForm, setShowNewForm] = useState(false);

    useEffect(() => {
        setComments(initialComments);
    }, [initialComments]);

    const addComment = async (content: string) => {
        if (onAddComment) {
            await onAddComment(content);
        } else {
            const newComment: CommentType = {
                id: Date.now().toString(),
                author: 'Bạn',
                content,
                replies: [],
            };
            setComments([newComment, ...comments]);
        }
        setShowNewForm(false);
    };

    const addReply = async (parentId: string, replyContent: string) => {
        if (onAddComment) {
            await onAddComment(replyContent, parentId);
        } else {
            const updated = comments.map((comment) => {
                if (comment.id === parentId) {
                    return {
                        ...comment,
                        replies: [
                            ...(comment.replies || []),
                            {
                                id: Date.now().toString(),
                                author: 'Bạn',
                                content: replyContent,
                            },
                        ],
                    };
                }
                return comment;
            });
            setComments(updated);
        }
    };

    const handleUpdate = async (commentId: string, content: string) => {
        if (onUpdateComment) {
            await onUpdateComment(commentId, content);
        } else {
            setComments((prev) => prev.map((c) => (c.id === commentId ? { ...c, content } : c)));
        }
    };

    const handleDelete = async (commentId: string) => {
        if (onDeleteComment) {
            await onDeleteComment(commentId);
        } else {
            setComments((prev) => prev.filter((c) => c.id !== commentId));
        }
    };

    return (
        <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Bình luận</h3>

            {!showNewForm ? (
                <button onClick={() => setShowNewForm(true)} className="text-sm text-blue-600 hover:underline mb-4">
                    + Thêm bình luận mới
                </button>
            ) : (
                <div className="mb-4">
                    <CommentForm autoFocus onSubmit={addComment} />
                </div>
            )}

            <div className="space-y-4">
                {(onAddComment ? initialComments : comments).map((comment) => (
                    <CommentItem key={comment.id} comment={comment} onReply={addReply} onUpdate={handleUpdate} onDelete={handleDelete} onLike={onLikeComment} />
                ))}
            </div>
        </div>
    );
}
