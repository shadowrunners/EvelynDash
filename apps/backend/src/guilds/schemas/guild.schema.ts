import { Schema } from 'mongoose';

export const GuildSchema = new Schema({
	guildId: { type: String },
	automod: {
		enabled: { type: Boolean },
		mentionSpam: {
			enabled: { type: Boolean },
			ruleId: { type: String },
		},
		profanity: {
			enabled: { type: Boolean },
			ruleId: { type: String },
		},
		sexualContent: {
			enabled: { type: Boolean },
			ruleId: { type: String },
		},
		spam: {
			enabled: { type: Boolean },
			ruleId: { type: String },
		},
		customKeyWord: {
			enabled: { type: Boolean },
			ruleId: { type: String },
			keyword: { type: String },
		},
		zalgo: {
			enabled: { type: Boolean },
			ruleId: { type: String },
		},
		emojiSpam: {
			enabled: { type: Boolean },
			ruleId: { type: String },
		},
		inviteLinks: {
			enabled: { type: Boolean },
			ruleId: { type: String },
		},
	},
	logs: {
		enabled: Boolean,
		channel: String,
		webhook: {
			id: String,
			token: String,
		},
	},
	welcome: {
		enabled: Boolean,
		channel: String,
		embed: Object,
	},
	goodbye: {
		enabled: Boolean,
		channel: String,
		embed: Object,
	},
	blacklist: {
		isBlacklisted: Boolean,
		reason: String,
		time: Number,
	},
	tickets: {
		enabled: Boolean,
		embed: Object,
		transcriptChannel: String,
		assistantRole: String,
	},
	levels: {
		enabled: Boolean,
		channel: String,
		message: String,
		restrictedRoles: [String],
		restrictedChannels: [String],
		roleRewards: [
			{
				level: Number,
				roleId: String,
			},
		],
	},
	confessions: {
		enabled: Boolean,
		channel: String,
		webhook: {
			id: String,
			token: String,
		},
	},
	antiphishing: {
		enabled: Boolean,
	},
	starboard: {
		enabled: Boolean,
		starboardChannel: String,
		starsRequirement: Number,
	},
	verification: {
		enabled: Boolean,
		role: String,
	},
});
