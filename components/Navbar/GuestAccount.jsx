import { useUserSession } from 'contexts/UserSessionContext';
import WithClickOutside from 'components/WithClickOutside/WithClickOutside';
import { getSession } from 'components/api/api';
import { GuestAccountProps } from 'types';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { forwardRef } from 'react';

const GuestAccount = forwardRef(
  ({ isDropDownHidden, setDropDownHidden }, ref) => {
    const router = useRouter();
    const { userSession, setSession } = useUserSession();
    const handleLogout = async () => {
      await axios.post('/api/auth/logout');
      const res = await getSession().catch((e) => console.error(e));
      setSession(res?.data);
      router.push('/signin');
    };

    return (
      <div ref={ref} className="mx-6 hover:cursor-pointer">
        <button
          type="button"
          onClick={() => setDropDownHidden(!isDropDownHidden)}
          className="mr-3 flex rounded-full bg-gray-800 text-sm hover:ring-4 hover:ring-gray-300 dark:hover:ring-blue-light md:mr-0"
          id="user-menu-button"
          aria-expanded="false"
          data-dropdown-toggle="user-dropdown"
          data-dropdown-placement="bottom"
        >
          <span className="sr-only">Open user menu</span>
          <Image
            className="rounded-full"
            width={32}
            height={32}
            src="/profile_picture.jpg"
            alt="user profile photo"
          />
        </button>
        <div
          className={`${
            isDropDownHidden && 'hidden'
          } absolute top-9 right-[175px] z-50 my-4 w-48 list-none divide-y divide-gray-100 rounded bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700`}
          id="user-dropdown"
        >
          <div className="py-3 px-4">
            <span className="block text-sm text-gray-900 dark:text-white">
              Hello, {userSession?.account?.first_name}!
            </span>
            <span className="block truncate text-sm font-medium text-gray-500 dark:text-gray-400">
              {userSession?.account?.email}
            </span>
          </div>
          <ul className="py-1" aria-labelledby="user-menu-button">
            <li>
              <Link href="/profile">
                <a
                  onClick={() => setDropDownHidden(!isDropDownHidden)}
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  My Profile
                </a>
              </Link>
            </li>
            <li>
              <Link href="/restaurant/dining-history">
                <a
                  onClick={() => setDropDownHidden(!isDropDownHidden)}
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  My Dining History
                </a>
              </Link>
            </li>
            <li>
              <Link href="/restaurant/saved-restaurants">
                <a
                  onClick={() => setDropDownHidden(!isDropDownHidden)}
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  My Saved Restaurants
                </a>
              </Link>
            </li>
            <li>
              <Link href="#">
                <a
                  onClick={() => {
                    setDropDownHidden(!isDropDownHidden);
                    handleLogout();
                  }}
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Sign out
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  },
);

GuestAccount.displayName = 'GuestAccount';

export default WithClickOutside(GuestAccount);
