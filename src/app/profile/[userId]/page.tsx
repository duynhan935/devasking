'use client';

import { useState } from 'react';
import { Avatar, Button, Card, Descriptions, Input, Modal, Tabs, List, Typography, Tag } from 'antd';
import UserPostList from './posts/page';

const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
    });

    const [tempData, setTempData] = useState({ ...formData });

    const handleEdit = () => {
        setTempData({ ...formData });
        setIsEditing(true);
    };

    const handleSave = () => {
        setFormData({ ...tempData });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            <Card className="w-full max-w-xl">
                <div className="flex flex-col items-center gap-4">
                    <Avatar size={100} src="https://i.pravatar.cc/300" />
                    <Descriptions title="Thông tin người dùng" layout="vertical" bordered column={1} className="w-full">
                        <Descriptions.Item label="Họ tên">{formData.name}</Descriptions.Item>
                        <Descriptions.Item label="Email">{formData.email}</Descriptions.Item>
                    </Descriptions>
                    <Button type="primary" onClick={handleEdit}>
                        Chỉnh sửa
                    </Button>
                </div>
            </Card>

            <UserPostList />

            <Modal title="Chỉnh sửa thông tin" open={isEditing} onOk={handleSave} onCancel={handleCancel} okText="Lưu" cancelText="Hủy">
                <div className="flex flex-col gap-4">
                    <Input placeholder="Họ tên" value={tempData.name} onChange={(e) => setTempData({ ...tempData, name: e.target.value })} />
                    <Input placeholder="Email" value={tempData.email} onChange={(e) => setTempData({ ...tempData, email: e.target.value })} />
                </div>
            </Modal>
        </div>
    );
};

export default UserProfile;
