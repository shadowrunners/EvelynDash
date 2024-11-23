import { Controller, Get, Req } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { config } from 'dotenv';

import { getAccessToken } from '../../utils';

import { BotService } from '../../bot/services/bot.service';
import { UsersService } from '../services/users.service';

config();

@Controller('/users')
export class UsersController {
	constructor(
		private readonly bot: BotService,
		private readonly users: UsersService,
	) {}

	@Get('/@me')
	async getCurrentUser(@Req() { headers }: FastifyRequest['raw']) {
		const acccessToken = getAccessToken(headers.authorization);
		const user = await this.users.getCUser(acccessToken);

		return user;
	}

	@Get('/@me/guilds')
	async getCurrentUserGuilds(@Req() { headers }: FastifyRequest['raw']) {
		const accessToken = getAccessToken(headers.authorization);

		const [botGuilds, userGuilds] = await Promise.all([
			await this.bot.api.users.getGuilds(),
			await this.users.getCUserGuilds(accessToken),
		]);

		const botGuildsSet = new Set(botGuilds.map((guild) => guild.id));
		return userGuilds.map((guild) => ({
			name: guild.name,
			id: guild.id,
			botPresent: botGuildsSet.has(guild.id),
			icon: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=96`,
			owner: guild.owner,
			permissions: guild.permissions,
		}));
	}
}