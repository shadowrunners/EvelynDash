import { Schema } from 'mongoose';

export const UBSchema = new Schema({
	userId: { type: String },
	reason: { type: String },
	time: { type: Number },
});
