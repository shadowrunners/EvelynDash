import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import type { Model } from 'mongoose';
import { config } from 'dotenv';

import { UserBlacklist } from '../interfaces/userblacklist.schema';
import { GuildBlacklist } from '../interfaces/guildblacklist.schema';

config();

@Injectable()
export class DevService {
	constructor(
        @InjectModel('UBlacklist') private readonly ubDB: Model<UserBlacklist>,
		@InjectModel('GBlacklist') private readonly gbDB: Model<GuildBlacklist>
	// eslint-disable-next-line no-empty-function
	) {}

	async getBlacklistedUsers() {
		return await this.ubDB.find();
	}

	async getBlacklistedGuilds() {
		return await this.gbDB.find();
	}
}

