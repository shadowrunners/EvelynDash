'use client';

import { Avatar, AvatarImage, MobileSidebar, Sidebar, Profile } from '@UI';
import { LoadingPanel, QueryStatus } from '@/components/panels';
import { getGuildImg } from '@/hooks/fetch';
import { useGuildInfoQuery, useGuildId } from '@/hooks';
import type { ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { NewMobileSidebar, NewSidebar } from '@/components/ui/NewSidebar';

export default function GuildLayout({ children }: { children: ReactNode }) {
	const guild = useGuildId();
	const query = useGuildInfoQuery(guild);
	const icon = getGuildImg(query?.data?.id as string, query?.data?.icon as string);

	return (
		<div className='flex flex-row h-full bg-primary'>
			<NewSidebar key='sidebar' className='hidden' />

			<QueryStatus query={query} loading={<LoadingPanel />} error="Couldn't fetch the necessary data about the user.">
				<div className='p-2.5 flex h-full relative flex-col overflow-auto w-full max-w-[100%] max-h-[100%]'>
					<div className='top-0 mx-auto max-w-[1200px] w-full sm:pt-[16px] sm:px-[30px] pt-4 rounded-[10px] bg-secondary'>
						<nav className='font-semibold flex bg-secondary/20 top-0 sticky backdrop-blur-md items-center px-[24px] pb-5 rounded-[10px] '>
							<Avatar>
								<AvatarImage src={icon} />
							</Avatar>
							<h1 className='font-poppins font-semibold text-white ml-3'>{query?.data?.name}</h1>
							<h1 className='font-poppins font-semibold text-white text-right ml-auto'>Managing Settings</h1>
							<Profile className='ml-3 cursor-pointer' />
							<NewMobileSidebar />
							<Toaster />
						</nav>
					</div>
					<div className='mx-auto w-full max-w-[1200px] flex-1 my-0 px-[24px] sm:px-[30px]'>
						{children}
					</div>
				</div>
			</QueryStatus>
		</div>
	);
}
