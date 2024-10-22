import { NextIntlClientProvider, useMessages } from 'next-intl';
import type { ReactNode } from 'react';
import '@/styles/global.css';

import CookieConsent from '@/components/ui/cookieconsent';

export default function LocaleLayout({
	children,
	params: { locale },
}: {
	children: ReactNode,
	params: { locale: string }
}) {
	const messages = useMessages();

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