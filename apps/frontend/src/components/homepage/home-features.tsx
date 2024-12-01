'use client';

import { HiShieldCheck } from 'react-icons/hi';
import { BsSendFill } from 'react-icons/bs';
import { FaMusic } from 'react-icons/fa';
import { FaTicket } from 'react-icons/fa6';
import { EvelynCardFeature } from '@/types';
import { FeatureCard } from '../ui/featurecard';
import { useTranslations } from 'next-intl';

export function Features() {
	const t = useTranslations('home');
	const features: EvelynCardFeature[] = [
		{
			name: t('features.feature1.name'),
			description: t('features.feature1.description'),
			icon: FaMusic,
			additionalInfo: t('features.feature1.additionalInfo'),
		},
		{
			name: t('features.feature2.name'),
			description: t('features.feature2.description'),
			icon: HiShieldCheck,
			additionalInfo: t('features.feature2.additionalInfo'),
		},
		{
			name: t('features.feature3.name'),
			description: t('features.feature3.description'),
			icon: BsSendFill,
			additionalInfo: t('features.feature3.additionalInfo'),
		},
		{
			name: t('features.feature4.name'),
			description: t('features.feature4.description'),
			icon: FaTicket,
			additionalInfo: t('features.feature4.additionalInfo'),
		},
		{
			name: t('features.feature5.name'),
			description: t('features.feature5.description'),
			icon: HiShieldCheck,
			additionalInfo: t('features.feature5.additionalInfo'),
		},
		{
			name: t('features.feature6.name'),
			description: t('features.feature6.description'),
			icon: HiShieldCheck,
			additionalInfo: t('features.feature6.additionalInfo'),
		},
		{
			name: t('features.feature7.name'),
			description: t('features.feature7.description'),
			icon: HiShieldCheck,
			additionalInfo: t('features.feature7.additionalInfo'),
		},
		{
			name: t('features.feature8.name'),
			description: t('features.feature8.description'),
			icon: HiShieldCheck,
			additionalInfo: t('features.feature8.additionalInfo'),
		},
	];

	return (
		<section>
			<div className='w-full justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1] font-sans'>
				<h2 className='text-center font-semibold xs:text-[48px] text-[40px] xs:leading-[76.8px] leading-[66.8px] w-full bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500'>{t('features.header.title')}</h2>
				<p className='font-normal text-dimWhite text-[18px] leading-[30.8px] text-center mt-5'>
					{t('features.header.description')}
				</p>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-12 max-w-7xl mx-auto px-10 text-white'>
				{features.map((feature, i) => (
					<FeatureCard key={`feature_${feature.name}_key`} title={feature.name} description={feature.description} icon={<feature.icon />} index={i} additionalInfo={feature.additionalInfo} />
				))}
			</div>
		</section>
	);
};