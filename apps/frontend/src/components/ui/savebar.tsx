import { UseFormReturn, useFormState } from 'react-hook-form';
import { Button } from './button';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Savebar({ form }: { form: UseFormReturn<any, any> }) {
	const state = useFormState(form);

	return (
		<div className={`${state.isDirty ? '' : 'hidden'} fixed bottom-2 md:bottom-10 bg-primary rounded-2xl justify-center md:p-[15px] shadow-normal items-center flex-col md:flex-row gap-1 md:gap-2 mt-auto max-w-[95%] w-fit mx-auto z-50`}>
			<div className="flex flex-row items-center">
				<h1 className="font-semibold text-md md:text-lg">Hold on, there are unsaved changes! Do you want to save them?</h1>
				<div className="justify-end ml-auto">
					<Button className="bg-secondary mr-2">
                        Save
					</Button>
					<Button className="bg-secondary">
                        Discard
					</Button>
				</div>
			</div>
		</div>
	);
}
