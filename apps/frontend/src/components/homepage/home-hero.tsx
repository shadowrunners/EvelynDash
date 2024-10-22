'use client';

import { observerHook, styles, variants } from '@/utils/util';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

// TODO: Re-do this completely so it's more modern. Possibly use Aceternity UI.

const Hero = () => {
	const translation = useTranslations('main');

	return (
		<section className='flex md:flex-row flex-col h-screen text-center'>
			<Image
				src='https://res.cloudinary.com/shadowrunners/image/upload/q_auto/evl1_idtuxu.webp'
				fill={true}
				priority={true}
				alt='coolbg'
				className='absolute inset-0 object-cover opacity-40 z-0'
			/>
			<div key='div_gradient_black' className="absolute bottom-0 h-[270px] w-full xl:left-[0px] bg-gradient-to-b from-transparent to-black" />

			<div
				className='flex-1 flex items-center justify-center xl:mb-[140px] flex-col xl:px-0 sm:px-16 px-6 xl:mt-[-250px] xs:mt-[-350px] relative text-center'
				key='div_content_hero'
			>
				<h1
					className={`${styles.heading2} text-center`}
					key='hero_main_heading'
				>
					{translation('hero_main1')} <span className='text-gradient'>{translation('hero_main2')}</span> {translation('hero_main3')}
				</h1>
				<p
					className={`${styles.paragraph} max-w-[470px] mt-5`}
					key='hero_main_paragraph'
				>
					{translation('hero_punchline')}
				</p>
			</div>
		</section>
	);
};

export default Hero;
