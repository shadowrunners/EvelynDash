'use client';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Textarea } from '@UI';
import type { FormParams } from '@Types';

export function TextForm({
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
						<FormItem>
							<FormLabel>
								{formLabel}
							</FormLabel>
							<FormControl>
								<Textarea
									placeholder='Write a cool message here! ✨'
									className='resize-none'
									{...field}
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