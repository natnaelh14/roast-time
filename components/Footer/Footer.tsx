import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="md:py-8m mt-auto flex h-[300px] w-full flex-col justify-center rounded-b-lg bg-gray-background-light p-4 shadow dark:bg-blue-dark md:px-6">
      <div className="flex flex-row items-center justify-around">
        <div className="flex h-16 justify-center">
          <Link href="/">
            <a className="mb-4 flex items-center sm:mb-0">
              <Image
                src="/logo.png"
                className="mr-3"
                alt="roastTime logo"
                height={200}
                width={200}
              />
            </a>
          </Link>
        </div>
        <ul className="mb-6 flex flex-col items-center text-sm text-gray-500 sm:mb-0 lg:flex-row">
          <Link href="/#">
            <a className="lg-m-0 m-2 mr-4 text-sm decoration-pink-primary decoration-4 underline-offset-4 hover:text-pink-primary hover:underline md:text-base lg:mr-6 lg:text-lg">
              About
            </a>
          </Link>
          <Link href="/#">
            <a className="lg-m-0 m-2 mr-4 text-sm decoration-pink-primary decoration-4 underline-offset-4 hover:text-pink-primary hover:underline md:text-base lg:mr-6 lg:text-lg">
              Privacy Policy
            </a>
          </Link>
          <Link href="/#">
            <a className="lg-m-0 m-2 mr-4 text-sm decoration-pink-primary decoration-4 underline-offset-4 hover:text-pink-primary hover:underline md:text-base lg:mr-6 lg:text-lg">
              Licensing
            </a>
          </Link>
          <Link href="/#">
            <a className="lg-m-0 m-2 text-sm decoration-pink-primary decoration-4 underline-offset-4 hover:text-pink-primary hover:underline md:text-base lg:text-lg">
              Contact
            </a>
          </Link>
        </ul>
      </div>
      <hr className="my-2 border-gray-200 sm:mx-auto lg:my-6" />
      <span className="block text-center text-sm text-gray-500 lg:text-base">
        © 2022 RoastTime. All Rights Reserved.
      </span>
    </footer>
  );
};

export default Footer;
