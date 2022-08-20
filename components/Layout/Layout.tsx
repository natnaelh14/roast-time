import React, { ReactNode } from 'react'
import { Navbar } from '../Navbar'
import Footer from '../Footer/Footer';
interface LayoutProps {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Navbar />
            <div>{children}</div>
            <Footer />
        </>
    )
}


export default Layout
