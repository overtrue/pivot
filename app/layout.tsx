import { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'OpenAPI 文档',
  description: '用于展示 API 接口规范的工具',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
