import Banner from "components/Banner/Banner";
import Dashboard from "components/Dashboard/Dashboard";
import Pagination from "components/Pagination/Pagination";
import SearchBar from "components/SearchBar/SearchBar";
import { withIronSessionSsr } from "iron-session/next";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { sessionOptions } from "utils/config";

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(({ req, res }) => {
	const { user } = req.session;
	const accountType = user?.account?.accountType;

	if (accountType === "RESTAURANT") {
		return {
			redirect: {
				destination: "/restaurant/orders",
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
}, sessionOptions);

const Home: NextPage = () => {
	return (
		<div className="mb-20">
			<Banner title="Lets find you the best coffee shop">
				<SearchBar />
			</Banner>
			<Dashboard />
			<Pagination />
		</div>
	);
};

export default Home;
