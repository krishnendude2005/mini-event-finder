import React from 'react';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label: React.FC<LabelProps> = ({ children, ...props }) => (
  <label className="block mb-1 font-semibold" {...props}>
    {children}
  </label>
);

