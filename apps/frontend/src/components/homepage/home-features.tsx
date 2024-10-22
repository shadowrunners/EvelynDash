'use client';

import { HiShieldCheck } from 'react-icons/hi';
import { BsSendFill } from 'react-icons/bs';
import { FaMusic } from 'react-icons/fa';
import Link from 'next/link';

import { CardSpotlight } from '../ui/cardspotlight';
import { FaTicket } from 'react-icons/fa6';

// TODO: Add actual images that show what that specific feature does.
// Also add more bullet points.

// TODO: Add underlining.

export default function Features() {
	return (
		<section>
			<div
				className='w-full justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1] font-sans'
			>
				<h2 className='text-center font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full'>Features</h2>
				<p className='font-normal text-dimWhite text-[18px] leading-[30.8px] text-center mt-5'>
					Supercharge your Discord experience to a new level with Evelyn's
					powerful toolkit, packed with an array of exciting features!
				</p>
			</div>

			<div className='font-sans grid gap-3 lg:grid-cols-3 md:flex-row px-auto py-3 rounded-[20px] md:mr-5 text-white'>
				<div className="px-10 py-12 rounded-[20px] md:mr-5 my-5">
					<CardSpotlight>
						<div className="text-xl font-bold relative z-20 mt-2 text-white flex-row flex items-center">
							<span className='w-[64px] h-[64px] rounded-full flex justify-center items-center bg-dimBlue'>
								<FaMusic className='w-6 h-6' />
							</span>
    						<p className='ml-3'>Music</p>
  						</div>
  						<p className="text-neutral-200 mt-4 relative z-20">
							With the music module powered by our custom in-house package,
							you can make your gaming sessions inside voice channels even more enjoyable.
							You can play music from numerous platforms* such as Deezer, Spotify and more!
  						</p>
  						<p className="text-neutral-300 mt-4 relative z-20 text-sm">
    						(*) Evelyn does not support YouTube or its music related derivative, YouTube Music.
  						</p>
					</CardSpotlight>
				</div>
	
				<div className="px-10 py-12 rounded-[20px] md:mr-5 my-5">
					<CardSpotlight>
						<div className="text-xl font-bold relative z-20 mt-2 text-white flex-row flex items-center">
							<span className='w-[64px] h-[64px] rounded-full flex justify-center items-center bg-dimBlue'>
								<HiShieldCheck className='w-8 h-8' />
							</span>
    						<p className='ml-3'>Moderation</p>
  						</div>
  						<div className="text-neutral-200 mt-4 relative z-20">
						  	Keep your server safe with our simple, yet powerful suite of moderation tools ranging from basic moderation tools
							such as /ban and /kick to AutoModeration, automatic phishing link detection and moderation logs.
  						</div>
  						<p className="text-neutral-300 mt-4 relative z-20 text-sm">
    						AutoMod powered by Discord w/ some additional custom filters provided by us. Anti-Phishing powered by the <Link href='https://anti-fish.bitflow.dev/'>Anti-Fish API</Link>.
  						</p>
					</CardSpotlight>
				</div>
	
				<div className="px-10 py-12 rounded-[20px] md:mr-5 my-5">
					<CardSpotlight>
						<div className="text-xl font-bold relative z-20 mt-2 text-white flex-row flex items-center">
							<span className='w-[64px] h-[64px] rounded-full flex justify-center items-center bg-dimBlue'>
								<BsSendFill className="w-8 h-8" />
							</span>
    						<p className='ml-3'>Welcomer / Farewell</p>
  						</div>
  						<div className="text-neutral-200 mt-4 relative z-20">
						  Say hello and farewell in style with Evelyn's customizable
						  welcome and goodbye system, featuring fully customizable embeds and messages.
						  This system also features custom embed variables.
  						</div>
  						<p className="text-neutral-300 mt-4 relative z-20 text-sm">
    						Embed customization is offered in the dashboard.
							Info on custom embed variables is offered in our documentation.
  						</p>
					</CardSpotlight>
				</div>
			</div>

			<div className='font-sans grid gap-3 lg:grid-cols-3 md:flex-row px-auto py-3 rounded-[20px] md:mr-5 text-white'>
				<div className="px-10 py-12 rounded-[20px] md:mr-5 my-5">
					<CardSpotlight>
						<div className="text-xl font-bold relative z-20 mt-2 text-white flex-row flex items-center">
							<span className='w-[64px] h-[64px] rounded-full flex justify-center items-center bg-dimBlue'>
								<FaTicket className='w-6 h-6' />
							</span>
    						<p className='ml-3'>Tickets</p>
  						</div>
  						<p className="text-neutral-200 mt-4 relative z-20">
							Tickets Description
  						</p>
  						<p className="text-neutral-300 mt-4 relative z-20 text-sm">
    						(*) Evelyn does not support YouTube or its music related derivative, YouTube Music.
  						</p>
					</CardSpotlight>
				</div>
	
				<div className="px-10 py-12 rounded-[20px] md:mr-5 my-5">
					<CardSpotlight>
						<div className="text-xl font-bold relative z-20 mt-2 text-white flex-row flex items-center">
							<span className='w-[64px] h-[64px] rounded-full flex justify-center items-center bg-dimBlue'>
								<HiShieldCheck className='w-8 h-8' />
							</span>
    						<p className='ml-3'>Anime, Manga, Movies & TV Shows</p>
  						</div>
  						<div className="text-neutral-200 mt-4 relative z-20">
						  	Get information regarding your favorite anime, manga, movie or TV show directly inside Discord.
  						</div>
  						<p className="text-neutral-300 mt-4 relative z-20 text-sm">
    						Anime & Manga information provided by <Link href='https://kitsu.io'>Kitsu</Link>. TV & movie information provided by <Link href='https://themoviedb.org/'>TheMovieDatabase</Link>.
  						</p>
					</CardSpotlight>
				</div>
	
				<div className="px-10 py-12 rounded-[20px] md:mr-5 my-5">
					<CardSpotlight>
						<div className="text-xl font-bold relative z-20 mt-2 text-white flex-row flex items-center">
							<span className='w-[64px] h-[64px] rounded-full flex justify-center items-center bg-dimBlue'>
								<BsSendFill className="w-8 h-8" />
							</span>
    						<p className='ml-3'>Playlists</p>
  						</div>
  						<div className="text-neutral-200 mt-4 relative z-20">
							Playlists Description
  						</div>
  						<p className="text-neutral-300 mt-4 relative z-20 text-sm">
    						Embed customization is offered in the dashboard.
							Info on custom embed variables is offered in our documentation.
  						</p>
					</CardSpotlight>
				</div>
			</div>

			<div className='font-sans grid gap-3 lg:grid-cols-3 md:flex-row px-auto py-3 rounded-[20px] md:mr-5 text-white'>
				<div className="px-10 py-12 rounded-[20px] md:mr-5 my-5">
					<CardSpotlight>
						<div className="text-xl font-bold relative z-20 mt-2 text-white flex-row flex items-center">
							<span className='w-[64px] h-[64px] rounded-full flex justify-center items-center bg-dimBlue'>
								<FaMusic className='w-6 h-6' />
							</span>
    						<p className='ml-3'>Image Manipulation</p>
  						</div>
  						<p className="text-neutral-200 mt-4 relative z-20">
							Image manipulation
  						</p>
  						<p className="text-neutral-300 mt-4 relative z-20 text-sm">
    						(*) Evelyn does not support YouTube or its music related derivative, YouTube Music.
  						</p>
					</CardSpotlight>
				</div>
	
				<div className="px-10 py-12 rounded-[20px] md:mr-5 my-5">
					<CardSpotlight>
						<div className="text-xl font-bold relative z-20 mt-2 text-white flex-row flex items-center">
							<span className='w-[64px] h-[64px] rounded-full flex justify-center items-center bg-dimBlue'>
								<HiShieldCheck className='w-8 h-8' />
							</span>
    						<p className='ml-3'>AFK</p>
  						</div>
  						<div className="text-neutral-200 mt-4 relative z-20">
						  	AFK information
  						</div>
  						<p className="text-neutral-300 mt-4 relative z-20 text-sm">
    						AutoMod powered by Discord w/ some additional custom filters provided by us. Anti-Phishing powered by the <Link href='https://anti-fish.bitflow.dev/'>Anti-Fish API</Link>.
  						</p>
					</CardSpotlight>
				</div>
	
				<div className="px-10 py-12 rounded-[20px] md:mr-5 my-5">
					<CardSpotlight>
						<div className="text-xl font-bold relative z-20 mt-2 text-white flex-row flex items-center">
							<span className='w-[64px] h-[64px] rounded-full flex justify-center items-center bg-dimBlue'>
								<BsSendFill className="w-8 h-8" />
							</span>
    						<p className='ml-3'>Roleplay</p>
  						</div>
  						<div className="text-neutral-200 mt-4 relative z-20">
						  Roleplay via actions.
  						</div>
  						<p className="text-neutral-300 mt-4 relative z-20 text-sm">
    						Embed customization is offered in the dashboard.
							Info on custom embed variables is offered in our documentation.
  						</p>
					</CardSpotlight>
				</div>
			</div>
		</section>
	);
};