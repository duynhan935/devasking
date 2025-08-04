'use client';

import { useMyPosts } from '@/hooks/post/useGetMyPosts';
import { Card, List, Tag, Typography, Spin, Empty } from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;

export default function MyPostsPage() {
    const { data: posts, isLoading, isError, error } = useMyPosts();

    if (isLoading) {
        return (
            <div style={{ textAlign: 'center', marginTop: 50 }}>
                <Spin size="large" />
            </div>
        );
    }

    if (isError) {
        return (
            <div style={{ textAlign: 'center', marginTop: 50 }}>
                <Typography.Text type="danger">Lỗi khi tải bài viết: {`${error}`}</Typography.Text>
            </div>
        );
    }

    if (!posts || posts.length === 0) {
        return (
            <div style={{ textAlign: 'center', marginTop: 50 }}>
                <Empty description="Không có bài viết nào" />
            </div>
        );
    }

    return (
        <div style={{ padding: '24px 48px' }}>
            <Title level={2}>Bài viết của tôi</Title>
            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={Array.isArray(posts) ? posts : []}
                renderItem={(post) => (
                    <List.Item>
                        <Card title={post.title} extra={<span>Lượt xem: {post.viewCount}</span>} style={{ borderRadius: 8 }}>
                            <Paragraph ellipsis={{ rows: 3 }}>{post.content}</Paragraph>
                            <div style={{ marginTop: 12 }}>
                                {post.tags.map((tag) => (
                                    <Tag key={tag}>{tag}</Tag>
                                ))}
                            </div>
                            <div style={{ marginTop: 12, fontSize: 12, color: '#999' }}>
                                Trạng thái: <strong>{post.status}</strong> | Ngày tạo: {new Date(post.createdAt).toLocaleString()}
                            </div>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
}
