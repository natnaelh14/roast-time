import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className='flex flex-row items-center glass h-[100px] bg-gray-50'>
      <Image alt='roastTime logo' src='/logo.png' height={200} width={200} />
      <div className='flex flex-row right-0 absolute'>
        <Link href='/'>
          <h1 className='m-2 p-2 hover:underline decoration-orange-light decoration-4 underline-offset-8 text-lg'>
            Order
          </h1>
        </Link>
        <Link href='/orders'>
          <h1 className='m-2 p-2 hover:underline decoration-orange-light decoration-4 underline-offset-8 text-lg'>
            For Businesses
          </h1>
        </Link>
        <Link href='/login'>
          <h1 className='m-2 p-2 hover:underline decoration-orange-light decoration-4 underline-offset-8 text-lg'>
            Login
          </h1>
        </Link>
        <Link href='/'>
          <h1 className='m-2 p-2 hover:underline decoration-orange-light decoration-4 underline-offset-8 text-lg'>
            Logout
          </h1>
        </Link>
      </div>
    </nav>
  );
};