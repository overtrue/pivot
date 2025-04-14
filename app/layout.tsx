// 'use client'; // Root layout must be a Server Component

import { Metadata } from 'next';
import { I18nProvider } from '../lib/i18n/I18nProvider';
import { ThemeProvider } from '../lib/theme/ThemeProvider';
import './globals.css';

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
        <I18nProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
