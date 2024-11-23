import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';

import { InjectModel } from '@nestjs/mongoose';
import { Guild } from '../interfaces/guild.interface';
import type { Model } from 'mongoose';

config();

@Injectable()
export class GuildsService {
	constructor(
        @InjectModel('Guilds') private readonly guilds: Model<Guild>,
	// eslint-disable-next-line no-empty-function
	) {}

	/** Gets the full information regarding the guild's config from the DB. */
	public async get(guild: string) {
		return await this.guilds.findOne({ guildId: guild });
	}

	/** Gets the full information regarding a guild's specific feature. */
	public async getFeature(guildId: string, feature: Features) {
		return await this.guilds.findOne({ guildId }).select(feature);
	}

	public async update(guild: string, data: object) {
		return await this.guilds.updateOne(
			{ guildId: guild }, { $set: data }, { upsert: true },
		).lean();
	}
}

export type Features = 
	'automod' |
	'antiphishing' |
    'confessions' |
	'goodbye' |
	'levels' |
    'logs' |
	'tickets' |
	'welcome';

