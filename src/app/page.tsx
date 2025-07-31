import { Button } from 'antd';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4 text-center">Xin chào Next.js + Tailwind + AntD</h1>
      <Button type="primary">Nút của Ant Design</Button>
    </div>
  );
}
