'use client';

import { useRouter } from '@/i18n/routing';
import { ArrowLeft } from 'lucide-react';

import { useTranslations } from 'next-intl';
import { Vortex } from '@/components/ui/vortex';
import { Metadata } from 'next';
import { FancyButton } from '@/components/ui/button';

// have to import css here too otherwise styles literally don't fucking work
// don't know why and how but it is what it is
// fuckin hell
import '@/styles/global.css';

// this doesn't work at all
export const metadata: Metadata = {
	title: 'Evelyn | 404',
};

export default function NotFound() {
	const t = useTranslations('other');
	const router = useRouter();

	return (
		<Vortex baseSpeed={0.1} rangeSpeed={0.2}>
			<div className='h-screen flex flex-col items-center justify-center text-white font-sans p-4 sm:p-8'>
				<h1 className='text-5xl sm:text-7xl font-extrabold text-center mb-4'>{t('404_page.header')}</h1>
				<p className='text-lg sm:text-xl text-center mb-2 break-words'>{t('404_page.description')}</p>
				<FancyButton onClick={() => router.back()}>
					<ArrowLeft className="mr-2" /> {t('404_page.button')}
				</FancyButton>
			</div>
		</Vortex>
	);
}