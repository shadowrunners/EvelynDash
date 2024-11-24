'use client';

import { Card, CardContent, CardFooter, Button } from '@/components/ui';
import { LoadingPanel, QueryStatus } from '@/components/panels';
import { useTranslations } from 'next-intl';
import { BiSolidErrorAlt } from 'react-icons/bi';
import { FaRobot } from 'react-icons/fa';
import { useGuildInfoQuery } from '@/hooks';
import { useRouter } from 'next/navigation';
import { getFeatures } from '@/utils';
import type { HVGuild } from '@/types/types';

const GuildPage = ({ params }: { params: { guild: string }}) => {
	const guild = params.guild;
	const t = useTranslations('error');
	const query = useGuildInfoQuery(guild);

	return (
		<QueryStatus query={query} loading={<LoadingPanel />} error={t('load')}>
			{query?.data?.id != null ? (
				<GuildPanel guild={guild} data={query.data} />
			) : (<NotJoined guild={guild} />)}
		</QueryStatus>
	);
};

function GuildPanel({ guild: id, data }: { guild: string; data: HVGuild }) {
	const Router = useRouter();
	const t = useTranslations('dash');

	return (
		<div className='flex flex-col gap-5 text-white'>
			<h1 className='text-[23px] font-poppins font-semibold mt-5 ml-2'>{t('features.name')}</h1>
			<div className="flex-row grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-3 gap-3">
				{getFeatures().map((feature) => (
					<Card className='bg-secondary text-white border fade-in-5'>
						<CardContent className='flex flex-gap gap-3 mt-5'>
							<div className='flex rounded-xl w-[50px] h-[50px] text-3xl bg-primary border justify-center items-center'>
								<feature.icon />
							</div>
							<div className="flex-1">
								<p className="font-semibold text-base md:text-lg">
									{feature.name}
								</p>
								<p className="text-sm md:text-md text-muted-foreground">
									{feature.description}
								</p>
							</div>
						</CardContent>
						<CardFooter>
							<Button
								variant='default'
								className='rounded-2xl text-white font-poppins font-semibold bg-primary'
								onClick={() => Router.push(`/guilds/${id}/features/${feature.id}`)}
							>
								{data?.enabledFeatures?.includes(feature.id) ? t('button.configfeature') : t('button.enablefeature')}
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
}

function NotJoined({ guild }: { guild: string }) {
	const t = useTranslations('error');
	const t2 = useTranslations('dash');
	const Router = useRouter();

	return (
		<div className='flex justify-center items-center flex-col gap-3 h-full p-5'>
			<BiSolidErrorAlt className='w-[50px] h-[50px] text-white' />
			<h1 className='text-xl font-semibold text-white'>
				{t('not_found')}
			</h1>
			<h1 className='text-center text-dimWhite'>
				{t('not_found_desc')}
			</h1>
			<Button
				variant='outline'
				className='px-6 text-white'
				onClick={() => Router.push(`https://discord.com/oauth2/authorize?client_id=1104526040656785418&scope=bot&guild_id=${guild}`)}
			>
				<FaRobot className='mr-2 text-white' />
				{t2('button.invite')}
			</Button>
		</div>
	);
}

export default GuildPage;