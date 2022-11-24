import { useColorScheme } from 'contexts/ColorSchemeContext';
import React from 'react';

export const CloseIcon = () => {
  const { colorScheme } = useColorScheme();

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill={`${colorScheme === 'dark' ? '#F78888' : '#858585'}`}>
        <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
      </svg>
    </>
  );
};
