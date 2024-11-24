import { Navbar, Footer } from '@components/homepage';
import type { ReactNode } from 'react';

export default function PrivacyLayout({ children }: { children: ReactNode }) {
	return (
		<div className='bg-black w-full overflow-hidden text-white'>
			<div className='sm:px-16 px-6 flex justify-center items-center'>
				<div className='xl:max-w-[1920px] w-full'>
					<Navbar />
				</div>
			</div>
			<div className='flex justify-center items-start'>
				<div className='xl:max-w-[1280px] w-full'>
					{children}
				</div>
			</div>
			<div className='sm:px-16 px-6 flex justify-center items-start'>
				<div className='xl:max-w-[1280px] w-full'>
					<Footer />
				</div>
			</div>
		</div>
	);
}
