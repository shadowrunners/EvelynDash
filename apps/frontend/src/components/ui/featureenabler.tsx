import { Frown } from 'lucide-react';
import { Button } from './button';

export function FeatureEnabler() {
	// TODO: Enable.
	return (
		<div className='bg-secondary min-h-full text-white text-center'>
			<div className='flex justify-center items-center flex-col h-screen'>
				<Frown />
				<h1>This feature isn't enabled.</h1>
				<p>If you want to enable this feature, click the button below, otherwise choose another feature.</p>
				<Button>Enable</Button>
			</div>
		</div>
	);
}