import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>OpenAPI 界面</title>
        <meta name="description" content="OpenAPI 接口文档界面" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">OpenAPI 接口文档</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-lg text-gray-700">
            欢迎使用 OpenAPI 接口文档界面。这是一个用于展示 API 接口规范的工具。
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
