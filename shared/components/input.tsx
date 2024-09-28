import React, { FC } from 'react';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
}

export const Input: FC<InputProps> = ({ value, onChange, className, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={`border p-2 rounded ${className}`}
      placeholder={placeholder}
    />
  );
};
