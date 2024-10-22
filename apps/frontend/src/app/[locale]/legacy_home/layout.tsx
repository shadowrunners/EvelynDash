'use client';

import { LoadingPanel, QueryStatus } from '@/components/panels';
import { useSelfUserQuery } from '@/hooks/hooks';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { Profile } from '@UI';

export default function HomeLayout({ children }: { children: ReactNode }) {
	const query = useSelfUserQuery();

	return (
		<div className='p-2.5 h-full flex flex-row bg-primary'>
			<QueryStatus query={query} loading={<LoadingPanel />} error="Couldn't fetch the necessary data about the user.">
				<div className='flex relative flex-col h-[100%] overflow-auto w-full max-w-[100%] max-h-[100%]'>
					<div className='top-0 mx-auto max-w-[1200px] w-full sm:pt-[16px] sm:px-[30px] pt-4 px-7'>
						<nav className='font-semibold flex items-center bg-secondary px-[24px] rounded-[10px]'>
							<Image
								width={500}
								height={200}
								src="https://i.imgur.com/huHAHjm.png"
								alt="evelyn"
								className="w-[128px] h-[128px] object-contain"
							/>
							<h1 className='font-poppins font-semibold text-white text-right ml-auto'>Server Selection</h1>
							<Profile className='ml-3 cursor-pointer' />
						</nav>
					</div>
					<div className='mx-auto w-full max-w-[1200px] flex-1 my-0 px-[24px] sm:px-[30px]'>
						{children}
					</div>
					<div className='flex absolute bottom-0 right-0 font-poppins opacity-50 text-dimWhite text-[15px]'>Currently running Nightflyer UI v1.0 beta 3.</div>
				</div>
			</QueryStatus>
		</div>
	);
}
