import { IconType } from 'react-icons';
import type {
	ControlledInput,
	FormProps,
	SelectMenuProps,
	SelectMenuOptionArray,
	UseFormRender,
	UseFormRenderResult,
} from './formTypes';

import type {
	APIGuild,
	RESTGetAPIGuildChannelsResult,
} from 'discord-api-types/v10';
import { UseFormReturn } from 'react-hook-form';

export type EvelynFeature = {
	/** The name of the feature. */
    name: string;
	/** The description of the feature. */
    description: string;
	/** The icon of the feature. */
    icon: IconType;
	/** The href of the feature. */
	href?: string;
};

/** The override type. */
export type Override<T, R> = Omit<T, keyof R> & R;

export type Styles = {
    boxWidth: string;
    boxNav: string;
    heading2: string;
    paragraph: string;
    flexCenter: string;
    flexStart: string;
    paddingX: string;
    paddingY: string;
    padding: string;
    marginX: string;
    marginY: string;
};

export type NavTranslations = {
    nav_home: string,
    nav_commands: string,
    nav_faq: string,
    nav_docs: string,
    nav_dash_btn: string,
    login_btn: string,
};

/** The guild data coming from the API. */
export type SPAPIGuild = APIGuild & {
    approximate_channel_count: number;
    channels: RESTGetAPIGuildChannelsResult;
    textChannels: number;
    voiceChannels: number;
    enabledFeatures: string[];
}

export type EvelynCardFeature = EvelynFeature & {
	/** Additional information about the feature. */
	additionalInfo?: string;
}

export type SPAPIPartialGuild = {
	/** The name of the guild. */
	name: string;
	/** The ID of the guild. */
	id: string;
	/** If the bot is present or not. */
	botPresent: boolean;
	/** The full icon URL of the guild. */
	icon: string;
	/** If the user is the owner or not. */
	owner: boolean;
	/** The permissions bit field. */
	permissions: string;
};

export type FormParams = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	form: UseFormReturn<any, any>;
	formName: string;
	formLabel?: string;
	formDescription?: string;
}

export type {
	FormProps,
	UseFormRender,
	UseFormRenderResult,
	ControlledInput,
	SelectMenuProps,
	SelectMenuOptionArray,
};