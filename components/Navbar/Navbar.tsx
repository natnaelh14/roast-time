import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HamburgerIcon from './HamburgerIcon';

export const Navbar = () => {
  const [mobileNavShown, setMobileNavShown] = useState(false);
  return (
    <nav className='flex flex-row items-center glass max-h-20 bg-gray-200'>
      <HamburgerIcon />
      <Link href='/'>
        <a className='mt-3' aria-label='Link to Homepage'>
          <Image alt='roastTime logo' src='/logo.png' height={200} width={200} />
        </a>
      </Link>
      <div className='flex-row right-0 absolute hidden md:flex'>
        <Link href='/signin'>
          <a className='m-2 p-2 hover:underline decoration-pink-primary decoration-4 underline-offset-8 text-lg'>
            Sign In
          </a>
        </Link>
        <Link href='/signup'>
          <a className='m-2 p-2 hover:underline decoration-pink-primary decoration-4 underline-offset-8 text-lg'>
            Sign Up
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