import React from 'react';
import Image from 'next/image';

interface ItemProps {
    title: string,
    image: string
}

const Item = ({ title, image }: ItemProps) => {
    return (
        <div className="m-8">
            <Image alt='shopping-item' src={image} width={300} height={300} />
            <p className='text-center'>{title}</p>
            <button type='submit' className='bg-orange py-2 px-4 m-2 rounded-lg w-full'>Reserve</button>
        </div>
    )
}

export default Item;
