'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { CardSpotlight } from '@/components/ui/cardspotlight';
import { useGuilds } from '@/hooks';
import { QueryStatusHelper } from '@/components/panels';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function GuildsPage() {
	const t = useTranslations('other');
	const { data, status, error, refetch } = useGuilds();

	return (
		<div className="mt-5 min-h-screen font-sans mb-8">
			<div className="h-[10rem] w-full flex-col bg-black bg-grid-small-white/[0.2] relative flex items-center justify-center">
				<div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
				<h1 className="text-4xl sm:text-7xl font-sans font-bold text-center relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
					{t('guild_selection.header')}
				</h1>
				<p className='text-center text-lg'>{t('guild_selection.description')}</p>
			</div>

			<QueryStatusHelper status={status} error={error?.message} refetch={refetch}>
				<div className='sm:flex-col flex-row grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 mx-8 sm:mx-16 md:mx-16'>
					{data?.map((guild, i) => (
						<Link href={guild.botPresent ? `/guilds/${guild.id}` : `https://discord.com/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&permissions=8&scope=bot%20applications.commands&guild_id=${guild.id}`} key={`guild-${i}-link`}>
							<CardSpotlight className='text-white hover:cursor-pointer rounded-xl' key={`guild-${i}-card`}>
								<div className='relative flex flex-row items-center'>
									<Avatar>
										<AvatarImage src={guild.icon} />
										<AvatarFallback>SP</AvatarFallback>
									</Avatar>
									<h1 className='font-sans text-semibold text-center ml-auto'>{guild.name}</h1>
								</div>
							</CardSpotlight>
						</Link>
					))}
				</div>
			</QueryStatusHelper>
		</div>
	);
}