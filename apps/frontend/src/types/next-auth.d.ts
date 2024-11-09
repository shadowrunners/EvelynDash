/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth';

declare module 'next-auth' {
	interface Session {
		accessToken: string | unknown;
		user: {
			name: string | null | undefined;
			id: string | undefined;
			avatarURL: string | null | undefined;
		}
	}
}