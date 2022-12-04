import { useColorScheme } from 'contexts/ColorSchemeContext';
import React from 'react';

export const UpcomingReservationsIcon = () => {
  const { colorScheme } = useColorScheme();

  return (
    <div className="hover:cursor-pointer">
      {colorScheme === 'dark' ? (
        <div className="flex flex-row p-2 hover:rounded-full hover:bg-blue-light">
          <svg
            data-tooltip-target="tooltip-default"
            className="h-6 w-6"
            fill="#253443"
            stroke="white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="inline-flex h-1 w-1 items-center justify-center rounded-full bg-orange-light p-2 text-xs font-medium text-orange-primary dark:bg-orange-primary dark:text-orange-light">
            3
          </span>
        </div>
      ) : (
        <div className="flex flex-row p-2 hover:rounded-full hover:bg-gray-300">
          <svg
            data-tooltip-target="tooltip-default"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="inline-flex h-1 w-1 items-center justify-center rounded-full bg-orange-light p-2 text-xs font-medium text-black dark:bg-orange-primary dark:text-white">
            3
          </span>
        </div>
      )}
    </div>
  );
};
