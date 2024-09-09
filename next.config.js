/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	images: {
		domains: ["images.unsplash.com", "res.cloudinary.com", "demos.creative-tim.com"],
	},
	eslint: {
		ignoreDuringBuilds: false,
	},
};

module.exports = nextConfig;
