import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { useUserSession } from 'contexts/UserSessionContext';


const GuestAccount = ({ handleLogout }: { handleLogout: () => void }) => {
    const [isDropDownHidden, setDropDownHidden] = useState(true)
    const { userSession } = useUserSession();

    return (
        <div className="mx-6">
            <button type="button" onClick={() => setDropDownHidden(!isDropDownHidden)} className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                <span className="sr-only">Open user menu</span>
                <Image className="rounded-full" width={32} height={32} src="/profile_picture.jpg" alt="user profile photo" />
            </button>
            <div className={`${isDropDownHidden && 'hidden'} absolute top-9 right-[175px] z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`} id="user-dropdown">
                <div className="py-3 px-4">
                    <span className="block text-sm text-gray-900 dark:text-white">Hello, {userSession?.account?.first_name}!</span>
                    <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{userSession?.account?.email}</span>
                </div>
                <ul className="py-1" aria-labelledby="user-menu-button">
                    <li>
                        <Link href='/profile'>
                            <a onClick={() => setDropDownHidden(!isDropDownHidden)} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">My Profile</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/restaurant/dining-history'>
                            <a onClick={() => setDropDownHidden(!isDropDownHidden)} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">My Dining History</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/restaurant/saved-restaurants'>
                            <a onClick={() => setDropDownHidden(!isDropDownHidden)} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">My Saved Restaurants</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='#'>
                            <a onClick={() => { setDropDownHidden(!isDropDownHidden); handleLogout(); }} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                        </Link>
                    </li>
                </ul>
            </div>
            {/* <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
            </button> */}
        </div>
    )
}

export default GuestAccount
