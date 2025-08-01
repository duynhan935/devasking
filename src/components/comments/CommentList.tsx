'use client';
import { useState } from 'react';
import CommentItem, { CommentType } from './CommentItem';
import CommentForm from './CommentForm';

interface CommentListProps {
    initialComments: CommentType[];
}

export default function CommentList({ initialComments }: CommentListProps) {
    const [comments, setComments] = useState<CommentType[]>(initialComments);
    const [showNewForm, setShowNewForm] = useState(false);

    const addComment = (content: string) => {
        const newComment: CommentType = {
            id: Date.now(),
            author: 'Bạn',
            content,
            replies: [],
        };
        setComments([newComment, ...comments]);
        setShowNewForm(false);
    };

    const addReply = (parentId: number, replyContent: string) => {
        const updated = comments.map((comment) => {
            if (comment.id === parentId) {
                return {
                    ...comment,
                    replies: [
                        ...(comment.replies || []),
                        {
                            id: Date.now(),
                            author: 'Bạn',
                            content: replyContent,
                        },
                    ],
                };
            }
            return comment;
        });
        setComments(updated);
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
                {comments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} onReply={addReply} />
                ))}
            </div>
        </div>
    );
}
