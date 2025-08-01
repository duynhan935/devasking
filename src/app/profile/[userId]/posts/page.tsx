'use client';

import { Card, List, Tag, Button } from 'antd';
import Link from 'next/link';
import React from 'react';

type Post = {
    id: number;
    title: string;
    status: 'published' | 'draft';
    createdAt: string;
};

const posts: Post[] = [
    {
        id: 1,
        title: 'Giới thiệu ReactJS cho người mới bắt đầu',
        status: 'published',
        createdAt: '2025-07-30',
    },
    {
        id: 2,
        title: 'Hướng dẫn xây dựng blog với Next.js',
        status: 'draft',
        createdAt: '2025-07-25',
    },
    {
        id: 3,
        title: 'Tối ưu hóa SEO cho website hiện đại',
        status: 'published',
        createdAt: '2025-07-20',
    },
];

const statusColor: Record<Post['status'], string> = {
    published: 'green',
    draft: 'orange',
};

const UserPostList: React.FC = () => {
    return (
        <Card title="📝 Bài viết của tôi" className="mt-8 shadow-xl rounded-xl border-none">
            <List
                itemLayout="vertical"
                dataSource={posts}
                renderItem={(post) => (
                    <List.Item key={post.id} className="hover:bg-gray-50 transition-all duration-200 rounded-lg px-2 py-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <Link href={`/posts/${post.id}`}>
                                    <h3 className="text-lg font-semibold text-blue-600 hover:underline">{post.title}</h3>
                                </Link>
                                <div className="flex items-center gap-4 mt-1">
                                    <Tag color={statusColor[post.status]}>{post.status === 'published' ? 'Đã đăng' : 'Nháp'}</Tag>
                                    <span className="text-sm text-gray-500">🗓 {post.createdAt}</span>
                                </div>
                            </div>
                            * <Button type="link">Chỉnh sửa</Button>
                        </div>
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default UserPostList;
