import clsx from 'clsx';
import React from 'react';

interface WebhookLabelProps {
  className?: string;
}

const WebhookLabel: React.FC<WebhookLabelProps> = ({ className }) => {
  return (
    <span
      className={clsx(
        'px-2 py-1 text-xs font-semibold rounded',
        'bg-purple-100 text-purple-800',
        className
      )}
    >
      Webhook
    </span>
  );
};

export default WebhookLabel;
