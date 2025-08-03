/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { Avatar, Button, Card, Descriptions, Input, Modal } from 'antd';
import UserPostList from './posts/page';
import { useUserStore } from '@/stores/useUserStore';

const UserProfile = () => {
    const { user, setUser } = useUserStore();

    const [isEditing, setIsEditing] = useState(false);
    const [tempData, setTempData] = useState({
        name: '',
        email: '',
    });

    const handleEdit = () => {
        if (user) {
            setTempData({ name: user.name, email: user.email });
            setIsEditing(true);
        }
    };

    const handleSave = () => {
        setUser({
            ...(user as any),
            name: tempData.name,
            email: tempData.email,
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    if (!user) return <p className="text-center mt-10">Không tìm thấy thông tin người dùng.</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto flex gap-6">
                {/* Sidebar Thông tin cá nhân */}
                <div className="w-[300px] sticky top-4 self-start">
                    <Card>
                        <div className="flex flex-col items-center gap-4">
                            <Avatar size={100} src="https://i.pravatar.cc/300" />
                            <Descriptions title="Thông tin cá nhân" layout="vertical" bordered column={1} className="w-full">
                                <Descriptions.Item label="Họ tên">{user.name}</Descriptions.Item>
                                <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                                <Descriptions.Item label="Vai trò">
                                    <span className="capitalize">{user.role}</span>
                                </Descriptions.Item>
                                <Descriptions.Item label="Trạng thái">{user.isActive ? <span className="text-green-500">Hoạt động</span> : <span className="text-red-500">Bị khóa</span>}</Descriptions.Item>
                                <Descriptions.Item label="Xác minh email">{user.isEmailVerified ? 'Đã xác minh' : 'Chưa xác minh'}</Descriptions.Item>
                            </Descriptions>
                            <Button type="primary" onClick={handleEdit}>
                                Chỉnh sửa
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Nội dung: Danh sách bài viết */}
                <div className="flex-1">
                    <UserPostList />
                </div>
            </div>

            {/* Modal chỉnh sửa */}
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
