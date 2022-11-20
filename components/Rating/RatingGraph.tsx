import React from 'react';

export const RatingGraph = () => {
  return (
    <div className="m-10 flex w-96 flex-col">
      <div className="mt-4 flex items-center">
        <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
          5 star
        </span>
        <div className="mx-4 h-5 w-2/4 rounded bg-gray-200 dark:bg-gray-700">
          <div
            className="h-5 rounded bg-yellow-400"
            style={{ width: '70%' }}
          ></div>
        </div>
        <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
          70%
        </span>
      </div>
      <div className="mt-4 flex items-center">
        <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
          4 star
        </span>
        <div className="mx-4 h-5 w-2/4 rounded bg-gray-200 dark:bg-gray-700">
          <div
            className="h-5 rounded bg-yellow-400"
            style={{ width: '17%' }}
          ></div>
        </div>
        <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
          17%
        </span>
      </div>
      <div className="mt-4 flex items-center">
        <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
          3 star
        </span>
        <div className="mx-4 h-5 w-2/4 rounded bg-gray-200 dark:bg-gray-700">
          <div
            className="h-5 rounded bg-yellow-400"
            style={{ width: '8%' }}
          ></div>
        </div>
        <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
          8%
        </span>
      </div>
      <div className="mt-4 flex items-center">
        <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
          2 star
        </span>
        <div className="mx-4 h-5 w-2/4 rounded bg-gray-200 dark:bg-gray-700">
          <div
            className="h-5 rounded bg-yellow-400"
            style={{ width: '4%' }}
          ></div>
        </div>
        <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
          4%
        </span>
      </div>
      <div className="mt-4 flex items-center">
        <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
          1 star
        </span>
        <div className="mx-4 h-5 w-2/4 rounded bg-gray-200 dark:bg-gray-700">
          <div
            className="h-5 rounded bg-yellow-400"
            style={{ width: '1%' }}
          ></div>
        </div>
        <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
          1%
        </span>
      </div>
    </div>
  );
};
