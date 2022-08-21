import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className='flex flex-row items-center glass max-h-20 bg-gray-50'>
      <Image alt='roastTime logo' src='/logo.png' height={200} width={200} />
      <div className='flex flex-row right-0 absolute'>
        <Link href='/'>
          <h1 className='m-2 p-2 hover:underline decoration-orange-primary decoration-4 underline-offset-8 text-lg hover:cursor-pointer'>
            Order
          </h1>
        </Link>
        <Link href='/orders'>
          <h1 className='m-2 p-2 hover:underline decoration-orange-primary decoration-4 underline-offset-8 text-lg hover:cursor-pointer'>
            For Businesses
          </h1>
        </Link>
        <Link href='/login'>
          <h1 className='m-2 p-2 hover:underline decoration-orange-primary decoration-4 underline-offset-8 text-lg hover:cursor-pointer'>
            Login
          </h1>
        </Link>
        <Link href='/'>
          <h1 className='m-2 p-2 hover:underline decoration-orange-primary decoration-4 underline-offset-8 text-lg hover:cursor-pointer'>
            Logout
          </h1>
        </Link>
      </div>
    </nav>
  );
};