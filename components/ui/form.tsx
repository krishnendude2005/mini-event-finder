import React from 'react';

type FormProps = React.FormHTMLAttributes<HTMLFormElement>;

export const Form: React.FC<FormProps> = ({ children, ...props }) => (
  <form {...props}>{children}</form>
);

