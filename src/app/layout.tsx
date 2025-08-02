import Header from '@/components/layout/Header';
import 'antd/dist/reset.css';
import './globals.css';

import { ReactQueryProvider } from '@/components/providers/react-query-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-gray-100 text-gray-900">
                <ReactQueryProvider>
                    <Header />
                    {children}
                </ReactQueryProvider>
            </body>
        </html>
    );
}
