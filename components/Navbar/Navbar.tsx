import { useState, Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HamburgerIcon from './HamburgerIcon';
import { Dialog, Transition } from "@headlessui/react";
import ColorToggle from 'components/ColorToggle/ColorToggle';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

export const Navbar = () => {
  const [mobileNavShown, setMobileNavShown] = useState(false);
  const { status } = useSession();
  if (status === 'loading') return null

  return (
    <nav className='flex flex-row items-center glass max-h-20 bg-gray-200 dark:bg-blue-dark'>
      <HamburgerIcon handleClick={() => setMobileNavShown(true)} />
      <Link href='/'>
        <a className='mt-3' aria-label='Link to Homepage'>
          <Image alt='roastTime logo' src='/logo.png' height={200} width={200} />
        </a>
      </Link>
      <div className='flex flex-row items-center right-0 absolute hidden md:flex'>
        {(status === 'unauthenticated') && (
          <>
            <Link href='/signin'>
              <a className='m-2 p-2 hover:underline hover:text-pink-primary decoration-pink-primary decoration-4 underline-offset-8 text-lg dark:text-white'>
                Sign In
              </a>
            </Link>
            <Link href='/signup'>
              <a className='m-2 p-2 hover:underline hover:text-pink-primary decoration-pink-primary decoration-4 underline-offset-8 text-lg dark:text-white'>
                Sign Up
              </a>
            </Link>
            {/* <Link href='/restaurant/get-started'>
              <a className='m-2 p-2 hover:underline hover:text-pink-primary decoration-pink-primary decoration-4 underline-offset-8 text-lg dark:text-white'>
                For Businesses
              </a>
            </Link> */}
          </>
        )}
        {(status === "authenticated") && (
          <Link href='/'>
            <a onClick={() => signOut()} className='m-2 p-2 hover:underline hover:text-pink-primary decoration-pink-primary decoration-4 underline-offset-8 text-lg dark:text-white'>
              Sign Out
            </a>
          </Link>
        )}
        <ColorToggle />
      </div>
      {/* Hamburger Nav */}
      <Transition.Root as={Fragment} show={mobileNavShown}>
        <Dialog
          as="div"
          className="fixed inset-0 z-20 overflow-hidden"
          onClose={setMobileNavShown}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <div className="pointer-events-none fixed inset-y-0">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <nav className="pointer-events-auto fixed inset-y-0 left-0 h-screen w-64 bg-white text-2xl">
                  <button
                    aria-label="close navigation"
                    className="mt-6 ml-6 h-[48px] w-[48px] bg-close bg-contain bg-no-repeat"
                    onClick={() => setMobileNavShown(false)}
                  >
                    <span className="sr-only">Close panel</span>
                  </button>
                  <ul
                    className="flex flex-col space-y-6 pl-3 pt-8"
                  >
                    {(status === 'unauthenticated') && (
                      <>
                        <Link href='/signin'>
                          <a className='m-2 p-2 hover:underline hover:text-pink-primary decoration-pink-primary decoration-4 underline-offset-8 text-lg' onClick={() => setMobileNavShown(false)}>
                            Sign In
                          </a>
                        </Link>
                        <Link href='/signup'>
                          <a className='m-2 p-2 hover:underline hover:text-pink-primary decoration-pink-primary decoration-4 underline-offset-8 text-lg' onClick={() => setMobileNavShown(false)}>
                            Sign Up
                          </a>
                        </Link>
                        {/* <Link href='/restaurant/get-started'>
                          <a className='m-2 p-2 hover:underline hover:text-pink-primary decoration-pink-primary decoration-4 underline-offset-8 text-lg' onClick={() => setMobileNavShown(false)}>
                            For Businesses
                          </a>
                        </Link> */}
                      </>
                    )}
                    {(status === "authenticated") && (
                      <Link href='/'>
                        <a className='m-2 p-2 hover:underline hover:text-pink-primary decoration-pink-primary decoration-4 underline-offset-8 text-lg' onClick={() => { setMobileNavShown(false); signOut(); }}>
                          Sign Out
                        </a>
                      </Link>
                    )}
                  </ul>
                </nav>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </nav >
  );
};