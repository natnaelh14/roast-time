import React from 'react'

const RatingGraph = () => {
    return (
        <div className='flex flex-col w-96 mx-10'>
            <div className="flex items-center mt-4">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-500">5 star</span>
                <div className="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
                    <div className="h-5 bg-yellow-400 rounded" style={{ width: "70%" }}></div>
                </div>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-500">70%</span>
            </div>
            <div className="flex items-center mt-4">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-500">4 star</span>
                <div className="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
                    <div className="h-5 bg-yellow-400 rounded" style={{ width: "17%" }}></div>
                </div>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-500">17%</span>
            </div>
            <div className="flex items-center mt-4">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-500">3 star</span>
                <div className="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
                    <div className="h-5 bg-yellow-400 rounded" style={{ width: "8%" }}></div>
                </div>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-500">8%</span>
            </div>
            <div className="flex items-center mt-4">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-500">2 star</span>
                <div className="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
                    <div className="h-5 bg-yellow-400 rounded" style={{ width: "4%" }}></div>
                </div>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-500">4%</span>
            </div>
            <div className="flex items-center mt-4">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-500">1 star</span>
                <div className="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
                    <div className="h-5 bg-yellow-400 rounded" style={{ width: "1%" }}></div>
                </div>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-500">1%</span>
            </div>
        </div>
    )
}

export default RatingGraph
