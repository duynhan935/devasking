/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { Avatar, Button, Card, Descriptions, Input, Modal, App, Upload } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import UserPostList from './posts/page';
import { useUserStore } from '@/stores/useUserStore';
import { uploadAvatar } from '@/lib/api/upload.api';

const UserProfile = () => {
    const { user, setUser } = useUserStore();


    const { message } = App.useApp();

    const [isEditing, setIsEditing] = useState(false);
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
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

    const handleAvatarUpload = async (file: File) => {
        if (!user) {
            console.log('No user found');
            return;
        }

        const userId = user.id || (user as any)._id;

        if (!userId) {
            console.error('User ID is missing:', user);
            message.error('Không tìm thấy ID người dùng');
            return;
        }

        try {
            setIsUploadingAvatar(true);
            message.loading('Đang upload avatar...', 0);
            console.log('User ID for upload:', userId);

            const avatar = await uploadAvatar(file, userId);

            console.log('Avatar URL received:', avatar);

            setUser({
                ...user,
                avatar: avatar,
            });

            message.destroy();
            message.success('Cập nhật avatar thành công!');
        } catch (error) {
            console.error('Upload avatar failed:', error);
            message.destroy();
            message.error('Upload avatar thất bại!');
        } finally {
            setIsUploadingAvatar(false);
        }
    };

    const handleAvatarClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e: any) => {
            const file = e.target.files?.[0];
            if (file) {
                await handleAvatarUpload(file);
            }
        };
        input.click();
    };

    if (!user) return <p className="text-center mt-10">Không tìm thấy thông tin người dùng.</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto flex gap-6">
                {/* Sidebar Thông tin cá nhân */}
                <div className="w-[300px] sticky top-4 self-start">
                    <Card>
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                                <Avatar size={100} src={user.avatar || 'https://i.pravatar.cc/300'} />
                                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <CameraOutlined className="text-white text-xl" />
                                </div>
                                {isUploadingAvatar && (
                                    <div className="absolute inset-0 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                                        <span className="text-sm">Uploading...</span>
                                    </div>
                                )}
                            </div>
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

                <div className="flex-1">
                    <UserPostList />
                </div>
            </div>

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
