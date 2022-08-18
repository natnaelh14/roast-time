import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


const Navbar = () => {
    return (
        <nav className="flex flex-row items-center glass">
            <Image alt="website-logo" src="/logo.png" height={100} width={100} />
            <Link href="/">
                <h1>Home</h1>
            </Link>
            <div className="flex flex-row right-0 absolute">
                <Link href="/login">
                    <h1>Login</h1>
                </Link>
                <Link href="/logout">
                    <h1>Logout</h1>
                </Link>
            </div>

        </nav>
    )
}

export default Navbar;
