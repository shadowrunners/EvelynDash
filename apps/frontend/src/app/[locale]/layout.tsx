import { NextAuthProvider, QueryProvider } from '@components/providers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { CookieConsent } from '@components/ui';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { ReactNode } from 'react';
import '@/styles/global.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Evelyn',
	description: 'PLACEHOLDER',
};

export default async function LocaleLayout(
	props: {
        children: ReactNode;
        params: Promise<{ locale: string }>;
    },
) {
	const params = await props.params;

	const {
		locale,
	} = params;

	const {
		children,
	} = props;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	if (!routing.locales.includes(locale as any)) {
		notFound();
	}

	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning={true}>
			<body>
				<NextAuthProvider>
					<QueryProvider>
						<NextIntlClientProvider locale={locale} messages={messages}>
							{children}
							<CookieConsent />
						</NextIntlClientProvider>
					</QueryProvider>
				</NextAuthProvider>
			</body>
		</html>
	);
}