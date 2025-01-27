'use client';

import type { FormParams } from '@Types';
import {
	Form,
	FormField,
	FormItem,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
} from '@UI';
import { useGuild } from '../contexts/guildcontext';
import { MultiSelect } from '../ui/multi-select';

export function RoleSelectForm({
	form,
	formName,
	formLabel,
	formDescription,
}: FormParams) {
	const guild = useGuild();

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
							<Select onValueChange={field.onChange} defaultValue={field.value} disabled={form.formState.isLoading}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select a role.' />
									</SelectTrigger>
								</FormControl>
								<SelectContent className='bg-secondary text-white'>
									{guild?.data.roles.map((role) => (
										<SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
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
};

export function MultiRoleSelectForm({
	form,
	formName,
	formLabel,
	formDescription,
}: FormParams) {
	const guild = useGuild();
	const options = guild?.data.roles.map((role) => ({ label: role.name, value: role.id }));

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
									placeholder='Select some roles.'
									// @ts-ignore
									options={options}
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