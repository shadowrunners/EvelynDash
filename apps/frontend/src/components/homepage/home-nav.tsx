import { Link as LocalizedLink } from '@/i18n/routing';
import { Fragment, use } from 'react';
import Link from 'next/link';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession, Session } from 'next-auth';

import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink, navigationMenuTriggerStyle } from '../ui/navigation-menu';
import { Menu, Home, Slash, Book, CircleHelp, LogIn, LayoutDashboard, Loader2 } from 'lucide-react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import { useTranslations } from 'next-intl';
import { Button } from '@UI';

const navItems = [
	{ key: 'nav.home', href: '/', label: 'nav.home', icon: <Home className='mr-1.5' /> },
	{ key: 'nav.commands', href: '/commands', label: 'nav.commands', icon: <Slash className='mr-1.5' /> },
	{ key: 'nav.faq', href: '/faq', label: 'nav.faq', icon: <CircleHelp className='mr-1.5' /> },
	{ key: 'nav.documentation', href: 'https://evelyndocs.vercel.app', label: 'nav.documentation', icon: <Book className='mr-1.5' />, isExternal: true },
];

export function Navbar() {
	const t = useTranslations('home');
	const session = use(getServerSession(authOptions));

	return (
		<NavigationMenu className='font-sans flex max-w-6xl justify-between items-center text-white top-0 backdrop-blur-md z-50 border p-5 sticky rounded-2xl mt-2 mx-auto'>
			<NavigationMenuList key='logo_nav'>
				<NavigationMenuItem>
					<h1 className='leading-4 text-xl mr-5'>Evelyn</h1>
				</NavigationMenuItem>
  			</NavigationMenuList>
			<NavigationMenuList className='list-none sm:flex hidden flex-1 justify-center' key='nav_buttons'>
				{navItems.map((item) => (
					(
						<NavigationMenuItem key={item.key}>
							{item.isExternal
								? (
									<Link href={item.href} legacyBehavior passHref>
										<NavigationMenuLink className={navigationMenuTriggerStyle()}>
											{t(item.key)}
										</NavigationMenuLink>
									</Link>
								)
								: (
									<LocalizedLink href={item.href} legacyBehavior passHref>
										<NavigationMenuLink className={navigationMenuTriggerStyle()}>
											{t(item.key)}
										</NavigationMenuLink>
									</LocalizedLink>
								)
							}
						</NavigationMenuItem>
					)
				))}
			</NavigationMenuList>
			<NavigationMenuList className='list-none' key='nav_dash_button'>
				<NavigationMenuItem>
					{session
						? <LocalizedLink href={session ? '/pickaguild' : '/auth/signin'} legacyBehavior passHref>
							<NavigationMenuLink className={`${navigationMenuTriggerStyle()} sm:flex hidden`}>
								{session ? t('nav.btn_signedin') : t('nav.btn_notsignedin')}
							</NavigationMenuLink>
						</LocalizedLink>
						: <Loader2 className='animate-spin sm:flex hidden' />
					}
				</NavigationMenuItem>
				<NavigationMenuItem className='sm:hidden inline-flex' key='nav_mobile'>
					<MobileNavbar t={t} session={session} />
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

function MobileNavbar({ t, session }: { t: (key: string) => string, session: Session | null }) {
	// hey snoopy, yes there is a header here that you'll never see because this component extends Dialog that shit is required
	// do not remove it unless you want to deal with a "DialogTitle isn't present" error.

	return (
		<Drawer>
			<DrawerTrigger>
				<Menu className='w-[20px] h-[20px]' />
			</DrawerTrigger>
			<DrawerContent className='bg-black text-white p-6 flex flex-col'>
				<DrawerHeader className='hidden'>
					<DrawerTitle>
						Theoretically you shouldn't be seeing this. However if you see this, this is here so this doesn't error out.
					</DrawerTitle>
				</DrawerHeader>
				{navItems.map((item) => (
					<Fragment key={item.key}>
						{item.isExternal
							? (
								<Link href={item.href} className='mb-1 flex items-center hover:bg-white hover:text-black p-2 rounded-xl'>
									{item.icon} {t(item.key)}
								</Link>
							)
							: (
								<LocalizedLink href={item.href} className='mb-1 flex items-center hover:bg-white hover:text-black p-2 rounded-xl'>
									{item.icon} {t(item.key)}
								</LocalizedLink>
							)
						}
					</Fragment>
				))}
				<LocalizedLink href={session ? '/auth/signin' : '/pickaguild'} className='mb-1 flex items-center hover:bg-white hover:text-black p-2 rounded-xl'>
					{session ? (
						<Fragment>
							<LogIn className='inline-flex mr-1.5 items-start' /> {t('nav.btn_notsignedin')}
						</Fragment>
					) : (
						<Fragment>
							<LayoutDashboard className='inline-flex mr-1.5 items-start' /> {t('nav.btn_signedin')}
						</Fragment>
					) }
				</LocalizedLink>
			</DrawerContent>
		</Drawer>
	);
}