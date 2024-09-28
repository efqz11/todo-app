import React, { FC, ReactNode } from 'react';
import { Spinner } from './spinner';

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  type?: "submit" | "button",
  isLoading?: boolean;
}


export const Button: FC<ButtonProps> = ({ onClick, children, className, type = "submit", isLoading = false }) => {
    return (
      <button
        onClick={onClick && onClick}
        className={`px-4 py-2 bg-blue-500 text-white rounded ${className}`}
        style={{height: "40px"}}
      >
        {isLoading ? <center><Spinner className="animate-spin text-lg text-white-500" /></center> : children}
      </button>
    );
  };