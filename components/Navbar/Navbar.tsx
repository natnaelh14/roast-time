import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className='flex flex-row items-center glass max-h-20 bg-gray-200'>
      <Link href='/'>
        <Image className='hover:cursor-pointer' alt='roastTime logo' src='/logo.png' height={200} width={200} />
      </Link>
      <div className='flex flex-row right-0 absolute'>
        <Link href='/restaurant'>
          <h1 className='m-2 p-2 hover:underline decoration-pink-primary decoration-4 underline-offset-8 text-lg hover:cursor-pointer'>
            For Businesses
          </h1>
        </Link>
        <Link href='/signup'>
          <h1 className='m-2 p-2 hover:underline decoration-pink-primary decoration-4 underline-offset-8 text-lg hover:cursor-pointer'>
            Sign up
          </h1>
        </Link>
        <Link href='/signin'>
          <h1 className='m-2 p-2 hover:underline decoration-pink-primary decoration-4 underline-offset-8 text-lg hover:cursor-pointer'>
            Sign in
          </h1>
        </Link>
        <Link href='/'>
          <h1 className='m-2 p-2 hover:underline decoration-pink-primary decoration-4 underline-offset-8 text-lg hover:cursor-pointer'>
            Logout
          </h1>
        </Link>
      </div>
    </nav>
  );
};