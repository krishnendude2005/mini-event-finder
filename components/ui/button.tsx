import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({ children, onClick, type = 'button', className }) => (
  <button type={type} onClick={onClick} className={`px-4 py-2 rounded bg-blue-600 text-white ${className || ''}`}>
    {children}
  </button>
);


