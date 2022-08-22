import React from 'react';
import ItemLoading from './ItemLoading';

const DashboardLoading = () => {
    return (
        <div className='flex flex-wrap justify-center'>
            {Array(10).fill(<ItemLoading />)}
        </div>
    )
}

export default DashboardLoading
