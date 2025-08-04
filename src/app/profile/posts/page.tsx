/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useMyPosts } from '@/hooks/post/useGetMyPosts';
import { useUpdatePost } from '@/hooks/post/useUpdatePost';
import { useDeletePost } from '@/hooks/post/useDeletePost';

import { Card, List, Tag, Typography, Spin, Empty, Button, Modal, Form, Input, Select, Popconfirm, message } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const { Title, Paragraph } = Typography;
const { Option } = Select;

export default function MyPostsPage() {
    const router = useRouter();
    const { data: posts, isLoading, isError, error, refetch } = useMyPosts();


    const updateMutation = useUpdatePost();
    const deleteMutation = useDeletePost();

    const [editingPost, setEditingPost] = useState<any>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const handleEdit = (post: any) => {
        setEditingPost(post);
        setIsModalVisible(true);
        form.setFieldsValue({
            title: post.title,
            content: post.content,
            tags: post.tags,
            status: post.status,
        });
    };

    const handleUpdate = async () => {
        try {
            const values = await form.validateFields();
            await updateMutation.mutateAsync({ id: editingPost._id, payload: values });
            message.success('Cập nhật bài viết thành công');
            setIsModalVisible(false);
            setEditingPost(null);
            refetch();
        } catch (err) {
            message.error('Cập nhật thất bại');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteMutation.mutateAsync(id);
            message.success('Xóa bài viết thành công');
            refetch();
        } catch (err) {
            message.error('Xóa thất bại');
        }
    };

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
                    <List.Item key={post._id}>
                        <div className="cursor-pointer">
                            <Card
                                onClick={() => {
                                    router.push(`/posts/${post._id}`);
                                }}
                                title={post.title}
                                extra={<span>Lượt xem: {post.viewCount}</span>}
                                style={{ borderRadius: 8 }}
                            >
                                <Paragraph ellipsis={{ rows: 3 }}>{post.content}</Paragraph>
                                <div style={{ marginTop: 12 }}>
                                    {post.tags.map((tag, index) => (
                                        <Tag key={`${tag}-${index}`}>{tag}</Tag>
                                    ))}
                                </div>
                                <div style={{ marginTop: 12, fontSize: 12, color: '#999' }}>
                                    Trạng thái: <strong>{post.status}</strong> | Ngày tạo: {new Date(post.createdAt).toLocaleString()}
                                </div>
                                <div style={{ marginTop: 16 }}>
                                    <Button
                                        type="link"
                                        onClick={(e) => {
                                            e.stopPropagation(); // chặn click lan ra Card
                                            handleEdit(post);
                                        }}
                                    >
                                        Chỉnh sửa
                                    </Button>

                                    <Popconfirm
                                        title="Bạn có chắc chắn muốn xóa bài viết này?"
                                        onConfirm={(e) => {
                                            e?.stopPropagation();
                                            handleDelete(post._id);
                                        }}
                                        okText="Xóa"
                                        cancelText="Hủy"
                                    >
                                        <Button danger type="link" onClick={(e) => e.stopPropagation()}>
                                            Xóa
                                        </Button>
                                    </Popconfirm>
                                </div>
                            </Card>
                        </div>
                    </List.Item>
                )}
            />

            <Modal open={isModalVisible} title="Chỉnh sửa bài viết" onCancel={() => setIsModalVisible(false)} onOk={handleUpdate} okText="Cập nhật" cancelText="Hủy" confirmLoading={updateMutation.isPending}>
                <Form form={form} layout="vertical">
                    <Form.Item label="Tiêu đề" name="title" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Nội dung" name="content" rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}>
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item label="Tags" name="tags" rules={[{ required: true, message: 'Nhập ít nhất 1 tag' }]}>
                        <Select mode="tags" style={{ width: '100%' }} placeholder="Ví dụ: nestjs, typescript" />
                    </Form.Item>
                    <Form.Item label="Trạng thái" name="status" rules={[{ required: true }]}>
                        <Select>
                            <Option value="draft">Nháp</Option>
                            <Option value="published">Công khai</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
