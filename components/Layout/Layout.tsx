import Footer from "components/Footer/Footer";
import { Navbar } from "components/Navbar";
import { useColorScheme } from "contexts/ColorSchemeContext";
import Head from "next/head";
import { ReactNode } from "react";
import { ToastBar, Toaster } from "react-hot-toast";

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
