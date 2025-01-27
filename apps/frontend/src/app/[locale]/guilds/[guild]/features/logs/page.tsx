'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFeature } from '@/components/contexts/featurecontext';
import { ChannelSelectForm } from '@/components/forms';
import { Savebar } from '@/components/ui/savebar';
import FeatureHeader from '@/components/ui/featureheader';

const FormSchema = z.object({
	channel: z
		.string({
			required_error: 'Select a channel in order to receive logs.',
		}),
});

export default function LogsFeature() {
	const feature = useFeature<z.infer<typeof FormSchema>>();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			channel: feature?.data.channel || '',
		},
	});
	const t = useTranslations('dash');

	return (
		<div>
			<FeatureHeader name={t('features.logs.title')} description={t('features.logs.description')} />

			<div className="flex-row grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-3 mt-5">
				<ChannelSelectForm form={form} formName='channel' formLabel='Channel' formDescription='PLACEHOLDER' />
			</div>

			<Savebar feature='logs' form={form} />
		</div>
	);
}

