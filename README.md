# DevAsking

DevAsking là một dự án được xây dựng với TypeScript nhằm hỗ trợ các nhà phát triển trong việc hỏi đáp, chia sẻ kiến thức và tài liệu liên quan đến lập trình. Dự án hướng tới việc tạo ra một nền tảng cộng đồng thân thiện, dễ sử dụng, giúp các developer có thể tìm kiếm, chia sẻ và giải đáp các thắc mắc về lập trình một cách nhanh chóng.

## Tính năng chính

- Đăng nhập và quản lý tài khoản người dùng
- Đăng câu hỏi, và trả lời câu hỏi của người khác
- Đánh dấu các câu hỏi quan trọng hoặc hữu ích
- Tìm kiếm câu hỏi theo chủ đề, từ khoá
- Hệ thống thông báo về cập nhật hoặc phản hồi mới
- Quản lý hồ sơ cá nhân và lịch sử hoạt động

## Công nghệ sử dụng

- **Ngôn ngữ chính:** TypeScript
- **Front-end Framework:** Next.js
- **UI Framework:** Ant Design (antd)
- **State Management:** Zustand, React Query (@tanstack/react-query)
- **HTTP Client:** Axios
- **Markdown Editor/Viewer:** @uiw/react-md-editor, @uiw/react-markdown-preview
- **Styling:** TailwindCSS, PostCSS, Autoprefixer
- **Linting & Formatting:** ESLint, Prettier
- **Testing:** 
- **Các thư viện phụ trợ khác:**
  - @tanstack/react-query-devtools (devtools cho React Query)
  - Các type definitions: @types/react, @types/node, @types/react-dom,...
- **Cấu hình & Quản lý:** next.config.ts, eslint.config.mjs, .eslintrc.json

## Cài đặt và chạy dự án

1. **Clone repository:**
   git clone https://github.com/duynhan935/devasking.git
   cd devasking

2. **Cài đặt dependencies:**
   npm install
   
4. **Chạy ứng dụng:**
   npm run dev
