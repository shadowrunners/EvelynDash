import { ReactNode } from 'react';
import { Navbar, Footer } from '@/components/homepage';

export default function GuildLayout({ children }: { children: ReactNode }) {
	return (
		<div className='bg-black w-full overflow-hidden font-sans'>
			<div className='sm:px-16 px-6 flex justify-center items-center'>
				<div className='xl:max-w-[1920px] w-full'>
					<Navbar />
				</div>
			</div>
			<div className='flex justify-center items-start text-white'>
				<div className='xl:max-w-[1280px] w-full'>
					{children}
				</div>
			</div>
			<div className='bg-black sm:px-16 px-6 flex justify-center items-start'>
				<div className='xl:max-w-[1280px] w-full'>
					<Footer />
				</div>
			</div>
		</div>
	);
}