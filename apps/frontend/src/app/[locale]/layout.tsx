import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { CookieConsent } from '@components/ui';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { ReactNode } from 'react';
import '@/styles/global.css';

export default async function LocaleLayout({
	children,
	params: { locale }
}: {
	children: ReactNode;
	params: { locale: string };
}) {
	if (!routing.locales.includes(locale as any)) {
		notFound();
	};

	const messages = await getMessages();

	return (
		<html lang={locale}>
			<body>
				<NextIntlClientProvider locale={locale} messages={messages}>
					{children}
					<CookieConsent />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}