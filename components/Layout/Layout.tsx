import { Navbar } from "../Navbar";
import Footer from "../Footer/Footer";
import React, { ReactNode } from "react";
import Head from "next/head";
import { ToastBar, Toaster } from "react-hot-toast";
import { useColorScheme } from "contexts/ColorSchemeContext";

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	const { colorScheme } = useColorScheme();
	const toasterStyle = {
		backgroundColor: colorScheme === "dark" ? "#333" : "white",
		color: colorScheme === "dark" ? "#fff" : "black",
	};

	return (
		<>
			<Head>
				<title>RoastTime</title>
				<link rel="icon" href="/logo.png" />
				<meta property="og:title" content="RoastTime table reservation" key="title" />
			</Head>
			<Navbar />
			<Toaster position="top-center">{(t) => <ToastBar toast={t} style={toasterStyle} />}</Toaster>
			<div className="mt-20">{children}</div>
			<Footer />
		</>
	);
};

export default Layout;
