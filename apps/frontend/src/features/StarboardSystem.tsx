'use client';

import { StarboardFeature } from '@/types/features';
import { ChannelSelectForm, NumericTextForm } from '@Forms';
import { zodResolver } from '@hookform/resolvers/zod';
import type { UseFormRender } from '@Types';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({
	channel: z.string(),
	starsRequirement:
		z.number()
			.min(1, {
				message: 'Stars requirement cannot be less than 1.',
			})
			.max(100, {
				message: 'Stars requirement cannot be higher than 100.',
			}),
});
type FeatureSchema = z.infer<typeof schema>;

export const useStarboardSystem: UseFormRender<StarboardFeature> = (data, onSubmit) => {
	const { reset, handleSubmit, formState, control } = useForm<FeatureSchema>({
		resolver: zodResolver(schema),
		shouldUnregister: false,
		defaultValues: {
			channel: data.channel,
			starsRequirement: data.starsRequirement,
		},
	});

	return {
		component: (
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
				<ChannelSelectForm
					control={{
						label: 'Channel',
						description: 'The channel where the Starboard module will send starred messages.',
					}}
					controller={{ control, name: 'channel' }}
				/>
				<NumericTextForm
					control={{
						label: 'Stars',
						description: 'The amount of star reactions required to send the message to the starboard channel.',
					}}
					controller={{ control, name: 'starsRequirement' }}
					showHeader={true}
				/>
			</div>
		),
		onSubmit: handleSubmit(async (e) => {
			await onSubmit(
				JSON.stringify({
					channel: e.channel,
					starsRequirement: e.starsRequirement,
				}),
			);

			reset(e);
		}),
		canSave: formState.isDirty,
		reset: () => reset(control._defaultValues),
	};
};

