import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = ({ ...props }) => (
  <input className="border p-2 rounded w-full" {...props} />
);

