import packageInfo from 'package.json';
import Link from 'next/link';
import Image from 'next/legacy/image';

const Footer = () => {
  return (
    <footer className="md:py-8m mt-auto flex h-[300px] w-full flex-col justify-center rounded-b-2xl bg-gray-200 p-4 shadow dark:bg-blue-dark md:px-6">
      <div className="flex flex-row items-center justify-around">
        <div className="flex h-16 justify-center">
          <Link href="/" className="mb-4 flex items-center sm:mb-0">
            <Image
              src="/logo.png"
              className="mr-3"
              alt="roastTime logo"
              height={200}
              width={200}
            />
          </Link>
        </div>
        <ul className="mb-6 flex flex-col items-center p-2 text-sm text-gray-500 sm:mb-0 lg:flex-row">
          <Link
            href="/#"
            className="lg-m-0 m-2 mr-4 text-sm text-black decoration-pink-primary decoration-4 underline-offset-8 hover:text-pink-primary hover:underline dark:text-white md:text-base lg:mr-6 lg:text-lg">
            About
          </Link>
          <Link
            href="/#"
            className="lg-m-0 m-2 mr-4 p-2 text-sm text-black decoration-pink-primary decoration-4 underline-offset-8 hover:text-pink-primary hover:underline dark:text-white md:text-base lg:mr-6 lg:text-lg">
            Privacy Policy
          </Link>
          <Link
            href="/#"
            className="lg-m-0 m-2 mr-4 p-2 text-sm text-black decoration-pink-primary decoration-4 underline-offset-8 hover:text-pink-primary hover:underline dark:text-white md:text-base lg:mr-6 lg:text-lg">
            Licensing
          </Link>
          <Link
            href="/#"
            className="lg-m-0 m-2 p-2 text-sm text-black decoration-pink-primary decoration-4 underline-offset-8 hover:text-pink-primary hover:underline dark:text-white md:text-base lg:text-lg">
            Contact
          </Link>
        </ul>
      </div>
      <hr className="my-2 sm:mx-auto lg:my-6" />
      <span className="block text-center text-sm text-gray-500 lg:text-base">
        © 2022 RoastTime. All Rights Reserved.
      </span>
      <span className="block text-center text-sm text-gray-500 lg:text-base">
        v{packageInfo?.version}
      </span>
    </footer>
  );
};

export default Footer;
