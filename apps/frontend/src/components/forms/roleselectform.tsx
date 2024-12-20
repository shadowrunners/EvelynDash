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

/**
 * export const MultiRoleSelect = ({
	value, onChange, ...rest
}: {
	value: SelectMenuOptionArray | string[];
	onChange: (role: SelectMenuOptionArray) => void;
}) => {
	const guild = useGuildId();
	const { data, isLoading } = useGuildRolesQuery(guild);

	const options = useMemo(() => {
		return data?.map((role) => ({ label: role.name, value: role.id }));
	}, [data]);

	const selected = useMemo(() => {
		const selectedValues = new Set(value.map((role) => typeof role === 'string' ? role : role?.value));
		return options?.filter((role) => selectedValues.has(role?.value));
	}, [options, value]);

	return (
		<SelectMenu
			isLoading={isLoading}
			isDisabled={isLoading}
			value={selected}
			placeholder='Select a role.'
			options={options}
			onChange={(e) => onChange((e as SelectMenuOptionArray))}
			{...rest}
		/>
	);
};

// this'll carry on like this, I genuinely do not want to write this implementation ever again.
// ported this shit over from role select, if it breaks, it breaks
export const MultiRoleSelectForm: ControlledInput<Omit<SelectMenuProps, 'value' | 'onChange'>> = ({
	control,
	controller,
	...props
}) => {
	const form = useForm();

	return (
		<div className='grid gap-3'>
			<div className="flex flex-col width-[100%] relative border-r-3xl p-5 shadow bg-secondary rounded-3xl">
				<label className="block text-start mr-3 transition-all duration-300 opacity-100 text-base font-medium mb-0">
					<h2 className="text-2xl font-semibold">{control.label}</h2>
					<p className="text-gray-500 mb-3">{control.description}</p>
				</label>
				<Spacer />
				<Form {...form}>
					<form>
						<FormField
							control={controller.control}
							name={controller.name}
							render={({ field }) => (
								<MultiRoleSelect {...field} {...props} />
							)}
						/>
					</form>
				</Form>
			</div>
		</div>
	);
};
 */