import React from 'react';

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export const Badge: React.FC<BadgeProps> = ({ children, className }) => (
  <span className={`inline-block px-2 py-1 bg-gray-200 rounded text-sm ${className || ''}`}>{children}</span>
);

