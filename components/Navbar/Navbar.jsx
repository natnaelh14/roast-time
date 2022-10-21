import axios from 'axios';
import { useState, Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HamburgerIcon, CloseIcon, UpcomingReservationsIcon } from 'components/Icons';
import { Dialog, Transition } from "@headlessui/react";
import ColorToggle from 'components/ColorToggle/ColorToggle';
import { useRouter } from "next/router";
import { useUserSession } from 'contexts/UserSessionContext';
import { getSession } from 'components/api/api';
import GuestAccount from './GuestAccount';

export const Navbar = () => {
  const router = useRouter();
  const [mobileNavShown, setMobileNavShown] = useState(false);
  const { setSession, userSession } = useUserSession();
  const handleLogout = async () => {
    await axios.post('/api/auth/logout');
    const res = await getSession().catch((e) => console.error(e));
    setSession(res?.data);
    router.push('/signin');
  };

  return (
    <nav className='flex flex-row items-center glass max-h-20 bg-gray-200 dark:bg-blue-dark'>
      <HamburgerIcon handleClick={() => setMobileNavShown(true)} />
      <Link href='/'>
        <a className='mt-3' aria-label='Link to Homepage'>
          <Image alt='roastTime logo' src='/logo.png' height={200} width={200} />
        </a>
      </Link>
      <div className='flex flex-row items-center right-0 absolute hidden md:flex'>
        {(!userSession?.isLoggedIn) && (
          <>
            <Link href='/signin'>
              <a className='m-2 p-2 hover:underline hover:text-pink-primary decoration-pink-primary decoration-4 underline-offset-8 text-base dark:text-white'>
                Sign In
              </a>
            </Link>
            <Link href='/signup'>
              <a className='m-2 p-2 hover:underline hover:text-pink-primary decoration-pink-primary decoration-4 underline-offset-8 text-base dark:text-white'>
                Sign Up
              </a>
            </Link>
            <Link href='/restaurant/get-started'>
              <a className='m-2 p-2 hover:underline hover:text-pink-primary decoration-pink-primary decoration-4 underline-offset-8 text-base dark:text-white'>
                For Businesses
              </a>
            </Link>
          </>
        )}
        {(userSession?.isLoggedIn) && (
          <>
            <UpcomingReservationsIcon />
            <GuestAccount />
          </>
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
                <nav className="pointer-events-auto fixed inset-y-0 left-0 h-screen w-64 bg-white dark:bg-blue-dark text-2xl">
                  <button
                    aria-label="close navigation"
                    className="mt-6 ml-6 h-[40px] w-[40px]"
                    onClick={() => setMobileNavShown(false)}
                  >
                   <CloseIcon />
                    <span className="sr-only">Close panel</span>
                  </button>
                  <ul
                    className="flex flex-col space-y-6 pl-3 pt-8"
                  >
                    {(!userSession?.isLoggedIn) && (
                      <>
                        <Link href='/signin'>
                          <a className='m-2 p-2 hover:underline hover:text-pink-primary decoration-pink-primary decoration-4 underline-offset-8 text-base dark:text-white' onClick={() => setMobileNavShown(false)}>
                            Sign In
                          </a>
                        </Link>
                        <Link href='/signup'>
                          <a className='m-2 p-2 hover:underline hover:text-pink-primary decoration-pink-primary decoration-4 underline-offset-8 text-base dark:text-white' onClick={() => setMobileNavShown(false)}>
                            Sign Up
                          </a>
                        </Link>
                        <Link href='/restaurant/get-started'>
                          <a className='m-2 p-2 hover:underline hover:text-pink-primary decoration-pink-primary decoration-4 underline-offset-8 text-base dark:text-white' onClick={() => setMobileNavShown(false)}>
                            For Businesses
                          </a>
                        </Link>
                      </>
                    )}
                    {(userSession?.isLoggedIn) && (
                      <>
                        <Link href='/profile'>
                          <a onClick={() => setMobileNavShown(false)} className='m-2 p-2 hover:underline hover:text-pink-primary decoration-pink-primary decoration-4 underline-offset-8 text-base dark:text-white'>
                            My Profile
                          </a>
                        </Link>
                        <Link href='/restaurant/upcoming-reservations'>
                          <a onClick={() => setMobileNavShown(false)} className='m-2 p-2 hover:underline hover:text-pink-primary decoration-pink-primary decoration-4 underline-offset-8 text-base dark:text-white'>
                            Upcoming reservations
                          </a>
                        </Link>
                        <Link href='/restaurant/dining-history'>
                          <a onClick={() => setMobileNavShown(false)} className='m-2 p-2 hover:underline hover:text-pink-primary decoration-pink-primary decoration-4 underline-offset-8 text-base dark:text-white'>
                            My Dining History
                          </a>
                        </Link>
                        <Link href='/restaurant/saved-restaurants'>
                          <a onClick={() => setMobileNavShown(false)} className='m-2 p-2 hover:underline hover:text-pink-primary decoration-pink-primary decoration-4 underline-offset-8 text-base dark:text-white'>
                            My Saved Restaurants
                          </a>
                        </Link>
                        <Link href='/'>
                          <a className='m-2 p-2 hover:underline hover:text-pink-primary decoration-pink-primary decoration-4 underline-offset-8 text-base dark:text-white' onClick={() => { setMobileNavShown(false); handleLogout(); }}>
                            Sign Out
                          </a>
                        </Link>
                      </>
                    )}
                    <ColorToggle />
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