import React from 'react'
import { ThreeDots } from 'react-loader-spinner';

const ThreeDotsLoading = () => {
    return (
        <div className='h-[800px] flex justify-center items-center'>
            <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#F78888"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                // wrapperClassName="jj"
                visible={true}
            />
        </div>
    )
}

export default ThreeDotsLoading
