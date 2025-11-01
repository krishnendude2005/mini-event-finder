import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card: React.FC<CardProps> = ({ children, className }) => (
  <div className={`shadow-lg rounded bg-white p-4 ${className || ''}`}>{children}</div>
);

