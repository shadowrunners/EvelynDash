'use client';

import { type CustomFeatures, type FeatureConfig, Features } from '@/types/features';
import { useEnableFeatureMutation, useFeatureQuery, useGuildId } from '@/hooks';
import { UpdateFeaturePanel, LoadingPanel } from '@/components/panels';
import GuildLayout from '@/app/[locale]/pickaguild/layout';
import { Fragment, ReactNode, use } from 'react';
import { useTranslations } from 'next-intl';
import { BsSearch } from 'react-icons/bs';
import { Button } from '@/components/ui';

export type Params = { feature: keyof CustomFeatures; };

const FeaturePage = (props: { params: Promise<{ feature: keyof CustomFeatures }> }) => {
    const params = use(props.params);
    const { feature } = params;
    const guild = useGuildId();

    const query = useFeatureQuery(guild, feature);
    const featureConfig = Features()[feature] as FeatureConfig<typeof feature>;
    const skeleton = featureConfig?.useSkeleton?.();

    if (featureConfig == null) return <NotFound />;
    if (query.isError) return <NotEnabled feature={params.feature} />;
    if (query.isLoading) return skeleton != null ? <Fragment>{skeleton}</Fragment> : <LoadingPanel />;
    return <UpdateFeaturePanel key={feature} guild={guild} featureId={feature} feature={query.data} config={featureConfig} />;
};

function NotEnabled({ feature }: Params) {
	const t = useTranslations('error');
	const t2 = useTranslations('dash');
	const enable = useEnableFeatureMutation();
	const guild = useGuildId();

	return (
		<div className='flex justify-center items-center flex-col h-full gap-1 text-white'>
			<h1 className='text-xl text-semibold text-white'>
				{t('not_enabled')}
			</h1>
			<p className='text-dimWhite'>{t('not_enabled_desc')}</p>
			<Button
				className='mt-3 px-6 text-white'
				variant='outline'
				onClick={() => enable.mutate({ enabled: true, guild, feature })}
			>
				{t2('button.enablefeature')}
			</Button>
		</div>
	);
}

function NotFound() {
	const t = useTranslations('error');

	return (
		<div className='flex justify-center items-center flex-col h-full gap-2'>
			<BsSearch className='w-[50px] h-[50px]' />
			<h2 className='text-xl xl:text-lg text-white'>{t('not_found')}</h2>
			<p className='text-dimWhite'>{t('not_found_desc')}</p>
		</div>
	);
}

FeaturePage.getLayout = (c: ReactNode) => GuildLayout({ children: c });
export default FeaturePage;
