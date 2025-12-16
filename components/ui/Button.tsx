import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyle = "px-6 py-2 rounded-sm font-sans font-medium transition-all duration-200 uppercase tracking-widest text-sm";
  
  const variants = {
    primary: "bg-vn-accent text-white hover:bg-rose-700 border border-transparent shadow-[0_0_15px_rgba(225,29,72,0.3)] hover:shadow-[0_0_25px_rgba(225,29,72,0.5)]",
    secondary: "bg-transparent border border-white/30 text-white hover:bg-white/10 hover:border-white/60",
    ghost: "bg-transparent text-white/70 hover:text-white hover:bg-white/5",
    danger: "bg-red-900/50 text-red-200 border border-red-800 hover:bg-red-900",
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};