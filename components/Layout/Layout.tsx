import React, { ReactNode } from 'react'
import { Navbar } from '../Navbar'
import Footer from '../Footer/Footer';
import Head from 'next/head';
import Image from 'next/image';

interface LayoutProps {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Head>
                <title>RoastTime</title>
                <link rel="icon" href="/logo.png" />
                <meta property="og:title" content="RoastTime table reservation" key="title" />
            </Head>
            <Navbar />
            <div>{children}</div>
            <Footer />
        </>
    )
}


export default Layout
