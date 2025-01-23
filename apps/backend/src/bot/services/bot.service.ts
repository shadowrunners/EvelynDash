import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { API, PermissionFlagsBits } from '@discordjs/core';
import { REST } from '@discordjs/rest';
import { config } from 'dotenv';

import { GuildsService } from '../../guilds/services/guild.service';
import { UsersService } from '../../users/services/users.service';
import { getAccessToken } from '../../utils';

config();

@Injectable()
export class BotService {
	private readonly rest: REST;
	public readonly api: API;

	constructor(
		private readonly guilds: GuildsService,
		private readonly users: UsersService,
	) {
		this.rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN as string);
		this.api = new API(this.rest);
	}

	public async getBotInfo() {
		return await this.api.users.get(process.env.CLIENT_ID);
	}

	public async getEnabledFeatures(guild: string) {
		const data = await this.guilds.get(guild);

		const features = [
			{ name: 'automod', enabled: true },
			{ name: 'antiphishing', enabled: data?.antiphishing?.enabled },
			{ name: 'confessions', enabled: data?.confessions?.enabled },
			{ name: 'goodbye', enabled: data?.goodbye?.enabled },
			{ name: 'logs', enabled: data?.logs?.enabled },
			{ name: 'levelling', enabled: data?.levels?.enabled },
			{ name: 'starboard', enabled: data?.starboard?.enabled },
			{ name: 'tickets', enabled: data?.tickets?.enabled },
			{ name: 'verification', enabled: data?.verification?.enabled },
			{ name: 'welcome', enabled: data?.welcome?.enabled },
		];

		const filterFeatures = features.filter((feature) => feature.enabled === true);
		const enabledFeatures = filterFeatures.map((feature) => feature.name);
		return enabledFeatures.join(', ');
	}

	public async isOwner(token: string) {
		const accessToken = getAccessToken(token);
		const user = await this.users.getCUser(accessToken);
		const member = await this.api.users.get(user.id);

		if (member.id !== process.env.OWNER_ID) 
			throw new HttpException('Unauthorized', HttpStatus.FORBIDDEN);

		return true;
	}
}