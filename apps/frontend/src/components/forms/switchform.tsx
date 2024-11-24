'use client';

import type { FormParams } from '@Types';
import {
	Form,
	FormControl,
	FormDescription,
	FormMessage,
	FormField,
	FormItem,
	FormLabel,
	Switch,
} from '@UI';

export function SwitchForm({
	form,
	formName,
	formLabel,
	formDescription,
}: FormParams) {
	return (
		<Form {...form}>
			<form className='bg-muted/40 width-[50%] relative border-r-3xl space-y-6 p-4 shadow rounded-xl'>
					<FormField
						control={form.control}
						name={formName}
						render={({ field }) => (
							<FormItem className='text-white'>
								<FormLabel>
									{formLabel}
								</FormLabel>
								<FormControl>
									<Switch
										checked={field.value}
										onCheckedChange={field.onChange}
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