import { cn } from '@/utils/cn';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface CopyButtonProps {
  text: string;
  className?: string;
  iconClassName?: string;
  size?: 'sm' | 'md' | 'lg';
}

const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  className = '',
  iconClassName = '',
  size = 'md'
}) => {
  const [copied, setCopied] = useState(false);

  // 自动还原图标
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
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

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 20
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-300 rounded transition-colors',
        sizeClasses[size],
        className,
        copied ? 'text-green-600 dark:text-green-400' : ''
      )}
      title="复制到剪贴板"
    >
      {copied ? (
        <ClipboardCheck size={iconSizes[size]} className={iconClassName} />
      ) : (
        <Clipboard size={iconSizes[size]} className={iconClassName} />
      )}
    </button>
  );
};

export default CopyButton;
