import React from 'react';

interface HamburgerIconProps {
    handleClick: () => void
}

const HamburgerIcon = ({ handleClick }: HamburgerIconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            id="menu-button"
            className="h-8 w-8 m-4 cursor-pointer md:hidden block"
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
    )
}

export default HamburgerIcon
