'use client';

import { Popover, PopoverTrigger, PopoverContent, Input, Form, FormField } from '@/components/ui';
import { HexColorPicker } from 'react-colorful';
import { FormParams } from '@/types';

export function SmallColorPickerForm({
	form,
	formName,
}: FormParams) {
	return (
		<Form {...form}>
			<FormField
				name={formName}
				render={({ field }) => (
					<Popover>
						<div className='flex flex-col width-[100%] relative shadow text-white'>
							<PopoverTrigger>
								<Input
									className='text-white'
									autoComplete="off"
									placeholder={field.value ?? 'Select a color'}
									{...field}
								/>
							</PopoverTrigger>

							<PopoverContent className='bg-secondary'>
								<HexColorPicker {...field} />
							</PopoverContent>
						</div>
					</Popover>
				)}
			/>
		</Form>
	);
}