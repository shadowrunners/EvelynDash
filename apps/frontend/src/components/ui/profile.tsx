'use client';

import { Avatar, AvatarImage, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from '@UI';
import { getAvatarUrl } from '@/utils/API/fetch';
import { useSelfUserQuery } from '@/utils/API/hooks';
import { FaSignOutAlt, FaList } from 'react-icons/fa';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// TODO: Add placeholder.
export function Profile({ className }: { className?: string }) {
	const router = useRouter();
	const { data } = useSelfUserQuery();
	const avatar = getAvatarUrl(data);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar className={className}>
					<AvatarImage src={avatar} />
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="bg-secondary text-white font-poppins border">
				<DropdownMenuLabel>{data?.username}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="hover:bg-white hover:text-black" onClick={() => router.replace('/home')}>
					<FaList className="mr-2" /> Servers
				</DropdownMenuItem>
				<DropdownMenuItem className="hover:bg-white hover:text-black" onClick={() => signOut()}>
					<FaSignOutAlt className="mr-2" /> Sign Out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
