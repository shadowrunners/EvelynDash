import { FeatureProvider } from '@/components/contexts/featurecontext';
import { ReactNode } from 'react';

export default function FeatureLayout({ children }: { children: ReactNode }) {
	return (
		<FeatureProvider>
			<div className="p-1 font-sans text-white" suppressHydrationWarning>
				{children}
			</div>
		</FeatureProvider>
	);
}