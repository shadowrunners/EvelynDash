'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFeature } from '@/components/contexts/featurecontext';
import { ChannelSelectForm } from '@/components/forms';
import { Savebar } from '@/components/ui/savebar';

const FormSchema = z.object({
	channel: z
		.string({
			required_error: 'Select a channel in order to receive confessions.',
		}),
});

export default function ConfessionsFeature() {
	const feature = useFeature<z.infer<typeof FormSchema>>();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			channel: feature?.data.channel ?? '',
		},
	});
	const t = useTranslations('dash');

	console.log(feature);

	return (
		<div>
			<header className="bg-primary p-4 rounded-xl mt-2">
				<h1 className="text-xl font-semibold">{t('features.confessions.title')}</h1>
				<p className="text-dimWhite">{t('features.confessions.description')}</p>
			</header>

			<div className="flex-row grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-3 mt-5">
				<ChannelSelectForm form={form} formName='channel' formLabel='Channel' formDescription='PLACEHOLDER' />
			</div>

			<Savebar feature='confessions' form={form} />
		</div>
	);
}

