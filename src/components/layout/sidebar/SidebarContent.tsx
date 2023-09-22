'use client';

import { Avatar, AvatarFallback, AvatarImage, Button, Card, CardContent, Spacer } from '@/components/ui';
import { useActiveSidebarItem, SidebarItemInfo } from '@/utils/router';
import { IoMdLogOut } from 'react-icons/io';
import { GuildItem, GuildItemsSkeleton } from './GuildItem';
import { useGuilds, useSelfUserQuery } from '@/api/hooks';
import { useMemo, useState } from 'react';
import { SidebarItem } from './SidebarItem';
import type { Guild } from '@/types/types';
import items from '@/config/sidebar-items';
import { avatarUrl } from '@/api/discord';
import { signOut } from 'next-auth/react';
import { config } from '@/config/common';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export function SidebarContent() {
	const guilds = useGuilds();
	const [filter] = useState('');
	const selectedGroup = usePathname().replace('/dash/guilds/', '');

	const filterGuilds = (guildsData: Guild[] | undefined) => {
		return guildsData?.filter((guild) => {
			const contains = guild.name.toLowerCase().includes(filter.toLowerCase());
			return config.guild.filter(guild) && contains;
		});
	};

	const filteredGuilds = useMemo(() => filterGuilds(guilds?.data), [guilds?.data, filter]);

	return (
		<div>
			<div className='flex items-center flex-col gap-2 py-2 m-3 rounded-xl p-10 pt-8 pb-8'>
				<Image alt='logo' src='https://i.imgur.com/pahJQQm.png' width={200} height={200} />
			</div>

			<div className='flex flex-col mb-auto text-white'>
				<Items />

				<div className='flex flex-col px-[10px] gap-3'>
					{filteredGuilds === null ? (
						<GuildItemsSkeleton />
					) : (
						filteredGuilds?.map((guild) => (
							<GuildItem
								key={guild.id}
								guild={guild}
								active={selectedGroup === guild.id}
								href={`/dash/guilds/${guild.id}`}
							/>
						))
					)}
				</div>
			</div>
		</div>
	);
}

export function BottomCard() {
	const user = useSelfUserQuery().data;
	if (user == null) return <></>;

	return (
		<Card className='sticky mr-0 mb-0 ml-0 flex flex-col bg-transparent'>
			<CardContent className='flex'>
				<Avatar className='mr-3'>
					<AvatarImage src={avatarUrl(user)} alt='pfp' />
					<AvatarFallback>{user?.username}</AvatarFallback>
				</Avatar>
				<h3 className='font-semibold text-white mt-1'>{user?.username}</h3>

				<Spacer />

				<Button className='text-white hover:text-black' variant='outline' size='icon' onClick={() => signOut()}>
					<IoMdLogOut />
				</Button>
			</CardContent>
		</Card>
	);
}

function Items() {
	const active = useActiveSidebarItem();
	const filteredItems = useMemo(() => items.filter((item) => !item.hidden), []);

	return (
		<div className='flex flex-col px-3 gap-0 mb-3'>
			{filteredItems
				.map((route: SidebarItemInfo, index: number) => (
					<SidebarItem
						key={index}
						href={route.path}
						name={route.name}
						icon={route.icon}
						active={active === route}
					/>
				))}
		</div>
	);
}