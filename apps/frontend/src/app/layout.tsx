import { NextAuthProvider, QueryProvider } from '@components/providers';
import type { ReactNode } from 'react';
import { Metadata } from 'next';
import '@/styles/global.css';

import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

export const metadata: Metadata = {
	title: 'Evelyn',
	description: 'PLACEHOLDER',
};

export default function RootLayout({
	children,
}: {
    children: ReactNode,
  }) {
	return (
		<html lang='en' className={`${GeistMono.variable} ${GeistSans.variable}`} suppressHydrationWarning>
			<body className='antialiased'>
				<NextAuthProvider>
					<QueryProvider>
						{children}
					</QueryProvider>
				</NextAuthProvider>
			</body>
		</html>
	);
}