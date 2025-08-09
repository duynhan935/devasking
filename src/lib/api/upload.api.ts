import api from '../axios';

// Upload ảnh
export const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/api/upload/post', formData, {
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data[0];
};

// Upload ảnh đại diện
export const uploadAvatar = async (file: File, userId: string): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post(`/api/upload/avatar/${userId}`, formData, {
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data[0];
};