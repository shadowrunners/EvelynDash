import createIntlMiddleware from 'next-intl/middleware';
import { withAuth } from 'next-auth/middleware';
import { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const locales = ['en'];
const publicPages = ['/', '/privacy', '/tos', '/commands', '/auth/signin'];

const intlMiddleware = createIntlMiddleware(routing);

const authMiddleware = withAuth(
	// Note that this callback is only invoked if
	// the `authorized` callback has returned `true`
	// and not for pages listed in `pages`.
	function onSuccess(req) {
		return intlMiddleware(req);
	},
	{
		callbacks: {
			authorized: ({ token }) => token != null,
		},
		pages: {
			signIn: '/auth/signin',
			signOut: '/',
		},
	},
);

export default function middleware(req: NextRequest) {
	const publicPathnameRegex = RegExp(
		`^(/(${locales.join('|')}))?(${publicPages
			.flatMap((p) => (p === '/' ? ['', '/'] : p))
			.join('|')})/?$`,
		'i',
	);
	const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

	if (isPublicPage) {
		return intlMiddleware(req);
	}
	else {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return (authMiddleware as any)(req);
	}
}
export const config = { matcher: [ '/', '/(de|en)/:path', '/guilds/:path*', '/pickaguild/:path*', '/((?!api|images|_next|.*\\\\..*).*)'] };
