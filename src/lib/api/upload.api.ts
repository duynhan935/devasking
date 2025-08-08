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
