import Dashboard from "components/Dashboard/Dashboard";
import Banner from "components/Banner/Banner";
import Adjustment from "components/Adjustment/Adjustment";
import Pagination from "components/Pagination/Pagination";
import SearchBar from "components/SearchBar/SearchBar";
import { sessionOptions } from "utils/config";
import { GetServerSideProps } from "next";
import { withIronSessionSsr } from "iron-session/next";
import type { NextPage } from "next";

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
			<Adjustment />
			<Dashboard />
			<Pagination />
		</div>
	);
};

export default Home;
