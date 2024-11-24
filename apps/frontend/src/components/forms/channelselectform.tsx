'use client';

import type {
	ControlledInput,
	FormParams,
	SelectMenuProps,
} from '@Types';

import {
	Form,
	FormField,
	FormItem,
	FormControl,
	FormMessage,
	Spacer,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	FormLabel,
	FormDescription,
} from '@UI';
import { useGuildChannelsQuery, useGuildId } from '@/hooks';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';
import MultipleSelector from '../ui/test2';
import { useGuild } from '../contexts/guildcontext';

import {
	type APIChannel,
	ChannelType,
} from 'discord-api-types/v10';

export function ChannelSelectForm({
	form,
	formName,
	formLabel,
	formDescription,
}: FormParams) {
	const guild = useGuild();
	const channels = guild?.data.channels.filter((channel: APIChannel) => channel.type === ChannelType.GuildText);

	return (
		<Form {...form}>
			<form className='bg-muted/40 width-[50%] relative border-r-3xl space-y-6 p-4 shadow rounded-xl'>
				<FormField
					control={form.control}
					name={formName}
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								{formLabel}
							</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select a channel.' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{channels?.map((channel) => (
										<SelectItem value={channel.id}>{channel.name}</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormDescription>
								{formDescription}
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}

export const MultiChannelSelectForm: ControlledInput<Omit<SelectMenuProps, 'value' | 'onChange'>> = ({
	control,
	controller,
	...props
}) => {
	const form = useForm();
	const guild = useGuildId();
	const { data, isLoading } = useGuildChannelsQuery(guild);

	const options = useMemo(() => {
		const channels = data?.filter((channel) => channel.type === ChannelTypes.GUILD_TEXT);
		return channels?.map((channel) => ({ label: channel.name, value: channel.id }));
	}, [data]);

	return (
		<div className='grid gap-3'>
			<div className="flex flex-col width-[100%] relative border-r-3xl p-5 shadow bg-secondary rounded-3xl">
				<label className="block text-start mr-3 transition-all duration-300 opacity-100 text-base font-medium mb-0">
					<h2 className="text-2xl font-semibold">{control.label}</h2>
					<p className="text-gray-500 mb-3">{control.description}</p>
				</label>
				<Spacer />
				<Form {...form}>
					<FormField
						control={controller.control}
						name={controller.name}
						render={({ field }) => {
							const selected = useMemo(() => {
								const selectedValues = new Set(field.value.map((channel: { value: string; }) => typeof channel === 'string' ? channel : channel?.value));
								return options?.filter((channel) => selectedValues.has(channel?.value));
							}, [options, field.value]);

							return (
								<FormItem>
									<FormControl>
										<MultipleSelector
											{...field}
											{...props}
											label='Text Channels'
											placeholder='Select a channel.'
											options={options}
											disabled={isLoading}
											value={selected}
											className='bg-secondary text-white'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
				</Form>
			</div>
		</div>
	);
};