import { QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@/theme/config';
import { client } from '@/api/hooks';
import type { AppProps } from 'next/app';
import { ReactNode } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import '@/styles/global.css';
import { SessionProvider } from 'next-auth/react';

export type NextPageWithLayout = NextPage & {
  getLayout?: (children: ReactNode) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((c) => c);

	return (
		<SessionProvider session={session}>
			<ChakraProvider theme={theme}>
				<QueryClientProvider client={client}>
					<Head>
						<title>Evelyn</title>
					</Head>
					{getLayout(<Component {...pageProps} />)}
				</QueryClientProvider>
			</ChakraProvider>
		</SessionProvider>
	);
}
