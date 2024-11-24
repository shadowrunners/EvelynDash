'use client';

import { useRouter, Link as LocalizedLink } from '@/i18n/routing';
import { useSession } from 'next-auth/react';
import { type ReactNode } from 'react';
import Link from 'next/link';

import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink, navigationMenuTriggerStyle } from '../ui/navigation-menu';
import { Button, Sheet, SheetContent, SheetTrigger } from '@/components/ui';

import { RiSlashCommands2 } from "react-icons/ri";
import { FaQuestion } from "react-icons/fa6";
import { SiReadthedocs } from "react-icons/si";
import { FaSignInAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { RxHamburgerMenu } from 'react-icons/rx';
import { LuLoader2, LuHome } from 'react-icons/lu';
import { useTranslations } from 'next-intl';

type NavItems = {
	component: ReactNode;
}[];

export function Navbar() {
	const t = useTranslations("home");

	const router = useRouter();
	const { data: session, status } = useSession();

	const navItems: NavItems = [
		{
			component: (
				<NavigationMenuItem key='nav_home'>
					<LocalizedLink href="/" legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							{t("nav.home")}
						</NavigationMenuLink>
					</LocalizedLink>
				</NavigationMenuItem>
			),
		},
		{
			component: (
				<NavigationMenuItem key='nav_commands'>
					<LocalizedLink href="/commands" legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							{t("nav.commands")}
						</NavigationMenuLink>
					</LocalizedLink>
				</NavigationMenuItem>
			),
		},
		{
			component: (
				<NavigationMenuItem key='nav_faq'>
					<LocalizedLink href="/faq" legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							{t("nav.faq")}
						</NavigationMenuLink>
					</LocalizedLink>
				</NavigationMenuItem>
			),
		},
		{
			component: (
				<NavigationMenuItem key='nav_docs'>
					<Link href="https://PLACEHOLDER.vercel.app" legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							{t("nav.documentation")}
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
			),
		},
	];

	return (
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
						if (!session) return router.push('/auth/signin');
						else return router.push('/pickaguild');
					}}
					className='font-sans bg-black/40 sm:flex hidden'
					variant='ghost'
				>
					{status === 'unauthenticated' ? t("nav.btn_notsignedin") : t("nav.btn_signedin") }
				</Button>}

				<NavigationMenuItem className='sm:hidden inline-flex' key='nav_mobile'>
					<MobileNavbar translations={t} status={status} />
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

function MobileNavbar({ translations, status }: { translations: (key: string) => string, status: 'authenticated' | 'unauthenticated' | 'loading' }) {
	return (
		<Sheet>
			<SheetTrigger>
				<RxHamburgerMenu className='w-[20px] h-[20px]' />
			</SheetTrigger>
			<SheetContent className='font-sans bg-black text-white p-6 flex flex-col' side='right'>
				<LocalizedLink href='/home' legacyBehavior key='nav_home_mobile'>
					<a className='flex items-center hover:bg-white hover:text-black p-2 rounded-xl'>
						<LuHome className='inline-flex mr-1.5 items-start' /> {translations("nav.home")}
					</a>
				</LocalizedLink>
				
				<LocalizedLink href='/commands' legacyBehavior key='nav_commands_mobile'>
					<a className='flex items-center hover:bg-white hover:text-black p-2 rounded-xl'>
						<RiSlashCommands2 className='inline-flex mr-1.5 items-start' /> {translations("nav.commands")}
					</a>
				</LocalizedLink>

				<LocalizedLink href='/faq' legacyBehavior key='nav_faq_mobile'>
					<a className='flex items-center hover:bg-white hover:text-black p-2 rounded-xl'>
						<FaQuestion className='inline-flex mr-1.5 items-start' /> {translations("nav.faq")}
					</a>
				</LocalizedLink>

				<Link href='https://evelyndocs.vercel.app' legacyBehavior key='nav_docs_mobile'>
					<a className='flex items-center hover:bg-white hover:text-black p-2 rounded-xl'>
						<SiReadthedocs className='inline-flex mr-1.5 items-start' /> {translations("nav.documentation")}
					</a>
				</Link>

				<LocalizedLink href={status === 'unauthenticated' ? '/auth/signin' : '/pickaguild' } legacyBehavior key='nav_login_mobile'>
					{status === 'unauthenticated' ? (
						<a className='flex items-center hover:bg-white hover:text-black p-2 rounded-xl'>
							<FaSignInAlt className='inline-flex mr-1.5 items-start' /> {translations("nav.btn_notsignedin")}
						</a>
					) : (
						<a className='flex items-center hover:bg-white hover:text-black p-2 rounded-xl'>
							<MdDashboard className='inline-flex mr-1.5 items-start' /> {translations("nav.btn_signedin")}
						</a>
					) }
				</LocalizedLink>
			</SheetContent>
		</Sheet>
	);
}
