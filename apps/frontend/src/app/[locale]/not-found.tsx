'use client';

import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FancyButton } from '@/components/ui/button';
import { Spotlight } from '@components/ui/spotlight';

export default function NotFound() {
	const t = useTranslations('other');

	return (
		<div className='h-screen flex flex-col items-center justify-center text-white font-sans p-4 sm:p-8 bg-black bg-grid-white/[0.02]'>
			<Spotlight />
			<h1 className='text-5xl sm:text-7xl font-extrabold text-center mb-4'>{t('404_page.header')}</h1>
			<p className='text-lg sm:text-xl text-center mb-2 break-words'>{t('404_page.description')}</p>
			<FancyButton onClick={() => window.history.back()}>
				<ArrowLeft className="mr-2" /> {t('404_page.button')}
			</FancyButton>
		</div>
	);
}