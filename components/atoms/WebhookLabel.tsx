import { cn } from '@/utils/cn';
import React from 'react';

interface WebhookLabelProps {
  className?: string;
}

const WebhookLabel: React.FC<WebhookLabelProps> = ({ className }) => {
  return (
    <span
      className={cn(
        'px-2 py-1 text-xs font-semibold rounded',
        'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
        className
      )}
    >
      Webhook
    </span>
  );
};

export default WebhookLabel;
