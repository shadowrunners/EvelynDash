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
			session.accessToken = token.accessToken;
			session.user.id = token.sub;
			session.user.name = token.name;
			session.user.avatarURL = token.picture;

			return session;
		},
		// TODO: Redirect user to /pickaguild after authentication
	},
	pages: {
		signOut: '/',
		signIn: '/auth/signin',
	},
});

export { handler as GET, handler as POST };