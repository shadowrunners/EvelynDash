import { Schema } from 'mongoose';

export const GBSchema = new Schema({
	guildId: { type: String },
	reason: { type: String },
	time: { type: Number },
});
