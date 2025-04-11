import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">© {new Date().getFullYear()} OpenAPI 界面. 保留所有权利。</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-white transition">
              关于
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition">
              联系我们
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition">
              隐私政策
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
