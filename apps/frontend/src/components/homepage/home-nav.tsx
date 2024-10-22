'use client';

import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Fragment, type ReactNode } from 'react';

import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink, navigationMenuTriggerStyle } from '../ui/navigation-menu';
import { Button, Sheet, SheetContent, SheetTrigger } from '@/components/ui';

import { getNavLinks } from '@/utils/util';
import { NavTranslations } from '@/types/types';

import { RiSlashCommands2 } from "react-icons/ri";
import { FaQuestion } from "react-icons/fa6";
import { SiReadthedocs } from "react-icons/si";
import { FaSignInAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { RxHamburgerMenu } from 'react-icons/rx';
import { LuLoader2, LuHome } from 'react-icons/lu';

type NavItems = {
	component: ReactNode;
}[];

export default function Navbar() {
	const translations = getNavLinks();

	const router = useRouter();
	const { data: session, status } = useSession();

	const navItems: NavItems = [
		{
			component: (
				<NavigationMenuItem>
					<Link href="/" legacyBehavior passHref>
						<NavigationMenuLink  key='nav_home' className={navigationMenuTriggerStyle()}>
							{translations.nav_home}
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
			),
		},
		{
			component: (
				<NavigationMenuItem>
					<Link href="/commands" legacyBehavior passHref>
						<NavigationMenuLink key='nav_commands' className={navigationMenuTriggerStyle()}>
							{translations.nav_commands}
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
			),
		},
		{
			component: (
				<NavigationMenuItem>
					<Link href="/faq" legacyBehavior passHref>
						<NavigationMenuLink key='nav_faq' className={navigationMenuTriggerStyle()}>
							{translations.nav_faq}
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
			),
		},
		{
			component: (
				<NavigationMenuItem>
					<Link href="https://PLACEHOLDER.vercel.app" legacyBehavior passHref>
						<NavigationMenuLink key='nav_docs' className={navigationMenuTriggerStyle()}>
							{translations.nav_docs}
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
			),
		},
	];

	return (
		<Fragment>
			<NavigationMenu className='font-sans flex max-w-6xl justify-between items-center text-white top-0 backdrop-blur-md z-50 border p-5 sticky rounded-2xl mt-2 mx-auto'>
				<NavigationMenuList key='logo_nav'>
					<NavigationMenuItem>
						<h1 className='leading-4 text-xl mr-5'>Evelyn</h1>
					</NavigationMenuItem>
  				</NavigationMenuList>
				<NavigationMenuList className='list-none sm:flex hidden flex-1 justify-center' key='nav_buttons'>
					{navItems.map((item) => item.component)}
				</NavigationMenuList>
				<NavigationMenuList className='list-none' key='nav_dash_button'>
					{status === 'loading' ? <LuLoader2 className='animate-spin sm:flex hidden' /> : <Button
						onClick={async () => {
							if (!session) return await signIn('discord');
							else return router.replace('/home');
						}}
						className='font-sans bg-black/40 sm:flex hidden'
						variant='ghost'
					>
						{status === 'unauthenticated' ? translations.login_btn : translations.nav_dash_btn }
					</Button>}

					<NavigationMenuItem className='sm:hidden inline-flex' key='nav_mobile'>
						<MobileNavbar translations={translations} status={status} />
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</Fragment>
	);
}

function MobileNavbar({ translations, status }: { translations: NavTranslations, status: 'authenticated' | 'unauthenticated' | 'loading' }) {
	return (
		<Sheet>
			<SheetTrigger>
				<RxHamburgerMenu className='w-[20px] h-[20px]' />
			</SheetTrigger>
			<SheetContent className='font-sans bg-black text-white p-6 flex flex-col' side='right'>
				<Link href='/home' legacyBehavior key='nav_home_mobile'>
					<a className='flex items-center hover:bg-white hover:text-black p-2 rounded-xl'>
						<LuHome className='inline-flex mr-1.5 items-start' /> {translations.nav_home}
					</a>
				</Link>
				
				<Link href='/commands' legacyBehavior key='nav_commands_mobile'>
					<a className='flex items-center hover:bg-white hover:text-black p-2 rounded-xl'>
						<RiSlashCommands2 className='inline-flex mr-1.5 items-start' /> {translations.nav_commands}
					</a>
				</Link>

				<Link href='/faq' legacyBehavior key='nav_faq_mobile'>
					<a className='flex items-center hover:bg-white hover:text-black p-2 rounded-xl'>
						<FaQuestion className='inline-flex mr-1.5 items-start' /> {translations.nav_faq}
					</a>
				</Link>

				<Link href='https://evelyndocs.vercel.app' legacyBehavior key='nav_docs_mobile'>
					<a className='flex items-center hover:bg-white hover:text-black p-2 rounded-xl'>
						<SiReadthedocs className='inline-flex mr-1.5 items-start' /> {translations.nav_docs}
					</a>
				</Link>

				<Link href={status === 'unauthenticated' ? '/auth/signin' : '/guilds' } legacyBehavior key='nav_login_mobile'>
					{status === 'unauthenticated' ? (
						<a className='flex items-center hover:bg-white hover:text-black p-2 rounded-xl'>
							<FaSignInAlt className='inline-flex mr-1.5 items-start' /> {translations.login_btn}
						</a>
					) : (
						<a className='flex items-center hover:bg-white hover:text-black p-2 rounded-xl'>
							<MdDashboard className='inline-flex mr-1.5 items-start' /> {translations.nav_dash_btn}
						</a>
					) }
				</Link>
			</SheetContent>
		</Sheet>
	);
}
