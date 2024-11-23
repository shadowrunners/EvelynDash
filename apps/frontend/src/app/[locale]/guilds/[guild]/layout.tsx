'use client';

import type { ReactNode } from 'react';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from "@/components/ui/app-sidebar";
import { DynamicBreadcrumb } from '@/components/ui/dynamic-breadcrumb';
import { GuildProvider } from '@/components/contexts/guildcontext';
import { Separator } from '@/components/ui';

export default function GuildLayout({ children }: { children: ReactNode }) {
	return (
		<GuildProvider>
			<div className='flex flex-row h-full text-sans text-white'>
				<SidebarProvider>
					<AppSidebar />
					<SidebarInset className='bg-[#09090B]'>
					<div className='p-5 flex-1 flex flex-col'>
						<div className='flex items-center'>
							<SidebarTrigger className='mr-2' />
							<Separator className='bg-dimWhite mr-4 h-[20px]' orientation='vertical' />
							<DynamicBreadcrumb />
						</div>
						{children}
					</div>
					</SidebarInset>
				</SidebarProvider>
			</div>
		</GuildProvider>
	);
}
