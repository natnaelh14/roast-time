import React from 'react';
import ItemLoading from './ItemLoading';

const DashboardLoading = () => {
    return (
        <div className='flex flex-row overflow-x-scroll md:overflow-auto md:flex-wrap md:justify-center mt-5'>
            {Array(10).map((e, i) => {
                return <ItemLoading key={i} />
            })}
        </div>
    )
}

export default DashboardLoading
