import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// Disables type validity.
	// Pretty much a fucking necessity now since it spits out errors up the ass that I just can't be bothered to fix.
	typescript: {
		ignoreBuildErrors: false,
	},
	eslint: {
		// Temporary change for preview builds, so they can be previewed on devices outside my dev environment. :)
		ignoreDuringBuilds: true,
	},
};

export default withNextIntl(nextConfig);