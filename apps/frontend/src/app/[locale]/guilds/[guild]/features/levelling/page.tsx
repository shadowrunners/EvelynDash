'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFeature } from '@/components/contexts/featurecontext';
import { ChannelSelectForm, TextForm } from '@/components/forms';
import { Savebar } from '@/components/ui/savebar';
import FeatureHeader from '@/components/ui/featureheader';
import { MultiRoleSelectForm } from '@/components/forms/roleselectform';
import { MultiChannelSelectForm } from '@/components/forms/channelselectform';

const FormSchema = z.object({
	channel: z
		.string({
			required_error: 'Select a channel in order to receive level messages.',
		}),
	message: z.string(),
	restrictedChannels: z.array(z.string()),
	restrictedRoles: z.array(z.string()),
	roleRewards: z.array(z.object({
		level: z.number(),
		roleId: z.string(),
	})),
});

export default function LevelsFeature() {
	const feature = useFeature<z.infer<typeof FormSchema>>();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			channel: feature?.data.channel ?? '',
			message: feature?.data.message ?? '',
			restrictedChannels: feature?.data.restrictedChannels ?? [],
			restrictedRoles: feature?.data.restrictedRoles ?? [],
			roleRewards: feature?.data.roleRewards ?? [],
		},
	});
	const t = useTranslations('dash');

	console.log(feature);

	// TODO: Level table.
	// <LevelTable
	// @ts-ignore
	//	control={control}
	// @ts-ignore
	//	controller={{ control, name: 'roleRewards' }}
	// />


	return (
		<div>
			<FeatureHeader name={t('features.levelling.title')} description={t('features.levelling.description')} />

			<div className="flex-row grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-3 mt-5 gap-4">
				<ChannelSelectForm form={form} formName='channel' formLabel='Channel' formDescription='The channel where level up messages will sent in.' />
				<TextForm form={form} formName='message' formLabel='Message' formDescription='The message that will be sent when a user levels up.' />
				<MultiRoleSelectForm form={form} formName='restrictedRoles' formLabel='Unlevelable Roles' formDescription='Controls what roles will not receive any XP.' />
				<MultiChannelSelectForm form={form} formName='restrictedChannels' formLabel='Unlevelable Channels' formDescription='Controls in what channels XP will not be received in.' />
			</div>

			<Savebar feature='levelling' form={form} />
		</div>
	);
}

