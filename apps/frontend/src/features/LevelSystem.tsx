'use client';

import { ChannelSelectForm, MultiChannelSelectForm, MultiRoleSelectForm, TextAreaForm } from '@Forms';
import type { UseFormRender } from '@Types';
import { useForm } from 'react-hook-form';
import { Fragment } from 'react';
import { LevelTable } from '@/components/ui/leveltable';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const restrictedChannelsSchema = z.string();
const restrictedRolesSchema = z.string();
const roleRewardsSchema = z.object({
	level: z.number(),
	roleId: z.string(),
});

const schema = z.object({
	channel: z.string({
		required_error: 'This value is required.',
	}),
	message: z.string({
		required_error: 'This value is required.',
	}),
	restrictedChannels: z.array(restrictedChannelsSchema),
	restrictedRoles: z.array(restrictedRolesSchema),
	roleRewards: z.array(roleRewardsSchema),
}).required();
type LevellingFeature = z.infer<typeof schema>;

export const useLevellingSystem: UseFormRender<LevellingFeature> = (data, onSubmit) => {
	const { reset, handleSubmit, formState, control } = useForm<LevellingFeature>({
		resolver: zodResolver(schema),
		shouldUnregister: false,
		defaultValues: {
			channel: data.channel,
			message: data.message,
			restrictedChannels: data.restrictedChannels,
			restrictedRoles: data.restrictedRoles,
			roleRewards: data.roleRewards,
		},
	});

	return {
		component: (
			<Fragment>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
					<ChannelSelectForm
						control={{
							label: 'Channel',
							description: 'The channel where level up messages will sent in.',
						}}
						controller={{ control, name: 'channel' }}
					/>
					<TextAreaForm
						control={{
							label: 'Message',
							description: 'The message that will be sent when a user levels up.',
						}}
						controller={{ control, name: 'message' }}
					/>
					<MultiRoleSelectForm
						control={{
							label: 'Unlevelable Roles',
							description: 'This controls what roles will not receive any XP.',
						}}
						controller={{ control, name: 'restrictedRoles' }}
					/>
					<MultiChannelSelectForm
						control={{
							label: 'Unlevelable Channels',
							description: 'The controls what channels XP can\'t be received in.',
						}}
						controller={{ control, name: 'restrictedChannels' }}
					/>
				</div>

				<LevelTable
				// @ts-ignore
					control={control}
					// @ts-ignore
					controller={{ control, name: 'roleRewards' }}
				/>
			</Fragment>
		),
		onSubmit: handleSubmit(async (e) => {
			const mappedChannels = new Set(e.restrictedChannels?.map((c: string | { value: string }) => typeof c === 'string' ? c : c?.value));
			const mappedRoles = new Set(e.restrictedRoles?.map((r: string | { value: string }) => typeof r === 'string' ? r : r?.value));

			await onSubmit(
				JSON.stringify({
					channel: e.channel,
					message: e.message,
					restrictedChannels: Array.from(mappedChannels),
					restrictedRoles: Array.from(mappedRoles),
					roleRewards: e.roleRewards,
				}),
			);

			reset(e);
		}),
		canSave: formState.isDirty,
		reset: () => reset(control._defaultValues),
	};
};
