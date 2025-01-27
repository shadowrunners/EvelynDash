'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFeature } from '@/components/contexts/featurecontext';
import { ChannelSelectForm } from '@/components/forms';
import { Savebar } from '@/components/ui/savebar';
import FeatureHeader from '@/components/ui/featureheader';
import { AutoModRules } from '@/components/ui/automod-rules';

// every rule should also include exempt channels, exempt roles etc.

const FormSchema = z.object({
	alertsChannel: z.string(),
	mentionspam: z.object({
		enabled: z.boolean(),
		exemptChannels: z.array(z.string()),
		exemptRoles: z.array(z.string()),
	}),
	profanity: z.object({
		enabled: z.boolean(),
		exemptChannels: z.array(z.string()),
		exemptRoles: z.array(z.string()),
	}),
	nsfwinvitelinks: z.object({
		enabled: z.boolean(),
		exemptChannels: z.array(z.string()),
		exemptRoles: z.array(z.string()),
	}),
	sexualcontent: z.object({
		enabled: z.boolean(),
		exemptChannels: z.array(z.string()),
		exemptRoles: z.array(z.string()),
	}),
	invitelinks: z.object({
		enabled: z.boolean(),
		exemptChannels: z.array(z.string()),
		exemptRoles: z.array(z.string()),
	}),
	spam: z.object({
		enabled: z.boolean(),
		exemptChannels: z.array(z.string()),
		exemptRoles: z.array(z.string()),
	}),
	zalgo: z.object({
		enabled: z.boolean(),
		exemptChannels: z.array(z.string()),
		exemptRoles: z.array(z.string()),
	}),
	emojispam: z.object({
		enabled: z.boolean(),
		exemptChannels: z.array(z.string()),
		exemptRoles: z.array(z.string()),
	}),
	customkeyword: z.object({
		enabled: z.boolean(),
		keyword: z.string(),
		exemptChannels: z.array(z.string()),
		exemptRoles: z.array(z.string()),
	}),
});

export default function AutoModFeature() {
	const feature = useFeature<z.infer<typeof FormSchema>>();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			alertsChannel: feature?.data?.alertsChannel ?? '',
			mentionspam: {
				enabled: feature?.data?.mentionspam?.enabled ?? false,
			},
			profanity: {
				enabled: feature?.data?.profanity?.enabled ?? false,
			},
			nsfwinvitelinks: {
				enabled: feature?.data?.nsfwinvitelinks?.enabled ?? false,
			},
			sexualcontent: {
				enabled: feature?.data?.sexualcontent?.enabled ?? false,
			},
			invitelinks: {
				enabled: feature?.data?.invitelinks?.enabled ?? false,
			},
			spam: {
				enabled: feature?.data?.spam?.enabled ?? false,
			},
			zalgo: {
				enabled: feature?.data?.zalgo?.enabled ?? false,
			},
			emojispam: {
				enabled: feature?.data?.mentionspam?.enabled ?? false,
			},
			customkeyword: {
				enabled: feature?.data?.mentionspam?.enabled ?? false,
			},
		},
	});
	const t = useTranslations('dash');

	console.log(feature);

	return (
		<div>
			<FeatureHeader name={t('features.automod.title')} description={t('features.automod.description')} />

			<div className="flex-row grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-3 mt-5 gap-4">
				<ChannelSelectForm form={form} formName='alertsChannel' formLabel='Alerts Channel' formDescription='PLACEHOLDER' />
			</div>

			<AutoModRules form={form} />

			<Savebar feature='automod' form={form} />
		</div>
	);
}

