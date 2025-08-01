'use client';
import { Button, Input } from 'antd';
import { useState } from 'react';

interface CommentFormProps {
    onSubmit: (content: string) => void;
    placeholder?: string;
    autoFocus?: boolean;
}

const CommentForm = ({ onSubmit, placeholder = 'Viết bình luận...', autoFocus = false }: CommentFormProps) => {
    const [content, setContent] = useState('');

    const handleSubmit = () => {
        if (content.trim()) {
            onSubmit(content.trim());
            setContent('');
        }
    };

    return (
        <div className="space-y-2">
            <Input.TextArea autoFocus={autoFocus} rows={3} placeholder={placeholder} value={content} onChange={(e) => setContent(e.target.value)} />
            <Button type="primary" onClick={handleSubmit}>
                Gửi
            </Button>
        </div>
    );
};

export default CommentForm;
