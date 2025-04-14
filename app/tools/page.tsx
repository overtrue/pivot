import Layout from '@/components/layout/Layout';
import React from 'react';
// import ToolsPage from '../pages/tools'; // 移除错误导入

const Tools: React.FC = () => {
  return (
    <Layout>
      {/* <ToolsPage /> */}
      {/* 在这里添加工具页面的实际内容 */}
      <div className="p-8">
        <h1 className="text-2xl font-bold">工具页面</h1>
        <p className="text-gray-700 mt-4">
          此页面用于展示相关工具。
          (请在此处添加实际的工具组件或内容)
        </p>
      </div>
    </Layout>
  );
};

export default Tools;
