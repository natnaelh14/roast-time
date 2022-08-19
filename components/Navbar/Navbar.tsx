import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from './SearchBar';

const Navbar = () => {
  return (
    <nav className='flex flex-row items-center glass'>
      <Image alt='website-logo' src='/logo.png' height={100} width={100} />
      <Link href='/'>
        <h1 className='m-2 p-2 hover:underline decoration-orange decoration-4 underline-offset-8 text-lg'>
          Home
        </h1>
      </Link>
      <div className='flex flex-row right-0 absolute'>
        <SearchBar />
        <Link href='/orders'>
          <h1 className='m-2 p-2 hover:underline decoration-orange decoration-4 underline-offset-8 text-lg'>
            Orders
          </h1>
        </Link>
        <Link href='/login'>
          <h1 className='m-2 p-2 hover:underline decoration-orange decoration-4 underline-offset-8 text-lg'>
            Login
          </h1>
        </Link>
        <Link href='/logout'>
          <h1 className='m-2 p-2 hover:underline decoration-orange decoration-4 underline-offset-8 text-lg'>
            Logout
          </h1>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
