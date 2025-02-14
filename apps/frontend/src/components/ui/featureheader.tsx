'use client';

import { useDisableFeature } from '@/hooks';
import { Button } from './button';
import { usePathname } from '@/i18n/routing';

export default function FeatureHeader({ name, description }: { name: string; description: string; }) {
	const disable = useDisableFeature();
	const featureName = usePathname().split('/')[6];
	const handleDisable = () => {
		disable.mutate({ feature: featureName });
	};

	return (
		<header className="bg-primary p-4 rounded-xl mt-2">
			<div className='flex items-center'>
				<div>
					<h1 className="text-xl font-semibold">{name}</h1>
					<p className="text-dimWhite">{description}</p>
				</div>
				<Button
					className="bg-secondary hover:text-black hover:bg-white ml-auto"
					onClick={handleDisable}
				>
					Disable
				</Button>
			</div>
		</header>
	);
}