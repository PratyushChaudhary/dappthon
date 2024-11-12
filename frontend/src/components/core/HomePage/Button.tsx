import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  active: boolean;
  linkTo: string;
}

const Button: React.FC<ButtonProps> = ({ children, active, linkTo }) => {
  return (
    <Link to={linkTo}>
      <div
        className={`text-center text-[13px] px-6 py-3 rounded-md font-bold 
        ${active ? 'bg-[#06b6d4] shadow-lg shadow-[#06b6d4]/50 text-black' : 'bg-richblack-800 shadow-lg shadow-[#808080]/50'} 
        hover:scale-95 transition-all duration-200`}
      >
        {children}
      </div>
    </Link>
  );
};

export default Button;
