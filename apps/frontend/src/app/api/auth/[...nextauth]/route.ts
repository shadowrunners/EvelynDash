import DiscordProvider from 'next-auth/providers/discord';
import NextAuth, { type NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
	providers: [
		DiscordProvider({
			clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
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
	},
	pages: {
		signOut: '/',
		signIn: '/auth/signin',
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };