/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { Form, Input, Button, message } from 'antd';
import { useRouter } from 'next/navigation';

const { TextArea } = Input;

const CreatePostPage = () => {
    const [form] = Form.useForm();
    const router = useRouter();

    const onFinish = (values: any) => {
        console.log('Bài viết mới:', values);
        message.success('Tạo bài viết thành công!');

        // Sau đó chuyển hướng về trang chủ hoặc trang bài viết
        router.push('/');
    };

    return (
        <div className="pt-24 px-4">
            <div className="max-w-2xl mx-auto py-8 px-6 bg-white shadow-md rounded-xl">
                <h1 className="text-2xl font-bold mb-6">Tạo bài viết mới</h1>

                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Tiêu đề" name="title" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}>
                        <Input placeholder="Nhập tiêu đề bài viết" />
                    </Form.Item>

                    <Form.Item label="Nội dung" name="content" rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}>
                        <TextArea rows={6} placeholder="Nhập nội dung bài viết" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Đăng bài
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default CreatePostPage;
