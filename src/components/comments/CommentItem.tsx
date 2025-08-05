'use client';
import { useState } from 'react';
import { Dropdown, Button, Input, App } from 'antd';
import { EllipsisOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import CommentForm from './CommentForm';

export interface CommentType {
    id: string; // Đổi từ number sang string để khớp với API
    author: string;
    content: string;
    replies?: CommentType[];
    likeCount?: number;
    createdAt?: string;
}

interface CommentItemProps {
    comment: CommentType;
    onReply?: (parentId: string, replyContent: string) => void;
    onUpdate?: (commentId: string, content: string) => Promise<void> | void;
    onDelete?: (commentId: string) => Promise<void> | void;
    onLike?: (commentId: string) => Promise<void> | void;
}

export default function CommentItem({ comment, onReply, onUpdate, onDelete, onLike }: CommentItemProps) {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);
    const { modal, message } = App.useApp();

    const handleReply = (content: string) => {
        onReply?.(comment.id, content);
        setShowReplyForm(false);
    };

    const handleEdit = () => {
        setEditContent(comment.content);
        setEditing(true);
    };

    const handleEditSubmit = async () => {
        if (onUpdate && editContent.trim() && editContent !== comment.content) {
            await onUpdate(comment.id, editContent.trim());
            message.success('Đã cập nhật bình luận!');
        }
        setEditing(false);
    };

    const handleDelete = async () => {
        modal.confirm({
            title: 'Xác nhận xoá bình luận',
            content: 'Bạn chắc chắn muốn xoá bình luận này?',
            okText: 'Xoá',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                if (onDelete) {
                    try {
                        await onDelete(comment.id);
                        message.success('Đã xoá bình luận!');
                    } catch (error) {
                        console.error('Lỗi khi xóa comment:', error);
                        message.error('Xóa bình luận thất bại!');
                    }
                }
            },
        });
    };

    const handleLike = async () => {
        if (onLike) {
            try {
                await onLike(comment.id);
            } catch (error) {
                console.error('Lỗi khi like comment:', error);
                message.error('Like bình luận thất bại!');
            }
        }
    };

    const items = [
        {
            key: 'edit',
            label: 'Chỉnh sửa',
            onClick: handleEdit,
        },
        {
            key: 'delete',
            label: 'Xóa',
            onClick: handleDelete,
        },
    ];

    return (
        <div className="mb-4">
            <div className="p-3 bg-gray-100 rounded relative">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="font-semibold text-sm">{comment.author}</div>
                        {editing ? (
                            <div className="mt-1">
                                <Input.TextArea rows={3} value={editContent} onChange={(e) => setEditContent(e.target.value)} autoFocus className="mb-2" />
                                <div className="space-x-2">
                                    <Button size="small" type="primary" onClick={handleEditSubmit}>
                                        Lưu
                                    </Button>
                                    <Button size="small" onClick={() => setEditing(false)}>
                                        Hủy
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-sm mt-1 whitespace-pre-line">{comment.content}</div>
                        )}
                    </div>
                    {(onUpdate || onDelete) && (
                        <Dropdown menu={{ items }} trigger={['click']}>
                            <Button type="text" icon={<EllipsisOutlined />} size="small" className="absolute right-2 top-2" aria-label="Tùy chọn" />
                        </Dropdown>
                    )}
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-4 mt-2">
                    {onLike && !editing && (
                        <button onClick={handleLike} className="flex items-center gap-1 text-xs text-gray-600 hover:text-red-500 transition-colors">
                            <HeartOutlined />
                            <span>{comment.likeCount || 0}</span>
                        </button>
                    )}

                    {onReply && !editing && (
                        <button onClick={() => setShowReplyForm(!showReplyForm)} className="text-xs text-blue-600 hover:underline">
                            {showReplyForm ? 'Hủy' : 'Phản hồi'}
                        </button>
                    )}
                </div>

                {showReplyForm && (
                    <div className="mt-2 ml-4">
                        <CommentForm autoFocus placeholder="Viết phản hồi..." onSubmit={handleReply} />
                    </div>
                )}
            </div>
        </div>
    );
}
