import { useColorScheme } from 'contexts/ColorSchemeContext';
import React from 'react';

export const UpcomingReservationsIcon = () => {
  const { colorScheme } = useColorScheme();

  return (
    <div className="hover:cursor-pointer">
      {colorScheme === 'dark' ? (
        <div className="p-2 hover:rounded-full hover:bg-blue-light">
          <svg
            data-tooltip-target="tooltip-default"
            className="h-6 w-6"
            fill="#253443"
            stroke="white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      ) : (
        <div className="p-2 hover:rounded-full hover:bg-gray-300">
          <svg
            data-tooltip-target="tooltip-default"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}
      {/* <div id="tooltip-default" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                Tooltip content
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div> */}
    </div>
  );
};
