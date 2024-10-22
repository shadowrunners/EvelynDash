import DiscordProvider from 'next-auth/providers/discord';
import NextAuth from 'next-auth';

const handler = NextAuth({
	providers: [
		DiscordProvider({
			clientId: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			authorization: 'https://discord.com/api/oauth2/authorize?scope=identify',
		}),
	],
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				token.accessToken = account.access_token;
			}

			return token;
		},
		async session({ session, token }) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			session.accessToken = token.accessToken;

			return session;
		},
	},
	pages: {
		signOut: '/',
		signIn: '/auth/signin',
	},
});

export { handler as GET, handler as POST };