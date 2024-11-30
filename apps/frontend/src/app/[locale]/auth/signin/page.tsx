'use client';

import { signIn } from 'next-auth/react';
import { FaDiscord } from 'react-icons/fa';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@UI';
import { Vortex } from '@/components/ui/vortex';
import { Link } from '@/i18n/routing';
import { Fragment, useState } from 'react';
import { LuLoader2 } from 'react-icons/lu';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
	const [loading, setLoading] = useState(false);
	const t = useTranslations('auth');

	// gets the callback url (non i18n since locale is already filled in)
	const callbackUrl = useSearchParams().get('callbackUrl') as string;

	return (
		<div className="w-full min-h-screen bg-black flex justify-center items-center font-sans">
			<Vortex baseSpeed={0.2} rangeSpeed={0.4}>
				<Card className="mx-auto max-w-sm bg-secondary/40 backdrop-blur-md">
					<CardHeader>
						<CardTitle className="text-xl font-bold">{t('card_title')}</CardTitle>
						<CardDescription>{t('card_description')} </CardDescription>
					</CardHeader>
					<CardContent>
						<button
							className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 w-full"
							onClick={async () => {
								setLoading(true);
								await signIn('discord', { callbackUrl });
							}}
						>
							{loading
								? <LuLoader2 className="animate-spin" />
								: <Fragment><FaDiscord className="mr-3" />{t('oauth_button')}</Fragment>
							}
						</button>
					</CardContent>
					<CardFooter>
						<p className="text-left text-sm text-muted-foreground">
							{t('card_footer_part1')}<Link href='/privacy' className="ml-1 hover:text-white">{t('card_footer_link1')}</Link> and<Link href='/tos' className="ml-1 hover:text-white">{t('card_footer_link2')}</Link>.
						</p>
					</CardFooter>
				</Card>
			</Vortex>
		</div>
	);
}