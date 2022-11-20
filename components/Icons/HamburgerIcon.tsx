import React from 'react';

interface HamburgerIconProps {
  handleClick: () => void;
}

export const HamburgerIcon = ({ handleClick }: HamburgerIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="menu-button"
      className="m-4 block h-8 w-8 cursor-pointer md:hidden"
      fill="#F78888"
      viewBox="0 0 24 24"
      stroke="currentColor"
      onClick={handleClick}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
};
