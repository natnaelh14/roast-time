import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="p-4 bg-gray-100 rounded-lg shadow md:px-6 md:py-8m h-max-[100px]">
            <div className="sm:flex sm:items-center sm:justify-center">
                <Link href='/'>
                    <a className="flex items-center mb-4 sm:mb-0">
                        <Image src="/logo.png" className="mr-3 h-8" alt="roastTime logo" height={200} width={200} />
                        {/* <span className="self-center text-2xl font-semibold whitespace-nowrap">RoastTime</span> */}
                    </a>
                </Link>
                <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0">
                    <Link href='/about'>
                        <a className="mr-4 hover:underline md:mr-6 ">About</a>
                    </Link>
                    <Link href="/privacy">
                        <a className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                    </Link>
                    <Link href='/licensing'>
                        <a className="mr-4 hover:underline md:mr-6 ">Licensing</a>
                    </Link>
                    <Link href='/contact'>
                        <a className="hover:underline">Contact</a>
                    </Link>
                </ul>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center ">© 2022 RoastTime. All Rights Reserved.
            </span>
        </footer>
    )
}

export default Footer;
