import { Document } from "mongoose";

export interface UserBlacklist extends Document {
	/** The ID of the user. */
	userId: string;
	/** The reason the user is blacklisted for. */
	reason: string;
	/** The time when the user was blacklisted. */
	time: number;
}