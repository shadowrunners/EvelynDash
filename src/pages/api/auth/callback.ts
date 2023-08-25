import { NextApiRequest, NextApiResponse } from 'next';
import {
	AccessToken,
	API_ENDPOINT,
	CLIENT_ID,
	CLIENT_SECRET,
	setServerSession,
} from '@/utils/auth/server';
import { i18n } from 'next.config';
import { z } from 'zod';
import { getAbsoluteUrl } from '@/utils/utils';

async function exchangeToken(code: string): Promise<AccessToken> {
	const response = await fetch(`${API_ENDPOINT}/oauth2/token`, {
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		method: 'POST',
		body: `client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=authorization_code&code=${code}&redirect_uri=${getAbsoluteUrl()}/api/auth/callback`,
	});

	if (response.ok) return (await response.json()) as AccessToken;
	else throw new Error('Failed to exchange token');
}

const querySchema = z.object({
	code: z.string(),
	state: z
		.string()
		.optional()
	// Handle unsupported locales
		.transform((v) => {
			if (i18n == null || v == null) return undefined;

			return i18n.locales.find((locale) => locale === v);
		}),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const query = querySchema.safeParse(req.query);

	if (!query.success) return res.status(400).json('Invalid query param');

	const { code, state } = query.data;
	const token = await exchangeToken(code);

	setServerSession(req, res, token);
	return res.redirect(state ? `/${state}/user/home` : '/user/home');
}
