import React from 'react';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea: React.FC<TextareaProps> = (props) => (
  <textarea className="border p-2 rounded w-full min-h-[60px]" {...props} />
);

