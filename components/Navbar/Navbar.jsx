import GuestAccount from './GuestAccount';
import {
  HamburgerIcon,
  CloseIcon,
  UpcomingReservationsIcon,
} from 'components/Icons';
import ColorToggle from 'components/ColorToggle/ColorToggle';
import { useUserSession } from 'contexts/UserSessionContext';
import { getSession } from 'components/api/api';
import axios from 'axios';
import { useState, Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';

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
    <nav className="glass flex max-h-20 flex-row items-center bg-gray-200 dark:bg-blue-dark">
      <HamburgerIcon handleClick={() => setMobileNavShown(true)} />
      <Link href="/">
        <a className="mt-3" aria-label="Link to Homepage">
          <Image
            alt="roastTime logo"
            src="/logo.png"
            height={200}
            width={200}
          />
        </a>
      </Link>
      <div className="absolute right-0 flex hidden flex-row items-center md:flex">
        {!userSession?.isLoggedIn && (
          <>
            <Link href="/signin">
              <a className="m-2 p-2 text-base decoration-pink-primary decoration-4 underline-offset-8 hover:text-pink-primary hover:underline dark:text-white">
                Sign In
              </a>
            </Link>
            <Link href="/signup">
              <a className="m-2 p-2 text-base decoration-pink-primary decoration-4 underline-offset-8 hover:text-pink-primary hover:underline dark:text-white">
                Sign Up
              </a>
            </Link>
            <Link href="/restaurant/get-started">
              <a className="m-2 p-2 text-base decoration-pink-primary decoration-4 underline-offset-8 hover:text-pink-primary hover:underline dark:text-white">
                For Businesses
              </a>
            </Link>
          </>
        )}
        {userSession?.isLoggedIn && (
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
          onClose={setMobileNavShown}>
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
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
                leaveTo="-translate-x-full">
                <nav className="pointer-events-auto fixed inset-y-0 left-0 h-screen w-64 bg-white text-2xl dark:bg-blue-dark">
                  <button
                    aria-label="close navigation"
                    className="mt-6 ml-6 h-[40px] w-[40px]"
                    onClick={() => setMobileNavShown(false)}>
                    <CloseIcon />
                    <span className="sr-only">Close panel</span>
                  </button>
                  <ul className="flex flex-col space-y-6 pl-3 pt-8">
                    {!userSession?.isLoggedIn && (
                      <>
                        <Link href="/signin">
                          <a
                            className="m-2 p-2 text-base decoration-pink-primary decoration-4 underline-offset-8 hover:text-pink-primary hover:underline dark:text-white"
                            onClick={() => setMobileNavShown(false)}>
                            Sign In
                          </a>
                        </Link>
                        <Link href="/signup">
                          <a
                            className="m-2 p-2 text-base decoration-pink-primary decoration-4 underline-offset-8 hover:text-pink-primary hover:underline dark:text-white"
                            onClick={() => setMobileNavShown(false)}>
                            Sign Up
                          </a>
                        </Link>
                        <Link href="/restaurant/get-started">
                          <a
                            className="m-2 p-2 text-base decoration-pink-primary decoration-4 underline-offset-8 hover:text-pink-primary hover:underline dark:text-white"
                            onClick={() => setMobileNavShown(false)}>
                            For Businesses
                          </a>
                        </Link>
                      </>
                    )}
                    {userSession?.isLoggedIn && (
                      <>
                        <Link href="/profile">
                          <a
                            onClick={() => setMobileNavShown(false)}
                            className="m-2 p-2 text-base decoration-pink-primary decoration-4 underline-offset-8 hover:text-pink-primary hover:underline dark:text-white">
                            My Profile
                          </a>
                        </Link>
                        <Link href="/restaurant/upcoming-reservations">
                          <a
                            onClick={() => setMobileNavShown(false)}
                            className="m-2 p-2">
                            <span className="text-base decoration-pink-primary decoration-4 underline-offset-8 hover:text-pink-primary hover:underline dark:text-white">
                              Upcoming reservations
                            </span>
                            <span className="ml-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-orange-light p-3 text-sm font-medium text-black dark:bg-orange-primary dark:text-white">
                              3
                            </span>
                          </a>
                        </Link>
                        <Link href="/restaurant/dining-history">
                          <a
                            onClick={() => setMobileNavShown(false)}
                            className="m-2 p-2 text-base decoration-pink-primary decoration-4 underline-offset-8 hover:text-pink-primary hover:underline dark:text-white">
                            My Dining History
                          </a>
                        </Link>
                        <Link href="/restaurant/saved-restaurants">
                          <a
                            onClick={() => setMobileNavShown(false)}
                            className="m-2 p-2 text-base decoration-pink-primary decoration-4 underline-offset-8 hover:text-pink-primary hover:underline dark:text-white">
                            My Saved Restaurants
                          </a>
                        </Link>
                        <Link href="/">
                          <a
                            className="m-2 p-2 text-base decoration-pink-primary decoration-4 underline-offset-8 hover:text-pink-primary hover:underline dark:text-white"
                            onClick={() => {
                              setMobileNavShown(false);
                              handleLogout();
                            }}>
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
    </nav>
  );
};
