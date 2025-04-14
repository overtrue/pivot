// import type { NextPage } from 'next'; // 不再需要 NextPage 类型
// import Head from 'next/head'; // App Router 中使用 metadata

// 不需要再 export const metadata，因为 layout 中已经定义了，除非需要覆盖

export default function Home() { // 函数名可以是任意合法的标识符，通常用 Page 或 Home
  return (
    // <div className="min-h-screen bg-gray-50"> // 这个 div 可能不是必需的，取决于 layout
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">OpenAPI 接口文档</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-lg text-gray-700">
          欢迎使用 OpenAPI 接口文档界面。这是一个用于展示 API 接口规范的工具。
        </p>
      </div>
    </main>
    // </div>
  );
}

// export default Home; // 直接导出函数
