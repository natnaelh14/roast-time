import React from 'react';

export const OverviewLoading = () => {
  return (
    <div className="my-5 animate-pulse">
      <div className="mb-3 h-12 w-60 rounded-full bg-gray-200 dark:bg-gray-600"></div>
      <div className="mt-2 flex flex-row">
        <div className="mb-3 ml-4 h-5 w-36 rounded-full bg-gray-200 dark:bg-gray-600"></div>
      </div>
      <div className="m-2 mb-3 ml-4 h-5 w-60 bg-gray-200 dark:bg-gray-600"></div>
      <div className="m-2 mb-3 ml-4 h-28 bg-gray-200 dark:bg-gray-600 xl:w-[900px]"></div>
    </div>
  );
};
