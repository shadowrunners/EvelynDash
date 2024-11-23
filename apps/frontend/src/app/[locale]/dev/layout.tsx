import type { ReactNode } from 'react';

export default function DevLayout({ children }: { children: ReactNode }) {
	return (
        <body className='test-background'>{children}</body>
	);
}