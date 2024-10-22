'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
	const translation = useTranslations('main');
	const footerLinks = [
		{
			name: translation('footer_link1'),
			href: "/privacy",
			key: "footer_link1"
		},
		{
			name: translation('footer_link2'),
			href: "/tos",
			key: "footer_link2"
		},
		{
			name: 'Support Server',
			href: "/git",
			key: "footer_link3"
		}
	];

	// TODO: Implement hover animation for links.

	return (
		<div className='flex justify-center items-center sm:py-16 py-6 flex-col'>
			<div className='flex justify-center items-start md:flex-row flex-col mb-8 w-full'>
				<div className="flex-1 flex flex-col justify-start mr-10">
					<h3 className={`font-sans text-white w-auto h-auto text-3xl`}>Evelyn</h3>
				</div>

				<div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
					<div className="flex flex-col ss:my-0 my-4 min-w-[150px]">
						<h4 className='font-mono font-medium text-[18px] leading-[27px] text-white'>
							{translation('footer_links')}
						</h4>
						<ul className="list-none mt-4 flex flex-col">
							{footerLinks.map((item) => (
								<Link key={item.key} href={item.href} className="font-mono font-normal text-[16px] leading-[24px] text-white/50 hover:text-white mb-2 cursor-pointer">
									{item.name}
								</Link>
							))}
						</ul>
					</div>
				</div>
			</div>

			<div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
				<p className="font-mono font-normal text-center text-[18px] leading-[27px] text-white ">
					From us to you, built with ❤️ by <a href='https://github.com/notscrappie'>scrappie</a> @ spearhead. © 2024, all rights reserved.
				</p>
			</div>
		</div>
	);
};
