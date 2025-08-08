/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Form, Input, Button, message, Select } from 'antd';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreatePost } from '@/hooks/post/post.hooks';
import MarkdownEditor from '@/components/common/MarkdownEditor';

const { Option } = Select;

const CreatePostPage = () => {
    const [form] = Form.useForm();
    const [content, setContent] = useState('');
    const router = useRouter();

    const { mutate: createPost, isPending } = useCreatePost();

    const onFinish = (values: any) => {
        // Validation: Kiểm tra content từ markdown editor
        if (!content.trim()) {
            message.error('Vui lòng nhập nội dung bài viết!');
            return;
        }

        const postData = {
            ...values,
            content: content, // Sử dụng content từ markdown editor
            tags: values.tags || [],
        };

        createPost(postData, {
            onSuccess: () => {
                message.success('Tạo bài viết thành công!');
                router.push(`/profile`);
            },
            onError: (error: any) => {
                message.error(`Tạo bài viết thất bại: ${error?.response?.data?.message || error.message}`);
            },
        });
    };

    return (
        <div className="pt-10 pb-10 px-4">
            <div className="max-w-2xl mx-auto py-8 px-6 bg-white shadow-md rounded-xl mb-10">
                <h1 className="text-2xl font-bold mb-6">Tạo bài viết mới</h1>

                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Tiêu đề" name="title" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}>
                        <Input placeholder="Nhập tiêu đề bài viết" />
                    </Form.Item>

                    <Form.Item label="Nội dung" required>
                        <MarkdownEditor value={content} onChange={setContent} placeholder="Nhập nội dung bài viết bằng Markdown..." height={300} />
                    </Form.Item>

                    <Form.Item label="Tags" name="tags">
                        <Select mode="tags" placeholder="Nhập các tag liên quan (Enter để thêm)" tokenSeparators={[',']} />
                    </Form.Item>

                    <Form.Item label="Trạng thái bài viết" name="status" initialValue="draft" rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}>
                        <Select>
                            <Option value="draft">Nháp</Option>
                            <Option value="published">Công khai</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={isPending}>
                            Đăng bài
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default CreatePostPage;
