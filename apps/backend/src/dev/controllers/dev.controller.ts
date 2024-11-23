import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Req,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { SecureStorage } from '../../utils/secureStorage';
import { BotService } from '../../bot/services/bot.service';
import { FastifyRequest } from 'fastify';
import { config } from 'dotenv';

import { DevService } from '../services/dev.service';

config();

@Controller('/dev')
export class DevController {
	private secureStorage: SecureStorage;

	constructor(
		private readonly bot: BotService,
		private readonly dev: DevService,
	) {
		this.secureStorage = new SecureStorage();
	}

	@Get('/blusers')
	async getBlacklistedUsers(
		@Req() { headers }: FastifyRequest['raw'],
	): Promise<unknown> {
		await this.bot.isOwner(headers.authorization as string);

		try {
			const data = await this.dev.getBlacklistedUsers();
			return data;
		}
		catch (_err) {
			console.log(_err);
			throw new HttpException('Missing Cyberspace', HttpStatus.NOT_FOUND);
		}
	}

    @Get('/blguilds')
    async getBlacklistedGuilds(
        @Req() { headers }: FastifyRequest['raw'],
    ): Promise<unknown> {
        await this.bot.isOwner(headers.authorization as string);

		try {
			const data = await this.dev.getBlacklistedGuilds();
			return data;
		}
		catch (_err) {
			console.log(_err);
			throw new HttpException('Missing Cyberspace', HttpStatus.NOT_FOUND);
		}
    }

	// TODO: Add patch requests for adding the guild / user to the blacklist.
}
