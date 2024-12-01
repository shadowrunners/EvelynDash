'use client';

import { Card, CardContent, CardFooter, Button } from '@/components/ui';
import { useTranslations } from 'next-intl';
import { getFeatures } from '@/utils';
import { useGuild } from '@/components/contexts/guildcontext';
import { Link } from '@/i18n/routing';

export default function GuildPage() {
	const guild = useGuild();
	const features = getFeatures();
	const t = useTranslations();

	return (
		<div className="">
			<h1 className='text-xl font-semibold'>Welcome back, what would you like to customize?</h1>

			<div className='mt-5 text-white'>
				<section className='flex flex-row text-xl'>
					<h1>You are currently customizing</h1><h1 className="font-bold ml-1">{guild?.data.name}</h1>
				</section>
				<section className='bg-white p-3 rounded-xl text-black'>
					<h1 className='font-bold font-sans text-xl mt-2'>Server Information</h1>
					<p>
						Members: {guild?.data.approximate_member_count}
					</p>
					<p>
						Channels:
					</p>
					<p>
						Placeholder so it ain't empty
					</p>
				</section>
			</div>
			<div className='flex flex-col gap-5 mt-5'>
				<h1 className='font-semibold text-[23px] font-sans'>Features</h1>
				<section className='flex-row grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-3 gap-3'>
					{features.map((feature) => (
						<Card className='bg-primary text-white font-sans' key={feature.name}>
							<CardContent className='flex flex-gap gap-3 mt-5'>
								<div className='flex rounded-xl w-[50px] h-[50px] text-3xl bg-black border justify-center items-center'>
									<feature.icon className='text-white' />
								</div>
								<div className="flex-1">
									<p className="font-semibold text-base md:text-lg">
										{feature.name}
									</p>
									<p className="text-sm md:text-md text-muted-foreground">
										{feature.description}
									</p>
								</div>
							</CardContent>
							<CardFooter>
								<Link href={`/guilds/${guild?.data.id}${feature.href}`}>
									<Button
										variant='default'
										className='rounded-2xl text-white font-sans font-semibold bg-black hover:bg-white hover:text-black'
									>
										Manage
									</Button>
								</Link>
							</CardFooter>
						</Card>
					))}
				</section>
			</div>
		</div>
	);
}