/**
 * This file houses all the types for Features.
 * @deprecated Will be removed in a future update.
 */

import { ReactElement, ReactNode } from 'react';
import {
	useAntiPhishFeature,
	useConfessionSystem,
	useGoodbyeSystem,
	useLevellingSystem,
	useTicketSystem,
	useVerifySystem,
	useWelcomeFeature,
	useStarboardSystem,
} from '@/features';

import { LuDiff, LuMailQuestion, LuStar, LuTicket } from 'react-icons/lu';
import { IoShieldCheckmarkSharp } from 'react-icons/io5';
import { MdMessage, MdPhishing } from 'react-icons/md';
import { useTranslations } from 'next-intl';
import type { UseFormRender } from './';

export type CustomFeatures = {
    antiphishing: AntiPhishingFeature,
    confessions: ConfessionsFeature,
    goodbye: GoodbyeFeature,
    levelling: LevellingFeature,
    tickets: TicketsFeature,
    starboard: StarboardFeature,
    verification: VerifyFeature,
    welcome: WelcomeFeature,
};

export interface FeatureConfig<K extends keyof CustomFeatures> {
    name: string;
    description?: ReactNode;
    icon?: ReactElement;
    /**
     * Render content in Feature view
     */
    useRender: UseFormRender<CustomFeatures[K]>;
    /**
     * Render skeleton before feature is loaded
     */
    useSkeleton?: () => ReactNode;
}

/** This is where the information for every feature is. */
export const Features = () => {
	const t = useTranslations('dash');

	return {
		antiphishing: {
			name: t('features.antiphishing.title'),
			description: t('features.antiphishing.description'),
			icon: <MdPhishing />,
			useRender: useAntiPhishFeature,
		},
		// automod: {
			//name: 'AutoMod',
			//description: 'Protect your server. PLACEHOLDER',
			//icon: <FaShield />,
			//useRender: useAutoModFeature,
		//},
		confessions: {
			name: t('features.confessions.title'),
			description: t('features.confessions.description'),
			icon: <LuMailQuestion />,
			useRender: useConfessionSystem,
		},
		goodbye: {
			name: t('features.goodbye.title'),
			description: t('features.goodbye.description'),
			icon: <MdMessage />,
			useRender: useGoodbyeSystem,
		},
		levelling: {
			name: t('features.levelling.title'),
			description: t('features.levelling.description'),
			icon: <LuDiff />,
			useRender: useLevellingSystem,
		},
		tickets: {
			name: t('features.tickets.title'),
			description: t('features.tickets.description'),
			icon: <LuTicket />,
			useRender: useTicketSystem,
		},
		starboard: {
			name: t('features.starboard.title'),
			description: t('features.starboard.description'),
			icon: <LuStar />,
			useRender: useStarboardSystem,
		},
		verification: {
			name: t('features.verification.title'),
			description: t('features.verification.description'),
			icon: <IoShieldCheckmarkSharp />,
			useRender: useVerifySystem,
		},
		welcome: {
			name: t('features.welcome.title'),
			description: t('features.welcome.description'),
			icon: <MdMessage />,
			useRender: useWelcomeFeature,
		},
	};
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type AntiPhishingFeature = {};

export type AutoModFeature = {
    alertsChannel: string;

    mentionspam: {
        enabled: boolean;
        ruleId: string;
    };

    nsfwinvitelinks: {
        enabled: boolean;
        ruleId: string;
    }

    profanity: {
        enabled: boolean;
        ruleId: string;
	};
	sexualContent: {
        enabled: boolean;
        ruleId: string;
	};
	spam: {
        enabled: boolean;
        ruleId: string;
	};
	customKeyWord: {
        enabled: boolean;
        ruleId: string;
		keyword: string;
	};
	zalgo: {
        enabled: boolean;
        ruleId: string;
	};
	emojiSpam: {
        enabled: boolean;
        ruleId: string;
	};
	inviteLinks: {
        enabled: boolean;
        ruleId: string;
	};
}

export type ConfessionsFeature = {
    channel?: string;
}

export type LevellingFeature = {
    channel?: string;
    message?: string;
    restrictedChannels?: {
        value: string;
    }[] | string[];
    restrictedRoles?: {
        value: string;
    }[] | string[];
    roleRewards?: {
        level: number;
        roleId: string;
    }[]
}

export type TicketsFeature = {
    transcriptChannel?: string;
    assistantRole?: string;
    embed?: {
        content?: string;
        author?: {
            name?: string;
            iconURL?: string;
        }
        color?: string;
        title?: string;
        description?: string;
        thumbnail?: string;
        image?: string;
        footer?: {
            text?: string;
            iconURL?: string;
        }
    };
}

export type WelcomeFeature = {
    channel?: string;
    embed?: {
        content?: string;
        author?: {
            name?: string;
            iconURL?: string;
        }
        color?: string;
        title?: string;
        description?: string;
        thumbnail?: string;
        image?: string;
        footer?: {
            text?: string;
            iconURL?: string;
        }
    };
};

export type GoodbyeFeature = {
    channel?: string;
    embed?: {
        content?: string;
        author?: {
            name?: string;
            iconURL?: string;
        }
        color?: string;
        title?: string;
        description?: string;
        thumbnail?: string;
        image?: string;
        footer?: {
            text?: string;
            iconURL?: string;
        }
    };
};

export type VerifyFeature = {
    role?: string;
}

export type StarboardFeature = {
    channel?: string;
    starsRequirement?: number;
}

export type IdFeature<K extends keyof CustomFeatures = keyof CustomFeatures> = FeatureConfig<K> & {
    id: K;
};