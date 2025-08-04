import Header from '@/components/layout/Header';
import 'antd/dist/reset.css';
import './globals.css';

import { ReactQueryProvider } from '@/components/providers/react-query-provider';
import { App, ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="vi">
            <body className="bg-gray-100 text-gray-900">
                <ConfigProvider locale={viVN}>
                    <App>
                        <ReactQueryProvider>
                            <Header />
                            {children}
                        </ReactQueryProvider>
                    </App>
                </ConfigProvider>
            </body>
        </html>
    );
}
