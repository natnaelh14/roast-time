import React from 'react'

interface MenuItemProps {
    title: string,
    price: number,
    description?: string
}
const MenuItem = ({ title, price, description }: MenuItemProps) => {
    return (
        <div className='m-2 w-[300px]'>
            {title && price && (
                <div className='text-base flex flex-wrap justify-between'>
                    <p className='text-gray-secondary'>{title}</p>
                    <p className='text-gray-500'>${price}</p>
                </div>
            )}
            {description && (
                <p className='text-base text-gray-500'>{description}</p>
            )}
        </div>
    )
}

export default MenuItem;
