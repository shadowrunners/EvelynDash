import { Document } from "mongoose";

export interface GuildBlacklist extends Document {
	/** The ID of the guild. */
	guildId: string;
	/** The reason the guild is blacklisted for. */
	reason: string;
	/** The time when the guild was blacklisted. */
	time: number;
}