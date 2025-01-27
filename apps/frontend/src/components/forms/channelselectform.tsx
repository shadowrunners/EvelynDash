'use client';

import type { FormParams } from '@Types';

import {
	Form,
	FormField,
	FormItem,
	FormControl,
	FormMessage,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	FormLabel,
	FormDescription,
} from '@UI';
import { useGuild } from '../contexts/guildcontext';

import {
	type APIChannel,
	ChannelType,
} from 'discord-api-types/v10';
import { MultiSelect } from '../ui/multi-select';

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
										<SelectItem key={channel.id} value={channel.id}>{channel.name}</SelectItem>
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
	);
}

export function MultiChannelSelectForm({
	form,
	formName,
	formLabel,
	formDescription,
}: FormParams) {
	const guild = useGuild();

	const filteredChannels = guild?.data?.channels.filter((channel) => channel.type === ChannelType.GuildText);
	const channels = filteredChannels?.map((channel) => ({ label: channel.name, value: channel.id }));

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
							<FormControl>
								<MultiSelect
									{...field}
									placeholder='Select a channel.'
									// eslint-disable-next-line @typescript-eslint/ban-ts-comment
									// @ts-ignore
									options={channels}
									className='bg-secondary text-white'
									onValueChange={field.onChange}
								/>
							</FormControl>
							<FormDescription>
								{formDescription}
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
};