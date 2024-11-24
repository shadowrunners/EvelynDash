'use client';

import { HiShieldCheck } from 'react-icons/hi';
import { BsSendFill } from 'react-icons/bs';
import { FaMusic } from 'react-icons/fa';
import { FaTicket } from 'react-icons/fa6';
import { EvelynCardFeature } from '@/types';
import { FeatureCard } from '../ui/featurecard';

export function Features() {
	const features: EvelynCardFeature[] = [
		{
			name: 'Music',
			description: 'With the music module powered by our custom in-house package, you can make your gaming sessions inside voice channels even more enjoyable. You can play music from numerous platforms* such as Deezer, Spotify and more!',
			icon: FaMusic,
			additionalInfo: '(*) Evelyn does not support YouTube or its music related derivative, YouTube Music.'
		},
		{
			name: 'Moderation',
			description: 'Keep your server safe with our simple, yet powerful suite of moderation tools ranging from basic moderation tools such as /ban and /kick to AutoModeration, automatic phishing link detection and moderation logs.',
			icon: HiShieldCheck,
			additionalInfo: 'AutoMod powered by Discord w/ additional custom filters. Anti-Phishing powered by the Anti-Fish API.'
		},
		{
			name: 'Welcome & Goodbye',
			description: 'Give your new members a warm welcome or a heartfelt goodbye with our Welcome & Goodbye plugins that offer fully customizable embeds to your heart\'s content (also includes custom variables that can be used).',
			icon: BsSendFill,
			additionalInfo: 'Information about custom variables is available in Evelyn\'s documentation.'
		},
		{
			name: 'Tickets',
			description: '',
			icon: FaTicket,
			additionalInfo: 'AutoMod powered by Discord w/ additional custom filters. Anti-Phishing powered by the Anti-Fish API.'
		},
		{
			name: 'Anime, Manga, Movies & TV Show Lookup',
			description: 'Get information such as synospis, genres, age rating, average rating and much more regarding your favorite anime, manga, movie or TV show directly inside Discord.',
			icon: HiShieldCheck,
			additionalInfo: 'Anime & Manga information provided by Kitsu. TV & movie information provided by TheMovieDatabase.'
		},
		{
			name: 'Steam Wishlist Picker',
			description: 'For those of you with too many games in their Steam wishlist, this plugin will query your profile and give you a random game you should try out.',
			icon: HiShieldCheck,
			additionalInfo: 'Your Steam profile must be public so Evelyn can query it. This plugin is also offered as a separate web service by us.'
		},
		{
			name: 'Spotify Integration',
			description: 'In addition to music, Evelyn also offers direct integration with Spotify\'s playlists feature with you being able to save songs to your "Liked Songs" library by just pushing a button in the music panel.',
			icon: HiShieldCheck,
			additionalInfo: 'Requires a Spotify account. You can authorize Evelyn by running /spotify link in your server.'
		},
		{
			name: 'Some other feature that I can\'t think about right now',
			description: 'Placeholder text until I find one',
			icon: HiShieldCheck,
			additionalInfo: 'Placeholder too'
		},
	]

	return (
		<section>
			<div className='w-full justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1] font-sans'>
				<h2 className='text-center font-semibold xs:text-[48px] text-[40px] xs:leading-[76.8px] leading-[66.8px] w-full bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500'>Features</h2>
				<p className='font-normal text-dimWhite text-[18px] leading-[30.8px] text-center mt-5'>
					Supercharge your Discord experience to a new level with Evelyn's
					powerful toolkit, packed with an array of exciting features!
				</p>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-12 max-w-7xl mx-auto px-10 text-white'>
				{features.map((feature, i) => (
					<FeatureCard key={`feature_${feature.name}_key`} title={feature.name} description={feature.description} icon={<feature.icon />} index={i} additionalInfo={feature.additionalInfo} />
				))}
			</div>
		</section>
	);
};