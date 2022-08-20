import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from './SearchBar';

export const Navbar = () => {
  return (
    <nav className='flex flex-row items-center glass h-[100px]'>
      <Image alt='website-logo' src='/logo.png' height={200} width={200} />
      <Link href='/'>
        <h1 className='m-2 p-2 hover:underline decoration-orange-light decoration-4 underline-offset-8 text-lg'>
          Home
        </h1>
      </Link>
      <div className='flex flex-row right-0 absolute'>
        <SearchBar />
        <Link href='/orders'>
          <h1 className='m-2 p-2 hover:underline decoration-orange-light decoration-4 underline-offset-8 text-lg'>
            Orders
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