import React, { ReactNode } from 'react'
import { Navbar } from '../Navbar'

interface LayoutProps {
    children: ReactNode    
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Navbar />
            <div>{children}</div>
        </>
    )
}


export default Layout
