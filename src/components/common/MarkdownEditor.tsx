/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useCallback } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { App } from 'antd';
import { uploadImage as uploadImageAPI } from '@/lib/api/upload.api';

interface MarkdownEditorProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    height?: number;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value = '', onChange, placeholder = 'Nhập nội dung markdown...', height = 400 }) => {
    const [isUploading, setIsUploading] = useState(false);
    const { message } = App.useApp();

    // Hàm upload ảnh lên cloud
    const uploadImage = async (file: File): Promise<string> => {
        setIsUploading(true);
        try {
            const imageUrl = await uploadImageAPI(file);
            return imageUrl;
        } catch (error) {
            console.error('Upload failed:', error);
            throw new Error('Upload ảnh thất bại');
        } finally {
            setIsUploading(false);
        }
    };

    // Xử lý paste ảnh
    const handlePaste = useCallback(
        async (event: ClipboardEvent) => {
            const items = event.clipboardData?.items;
            if (!items) return;

            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (item.type.indexOf('image') !== -1) {
                    event.preventDefault();
                    const file = item.getAsFile();
                    if (file) {
                        try {
                            message.loading('Đang upload ảnh...', 0);
                            const imageUrl = await uploadImage(file);
                            const markdownImage = `![${file.name}](${imageUrl})`;

                            // Chèn markdown image vào vị trí cursor
                            const newValue = value + '\n' + markdownImage + '\n';
                            onChange?.(newValue);

                            message.destroy();
                            message.success('Upload ảnh thành công!');
                        } catch (error: any) {
                            message.destroy();
                            message.error(error.message || 'Upload ảnh thất bại');
                        }
                    }
                }
            }
        },
        [value, onChange, message]
    );

    // Xử lý drop ảnh
    const handleDrop = useCallback(
        async (event: DragEvent) => {
            event.preventDefault();
            const files = event.dataTransfer?.files;
            if (!files) return;

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (file.type.indexOf('image') !== -1) {
                    try {
                        message.loading('Đang upload ảnh...', 0);
                        const imageUrl = await uploadImage(file);
                        const markdownImage = `![${file.name}](${imageUrl})`;

                        const newValue = value + '\n' + markdownImage + '\n';
                        onChange?.(newValue);

                        message.destroy();
                        message.success('Upload ảnh thành công!');
                    } catch (error: any) {
                        message.destroy();
                        message.error(error.message || 'Upload ảnh thất bại');
                    }
                }
            }
        },
        [value, onChange, message]
    );

    return (
        <div className="markdown-editor-container" onPaste={handlePaste as any} onDrop={handleDrop as any} onDragOver={(e) => e.preventDefault()}>
            <div className="mb-2">
                <button
                    type="button"
                    onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.onchange = async (e: any) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                try {
                                    message.loading('Đang upload ảnh...', 0);
                                    const imageUrl = await uploadImage(file);
                                    const markdownImage = `![${file.name}](${imageUrl})`;

                                    const newValue = value + '\n' + markdownImage + '\n';
                                    onChange?.(newValue);

                                    message.destroy();
                                    message.success('Upload ảnh thành công!');
                                } catch (error: any) {
                                    message.destroy();
                                    message.error(error.message || 'Upload ảnh thất bại');
                                }
                            }
                        };
                        input.click();
                    }}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                    disabled={isUploading}
                >
                    📷 Upload Ảnh
                </button>
            </div>

            <MDEditor
                value={value}
                onChange={(val) => onChange?.(val || '')}
                height={height}
                data-color-mode="light"
                visibleDragbar={false}
                textareaProps={{
                    placeholder,
                    style: {
                        fontSize: 14,
                        lineHeight: 1.6,
                    },
                }}
                preview="edit"
            />

            {isUploading && <div className="mt-2 text-blue-600 text-sm">🔄 Đang upload ảnh...</div>}

            <div className="mt-2 text-gray-500 text-xs">💡 Tip: Bạn có thể paste (Ctrl+V) hoặc kéo thả ảnh trực tiếp vào editor</div>
        </div>
    );
};

export default MarkdownEditor;
