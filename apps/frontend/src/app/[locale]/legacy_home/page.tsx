'use client';

import { useSelfUserQuery } from '@/hooks/hooks';
import { useTranslations } from 'next-intl';
import { GuildSelect } from '@UI';

export default function HomePage() {
	const t = useTranslations('dash');
	const { data } = useSelfUserQuery();

	return (
		<div className='flex flex-col gap-5 justify-center text-white bg-secondary p-[24px] mt-5 rounded-[10px]'>
			<div className='flex flex-col gap-1 mt-3 items-center'>
				<h2 className='text-2xl text-semibold font-poppins'>{t('servers.title')} {data?.username}!</h2>
				<h1 className='text-dimWhite text-sm'>{t('servers.description')}</h1>
			</div>
			<GuildSelect />
		</div>
	);
}
