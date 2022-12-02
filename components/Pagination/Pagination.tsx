import { useRestaurantContext } from 'contexts/RestaurantsContext';
import { useState, useEffect } from 'react';

const Pagination = () => {
  const { restaurantsData, setPageCount, pageCount } = useRestaurantContext();
  const [isNextButtonDisabled, setIsNextButtonDisabled] =
    useState<boolean>(false);
  const [isPrevButtonDisabled, setIsPrevButtonDisabled] =
    useState<boolean>(false);
  const totalCount = restaurantsData?.totalCount;

  useEffect(() => {
    if (!totalCount || pageCount === 1) {
      setIsPrevButtonDisabled(true);
    } else {
      setIsPrevButtonDisabled(false);
    }
    if (!totalCount || (totalCount && totalCount <= pageCount * 10)) {
      setIsNextButtonDisabled(true);
    } else {
      setIsNextButtonDisabled(false);
    }
  }, [pageCount, totalCount]);

  return (
    <div className="mt-10 flex justify-center">
      <button
        onClick={() => setPageCount((prevCount: number) => prevCount - 1)}
        disabled={isPrevButtonDisabled}
        className="mr-3 inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:cursor-pointer hover:bg-gray-100 hover:text-gray-700 disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:dark:text-gray-500 disabled:dark:hover:bg-gray-800 disabled:dark:hover:text-gray-500">
        <svg
          aria-hidden="true"
          className="mr-2 h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
            clipRule="evenodd"></path>
        </svg>
        Previous
      </button>
      <button
        onClick={() => setPageCount((prevCount: number) => prevCount + 1)}
        disabled={isNextButtonDisabled}
        className="mr-3 inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:cursor-pointer hover:bg-gray-100 hover:text-gray-700 disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:dark:text-gray-500 disabled:dark:hover:bg-gray-800 disabled:dark:hover:text-gray-500">
        Next
        <svg
          aria-hidden="true"
          className="ml-2 h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"></path>
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
