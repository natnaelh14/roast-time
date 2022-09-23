import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="flex justify-center flex-col p-4 dark:bg-blue-dark bg-brown-light rounded-b-lg shadow md:px-6 md:py-8m h-[300px] w-full mt-auto">
            <div className="flex flex-row items-center justify-around">
                <div className='flex justify-center h-16'>
                    <Link href='/'>
                        <a className="flex items-center mb-4 sm:mb-0">
                            <Image src="/logo.png" className="mr-3" alt="roastTime logo" height={200} width={200} />
                        </a>
                    </Link>
                </div>
                <ul className="flex flex-col items-center lg:flex-row mb-6 text-sm text-gray-500 sm:mb-0">
                    <Link href='/#'>
                        <a className="mr-4 hover:underline hover:text-pink-primary underline-offset-4 decoration-pink-primary decoration-4 lg:mr-6 m-2 lg-m-0 text-sm md:text-base lg:text-lg">About</a>
                    </Link>
                    <Link href="/#">
                        <a className="mr-4 hover:underline hover:text-pink-primary underline-offset-4 decoration-pink-primary decoration-4 lg:mr-6 m-2 lg-m-0 text-sm md:text-base lg:text-lg">Privacy Policy</a>
                    </Link>
                    <Link href='/#'>
                        <a className="mr-4 hover:underline hover:text-pink-primary underline-offset-4 decoration-pink-primary decoration-4 lg:mr-6 m-2 lg-m-0 text-sm md:text-base lg:text-lg">Licensing</a>
                    </Link>
                    <Link href='/#'>
                        <a className="hover:underline hover:text-pink-primary underline-offset-4 decoration-pink-primary decoration-4 m-2 lg-m-0 text-sm md:text-base lg:text-lg">Contact</a>
                    </Link>
                </ul>
            </div>
            <hr className="my-2 lg:my-6 border-gray-200 sm:mx-auto" />
            <span className="block text-sm lg:text-base text-gray-500 text-center">© 2022 RoastTime. All Rights Reserved.
            </span>
        </footer>
    )
}

export default Footer;
