import React from 'react';

type FormButtonProps = {
  children: React.ReactNode;
  type?: 'submit' | 'button';
  className?: string;
  onClick?: () => void;
};

export const FormButton = ({
  children,
  type = 'button',
  className = 'blue_btn',
  onClick,
}: FormButtonProps) => (
  <button type={type} className={className} onClick={onClick}>
    {children}
  </button>
);
