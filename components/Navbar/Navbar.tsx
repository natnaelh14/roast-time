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
        <Link href='/signin'>
          <a className='m-2 p-2 hover:underline decoration-pink-primary decoration-4 underline-offset-8 text-lg'>
            Sign in
          </a>
        </Link>
        <Link href='/signup'>
          <a className='m-2 p-2 hover:underline decoration-pink-primary decoration-4 underline-offset-8 text-lg'>
            Sign up
          </a>
        </Link>
        <Link href='/restaurant'>
          <a className='m-2 p-2 hover:underline decoration-pink-primary decoration-4 underline-offset-8 text-lg'>
            For Businesses
          </a>
        </Link>
        <Link href='/'>
          <a className='m-2 p-2 hover:underline decoration-pink-primary decoration-4 underline-offset-8 text-lg'>
            Logout
          </a>
        </Link>
      </div>
    </nav>
  );
};