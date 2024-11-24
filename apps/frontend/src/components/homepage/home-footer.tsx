'use client';

import { Link as LocalizedLink } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export function Footer() {
	const t = useTranslations('home');
	const legalLinks = [
		{
			name: t('footer.legal.privacy'),
			href: "/privacy",
			key: "footer_link1"
		},
		{
			name: t('footer.legal.tos'),
			href: "/tos",
			key: "footer_link2"
		},
	];

	const supportLinks = [
		{
			name: t('footer.support.server'),
			href: "placeholder",
			key: "footer_support_server",
		},
	];

	const normalLinks = [
		{
			name: t('footer.links.github'),
			href: "https://github.com/spearheadlabs/Evelyn",
			key: "footer_links_github",
		},
		{
			name: t('footer.links.documentation'),
			href: 'PLACEHOLDER',
			key: "footer_links_documentation",
		},
		{
			name: t('footer.links.donations'),
			href: "https://buymeacoffee.com/scr3ppie",
			key: "footer_links_donations",
		},
	];

	return (
		<div className='flex justify-center items-center sm:py-16 py-6 flex-col'>
			<div className='flex justify-center items-start md:flex-row flex-col mb-8 w-full'>
				<div className="flex-1 flex flex-col justify-start mr-10">
					<h3 className='font-sans text-white w-auto h-auto text-3xl'>Evelyn</h3>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-white w-full flex-row justify-between'>
					<div className='flex flex-col mx-auto'>
						<h4 className='font-sans font-medium text-[18px] leading-[27px]'>
							{t('footer.legal.name')}
						</h4>
						<ul className="list-none mt-4 flex flex-col gap-1">
							{legalLinks.map((item) => (
								<LocalizedLink href={item.href} key={item.key} className='text-dimWhite transition duration-300 font-sans font-normal text-[16px] leading-[24px] hover:text-white cursor-pointer'>
									{item.name}
								</LocalizedLink>
							))}
						</ul>
					</div>
					<div className='flex flex-col mx-auto'>
						<h4 className='font-sans font-medium text-[18px] leading-[27px]'>
							{t('footer.support.name')}
						</h4>
						<ul className="list-none mt-4 flex flex-col gap-1">
							{supportLinks.map((item) => (
								<Link href={item.href} key={item.key} className='text-dimWhite transition duration-300 font-sans font-normal text-[16px] leading-[24px] hover:text-white cursor-pointer'>
									{item.name}
								</Link>
							))}
						</ul>
					</div>	
					<div className='flex flex-col mx-auto'>
						<h4 className='font-sans font-medium text-[18px] leading-[27px]'>
							{t('footer.links.name')}
						</h4>
						<ul className="list-none mt-4 flex flex-col gap-1">
							{normalLinks.map((item) => (
								<Link href={item.href} key={item.key} className='text-dimWhite transition duration-300 font-sans font-normal text-[16px] leading-[24px] hover:text-white cursor-pointer'>
									{item.name}
								</Link>
							))}
						</ul>
					</div>
				</div>
			</div>

			<div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
				<p className="font-mono font-normal text-center text-[18px] leading-[27px] text-white ">
					From us to you, built with ❤️ by <a href='https://github.com/notscrappie'>scrappie</a> @ spearhead. © {new Date().getFullYear()}, all rights reserved.
				</p>
			</div>
		</div>
	);
};