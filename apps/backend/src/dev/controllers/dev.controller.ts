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
	UseGuards,
} from '@nestjs/common';
import { SecureStorage } from '../../utils/secureStorage';
import { BotService } from '../../bot/services/bot.service';
import { FastifyRequest } from 'fastify';
import { config } from 'dotenv';

import { DevService } from '../services/dev.service';
import { DevGuard } from '../guards/dev.guard';

config();

@Controller('/dev')
@UseGuards(DevGuard)
export class DevController {
	private secureStorage: SecureStorage;

	constructor(
		private readonly bot: BotService,
		private readonly dev: DevService,
	) {
		this.secureStorage = new SecureStorage();
	}

	@Get('/blusers')
	async getBlacklistedUsers(): Promise<unknown> {
		try {
			return await this.dev.getBlacklistedUsers();
		}
		catch (_err) {
			throw new HttpException('Missing Cyberspace', HttpStatus.NOT_FOUND);
		}
	}

    @Get('/blguilds')
    async getBlacklistedGuilds(): Promise<unknown> {
		try {
			return await this.dev.getBlacklistedGuilds();
		}
		catch (_err) {
			console.log(_err);
			throw new HttpException('Missing Cyberspace', HttpStatus.NOT_FOUND);
		}
    }

	// TODO: Add patch requests for adding the guild / user to the blacklist.

	@Patch('/blguilds/add')
	async addGuildToBlacklist() {
		// this'll get a body with:
		// {
		// 		guildId: "123",
		// 		reason: "testing"
		// }
		// blacklist time will be added on the server side
	}

	@Patch('/blusers/add')
	async addUserToBlacklist() {
		// same shit as the above.
	}
}
