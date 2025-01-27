'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFeature } from '@/components/contexts/featurecontext';
import { ChannelSelectForm, EmbedForm, RoleSelectForm } from '@/components/forms';
import { Savebar } from '@/components/ui/savebar';
import FeatureHeader from '@/components/ui/featureheader';

const FormSchema = z.object({
	transcriptChannel: z
		.string({
			required_error: 'Select a channel in order to receive transcripts.',
		}),
	assistantRole: z
		.string(),
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

export default function TicketsFeature() {
	const feature = useFeature<z.infer<typeof FormSchema>>();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			transcriptChannel: feature?.data.transcriptChannel || '',
			assistantRole: feature?.data.assistantRole || '',
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
			<FeatureHeader name={t('features.tickets.title')} description={t('features.tickets.description')} />

			<div className="flex-row grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-3 mt-5 gap-4">
				<ChannelSelectForm form={form} formName='transcriptChannel' formLabel='Transcripts Channel' formDescription='The channel where transcripts will be sent in.' />
				<RoleSelectForm form={form} formName='assistantRole' formLabel='Assistant Role' formDescription='The role that will be pinged when new tickets come in.' />
			</div>

			<EmbedForm form={form} formName='embed' formLabel='Embed Settings' formDescription='Manage the embed that will be sent alongside the message.' />
			<Savebar feature='tickets' form={form} />
		</div>
	);
}

