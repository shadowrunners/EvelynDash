'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFeature } from '@/components/contexts/featurecontext';
import { ChannelSelectForm, EmbedForm, TextForm } from '@/components/forms';
import { Savebar } from '@/components/ui/savebar';
import FeatureHeader from '@/components/ui/featureheader';

const FormSchema = z.object({
	channel: z
		.string({
			required_error: 'Select a channel in order to receive goodbye messages.',
		}),
	embed: z.object({
		content: z.string(),
		color: z.string(),
		title: z.string(),
		author: z.object({
			name: z.string(),
			iconURL: z.string(),
		}),
		description: z.string(),
		thumbnail: z.string(),
		image: z.string(),
		footer: z.object({
			text: z.string(),
			iconURL: z.string(),
		}),
	}),
});

export default function GoodbyeFeature() {
	const feature = useFeature<z.infer<typeof FormSchema>>();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			channel: feature?.data.channel || '',
			embed: {
				title: feature?.data?.embed?.title || '',
				content: feature?.data?.embed?.content || '',
				color: feature?.data?.embed?.color || '',
				description: feature?.data?.embed?.description || '',
				image: feature?.data?.embed?.image || '',
				footer: {
					text: feature?.data?.embed?.footer.text || '',
					iconURL: feature?.data?.embed?.footer.iconURL || '',
				},
				thumbnail: feature?.data?.embed?.thumbnail || '',
			},
		},
	});
	const t = useTranslations('dash');

	console.log(feature);

	return (
		<div>
			<FeatureHeader name={t('features.goodbye.title')} description={t('features.goodbye.description')} />

			<div className="flex-row grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-3 mt-5 gap-4">
				<ChannelSelectForm form={form} formName='channel' formLabel='Channel' formDescription='The channel where the goodbye message will be sent.' />
				<TextForm form={form} formName='embed.content' formLabel='Message' formDescription='The message that will be sent alongside the embed.' />
			</div>

			<EmbedForm form={form} formName='embed' formLabel='Embed Settings' formDescription='Manage the embed that will be sent alongside the message.' />
			<Savebar feature='goodbye' form={form} />
		</div>
	);
}

