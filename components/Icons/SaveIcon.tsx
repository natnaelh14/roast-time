import { useColorScheme } from 'contexts/ColorSchemeContext';
import { useUserSession } from 'contexts/UserSessionContext';
import { SavedRestaurant } from 'types';
import React from 'react';

export const SaveIcon = ({ restaurantId }: { restaurantId: string }) => {
  const { colorScheme } = useColorScheme();
  const { userSession } = useUserSession();
  // @ts-ignore:next-line
  const isSaved = userSession?.account?.savedRestaurant?.filter(
    (restaurant: SavedRestaurant) => restaurant.restaurantId === restaurantId,
  );
  return (
    <div className="hover:cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill={`${colorScheme === 'dark' ? '#cfcfcf' : '#858585'}`}
        viewBox="0 0 24 24">
        <path
          stroke={`${colorScheme === 'dark' ? '#858585' : '#cfcfcf'}`}
          d="M18,2H6A1,1,0,0,0,5,3V21a1,1,0,0,0,1.65.76L12,17.27l5.29,4.44A1,1,0,0,0,18,22a.84.84,0,0,0,.38-.08A1,1,0,0,0,19,21V3A1,1,0,0,0,18,2ZM17,18.86,12.64,15.2a1,1,0,0,0-1.28,0L7,18.86V4H17Z"
        />
        <path
          fill="#e3a008"
          visibility={`${isSaved.length ? 'visible' : 'hidden'}`}
          d="M6 5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v13.131a1 1 0 0 1-1.555.832l-3.89-2.593a1 1 0 0 0-1.11 0l-3.89 2.593A1 1 0 0 1 6 18.131V5Z"
        />
      </svg>
    </div>
  );
};
