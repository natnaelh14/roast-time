import React from 'react';
import ItemLoading from './ItemLoading';

const DashboardLoading = () => {
    const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return (
        <div className='flex flex-row overflow-x-scroll md:overflow-auto md:flex-wrap md:justify-center mt-5'>
            {test.map((e, i) => {
                return <ItemLoading key={i} />
            })}
        </div>
    )
}

export default DashboardLoading
