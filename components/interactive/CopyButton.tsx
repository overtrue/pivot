import React, { useEffect, useState } from 'react';

interface CopyButtonProps {
  text: string;
  className?: string;
  iconClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  tooltipPosition?: 'left' | 'right' | 'top' | 'bottom';
}

const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  className = '',
  iconClassName = '',
  size = 'md',
  tooltipPosition = 'left'
}) => {
  const [showCopied, setShowCopied] = useState(false);

  // 自动隐藏复制提示
  useEffect(() => {
    if (showCopied) {
      const timer = setTimeout(() => {
        setShowCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showCopied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setShowCopied(true);
    } catch (err) {
      console.error('复制失败: ', err);
    }
  };

  // 根据尺寸大小设置不同的样式
  const sizeClasses = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3'
  };

  const iconSizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  // 根据提示位置设置样式
  const tooltipClasses = {
    left: 'right-full mr-2',
    right: 'left-full ml-2',
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2'
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleCopy}
        className={`bg-gray-100 hover:bg-gray-200 text-gray-600 rounded transition-colors ${sizeClasses[size]} ${className}`}
        title="复制到剪贴板"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${iconSizeClasses[size]} ${iconClassName}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
          />
        </svg>
      </button>

      {/* 复制成功提示 */}
      {showCopied && (
        <div className={`absolute whitespace-nowrap bg-green-100 text-green-800 px-2 py-1 rounded text-xs ${tooltipClasses[tooltipPosition]}`}>
          已复制!
        </div>
      )}
    </div>
  );
};

export default CopyButton;
