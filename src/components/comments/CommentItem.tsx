'use client';
import { useState } from 'react';
import CommentForm from './CommentForm';

export interface CommentType {
  id: number;
  author: string;
  content: string;
  replies?: CommentType[];
}

interface CommentItemProps {
  comment: CommentType;
  onReply?: (parentId: number, replyContent: string) => void;
}

export default function CommentItem({ comment, onReply }: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReply = (content: string) => {
    onReply?.(comment.id, content);
    setShowReplyForm(false);
  };

  return (
    <div className="mb-4">
      <div className="p-3 bg-gray-100 rounded">
        <div className="font-semibold text-sm">{comment.author}</div>
        <div className="text-sm mt-1 whitespace-pre-line">{comment.content}</div>
        {onReply && (
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="text-xs text-blue-600 mt-1 hover:underline"
          >
            {showReplyForm ? 'Hủy' : 'Phản hồi'}
          </button>
        )}

        {showReplyForm && (
          <div className="mt-2 ml-4">
            <CommentForm autoFocus placeholder="Viết phản hồi..." onSubmit={handleReply} />
          </div>
        )}
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-6 mt-2 border-l border-gray-200 pl-4 space-y-2">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
}
