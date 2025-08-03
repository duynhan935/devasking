'use client';

import { Card, List, Tag, Button, Spin, Empty } from 'antd';
import Link from 'next/link';
import React from 'react';
import { useMyPosts } from '@/hooks/post/useGetMyPosts';

const statusColor = {
    published: 'green',
    draft: 'orange',
} as const;

const UserPostList: React.FC = () => {
    const { data: posts, isLoading, isError } = useMyPosts();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-40">
                <Spin />
            </div>
        );
    }

    if (isError) {
        return <div className="text-center text-red-500">Không thể tải bài viết. Vui lòng thử lại sau.</div>;
    }

    if (!posts || posts.length === 0) {
        return (
            <Card title="📝 Bài viết của tôi" className="mt-8 shadow-xl rounded-xl border-none">
                <Empty description="Bạn chưa có bài viết nào." />
            </Card>
        );
    }

    return (
        <Card title="📝 Bài viết của tôi" className="mt-8 shadow-xl rounded-xl border-none">
            <List
                itemLayout="vertical"
                dataSource={posts}
                renderItem={(post) => (
                    <List.Item key={post._id} className="hover:bg-gray-50 transition-all duration-200 rounded-lg px-2 py-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <Link href={`/posts/${post._id}`}>
                                    <h3 className="text-lg font-semibold text-blue-600 hover:underline">{post.title}</h3>
                                </Link>
                                <div className="flex items-center gap-4 mt-1">
                                    <Tag color={statusColor[post.status]}>{post.status === 'published' ? 'Đã đăng' : 'Nháp'}</Tag>
                                    <span className="text-sm text-gray-500">🗓 {post.createdAt}</span>
                                </div>
                            </div>
                            <Button type="link">Chỉnh sửa</Button>
                        </div>
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default UserPostList;
