/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutableRefObject, Dispatch, SetStateAction } from 'react';
import type { Styles, EvelynFeature } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { MdMessage, MdPhishing } from "react-icons/md";
import { FaShield } from 'react-icons/fa6';
import { LuMailQuestion } from 'react-icons/lu';

export function getFeatures(): EvelynFeature[] {
    // TODO: Implement translations.

    return [
        {
            name: 'Anti-Phishing',
            description: 'Protect your server against bad actors trying to phish your users for their credentials.',
            icon: MdPhishing,
			href: '/features/antiphishing'
        },
		{
			name: 'AutoMod',
			description: 'PLACEHOLDER',
			icon: FaShield,
			href: '/features/automod'
		},
		{
			name: 'Confessions',
			description: 'PLACEHOLDER',
			icon: LuMailQuestion,
			href: '/features/confessions'
		},
		{
			name: 'Goodbye',
			description: 'PLACEHOLDER',
			icon: MdMessage,
			href: '/features/goodbye'
		},
		{
			name: 'Logs',
			description: 'PLACEHOLDER',
			icon: MdMessage,
			href: '/features/logs'
		}
    ]
}

/**
 * The styles used by the homepage.
 * @deprecated Will be removed in a future update since they're not being reused anymore.
 */
export const styles: Styles = {
	boxWidth: 'xl:max-w-[1280px] w-full',
	boxNav: 'xl:max-w-[1920px] w-full',

	heading2:
		'font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full',
	paragraph:
		'font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px]',

	flexCenter: 'flex justify-center items-center',
	flexStart: 'flex justify-center items-start',

	paddingX: 'sm:px-16 px-6',
	paddingY: 'sm:py-16 py-6',
	padding: 'sm:px-16 px-6 sm:py-12 py-4',

	marginX: 'sm:mx-16 mx-6',
	marginY: 'sm:my-16 my-6',
};

/** The observer hook used to detect when certain components are in view. Mostly used for animations. */
export function observerHook(
	ref: MutableRefObject<HTMLDivElement | null>,
	setInView: Dispatch<SetStateAction<boolean>>,
) {
	const observer = new IntersectionObserver(([entry]) => {
		setInView(entry.isIntersecting);
	}, { threshold: 0.3 });
	if (ref.current) observer.observe(ref.current);
	return () => {
		if (ref.current) observer.unobserve(ref.current);
	};
}

/** The function used by all @shadcn/ui elements. */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/** Converts the given number to a Hex value. */
export function toRGB(num: number) {
	num >>>= 0;
	const b = num & 0xff,
		g = (num & 0xff00) >>> 8,
		r = (num & 0xff0000) >>> 16;
	return 'rgb(' + [r, g, b].join(',') + ')';
}
