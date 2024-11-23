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
import { BotService } from '../../bot/services/bot.service';
import { FastifyRequest } from 'fastify';
import { config } from 'dotenv';
import { GuildsService } from '../services/guild.service';
import { EmbedInterface } from '../interfaces/guild.interface';
import { ChannelType } from '@discordjs/core';
import { AuthGuard } from '../guards/auth.guard';
import { EncryptionService } from '../services/encryption.service';

config();

@Controller('/guilds/:guild')
@UseGuards(AuthGuard)
export class GuildController {
	constructor(
		private readonly bot: BotService,
		private readonly guilds: GuildsService,
		private readonly encryption: EncryptionService,
	) {}

	@Get()
	async getGuild(@Param('guild') guild: string): Promise<unknown> {
		if (!guild) throw new HttpException('Missing guild ID', HttpStatus.BAD_REQUEST);

		try {
			const data = await this.bot.api.guilds.get(guild, { with_counts: true });
			if (!data) throw new HttpException('I am not in this guild', HttpStatus.UNAUTHORIZED)

			const enabledFeatures = await this.bot.getEnabledFeatures(guild);
			const channels = await this.bot.api.guilds.getChannels(guild);

			return {
				name: data?.name,
				id: data?.id,
				icon: `https://cdn.discordapp.com/icons/${data.id}/${data.icon}.webp?size=96`,
				approximate_member_count: data.approximate_member_count,
				approximate_channel_count: channels.length,
				channels,
				textChannels: channels.filter((channel) => channel.type === ChannelType.GuildText).length,
				voiceChannels: channels.filter((channel) => channel.type === ChannelType.GuildVoice).length,
				ownerID: data?.owner_id,
				enabledFeatures,
			};
		}
		catch (_err) {
			console.log(_err);
			throw new HttpException('Missing Cyberspace', HttpStatus.NOT_FOUND);
		}
	}

	// testing an idea here
	// @Get('/feature/:feature')
	// async getFeature(@Param('feature') feature: string) {
	//	return `Hit from get feature! Your feature is: ${feature}`;
	// }

	@Get('/features/automod')
	async getAMFeature(@Param('guild') guild: string) {
		const data = await this.guilds.getFeature(guild, 'automod');
		if (!data) return null;

		return {
			alertsChannel: data?.automod.alertsChannel,
			nsfwinvitelinks: data?.automod?.nsfwinvitelinks,
		};
	}

	// needs a rework
	// @Post('/features/automod')
	// async enableAMFeature(@Param('guild') guild: string) {
	//	await this.guilds.update(guild, {
	//		automod: {
	//			enabled: true,
	//		},
	//	});
	//
	//	return { status: HttpStatus.OK };
	//}

	// needs to be implemented (probably reworked as well)
	// @Post('/features/automod/createrule')
	// async enableRule() {}

	@Get('/features/antiphishing')
	async getAPFeature(@Param('guild') guild: string) {
		const data = await this.guilds.getFeature(guild, 'antiphishing');
		if (!data) return null;

		return data;
	}

	@Post('/features/antiphishing')
	async enableAPFeature(
		@Param('guild') guild: string,
	) {
		await this.guilds.update(guild, {
			antiphishing: {
				enabled: true,
			},
		});

		return 'Success';
	}

	@Delete('/features/antiphishing')
	async disableAPFeature(@Param('guild') guild: string) {
		await this.guilds.update(guild, {
			antiphishing: {
				enabled: false,
			},
		});

		return 'Success';
	}

	@Get('/features/confessions')
	async getCFFeature(@Param('guild') guild: string) {
		const data = await this.guilds.getFeature(guild, 'confessions');
		if (!data) return null;

		return {
			enabled: data?.confessions?.enabled,
			channel: data?.confessions?.channel,
		};
	}

	@Post('/features/confessions')
	async enableCFFeature(@Param('guild') guild: string) {
		await this.guilds.update(guild, {
			confessions: {
				enabled: true,
			},
		});

		return 'Success';
	}

	@Patch('/features/confessions')
	async updateCFFeature(@Param('guild') guild: string, @Body() body: ConfessionsResponse) {
		const data = await this.guilds.getFeature(guild, 'confessions');

		if (data?.confessions?.channel !== body.channel && data?.confessions?.webhook?.id)
			await this.bot.api.webhooks.delete(data?.confessions.webhook.id);

		const self = await this.bot.getBotInfo();

		const webhook = await this.bot.api.channels.createWebhook(
			body.channel,
			{ name: 'Evelyn · Confessions', avatar: self.avatar },
		);

		const encryptedToken = this.encryption.encrypt(
			webhook.token as string,
		);

		return await this.guilds.update(guild, {
			confessions: {
				enabled: true,
				channel: body.channel,
				webhook: {
					id: webhook.id,
					token: encryptedToken,
				},
			},
		});
	}

	@Delete('/features/confessions')
	async disableCFFeature(@Param('guild') guild: string, @Req() req: FastifyRequest['raw']) {
		await this.guilds.update(guild, {
			confessions: {
				enabled: false,
			},
		});

		return 'Success';
	}

	@Get('/features/levelling')
	async getLVLFeature(@Param('guild') guild: string) {
		const data = await this.guilds.getFeature(guild, 'levels');
		if (!data) return null;

		return {
			enabled: data?.levels?.enabled,
			channel: data?.levels?.channel,
			message: data?.levels?.message,
			restrictedRoles: data?.levels?.restrictedRoles,
			restrictedChannels: data?.levels?.restrictedChannels,
			roleRewards: data?.levels?.roleRewards,
		};
	}

	@Post('/features/levelling')
	async enableLVLFeature(@Param('guild') guild: string) {
		await this.guilds.update(guild, {
			levels: {
				enabled: true,
			},
		});

		return 'Success';
	}

	@Patch('/features/levelling')
	async updateLVLFeature(@Param('guild') guild: string, @Body() body: LevelsResponse) {
		return await this.guilds.update(guild, {
			levels: {
				enabled: true,
				channel: body.channel,
				message: body.message,
				restrictedRoles: body.restrictedRoles,
				restrictedChannels: body.restrictedChannels,
				roleRewards: body.roleRewards,
			},
		});
	}

	@Delete('/features/levelling')
	async disableLVLFeature(@Param('guild') guild: string) {
		await this.guilds.update(guild, {
			levels: {
				enabled: false,
			},
		});

		return 'Success';
	}

	@Get('/features/logs')
	async getLogsFeature(@Param('guild') guild: string) {
		const data = await this.guilds.getFeature(guild, 'logs');
		if (!data) return null;

		return {
			enabled: data?.logs?.enabled,
			channel: data?.logs?.channel,
		};
	}

	@Post('/features/logs')
	async enableLogsFeature(@Param('guild') guild: string) {
		await this.guilds.update(guild, {
			logs: {
				enabled: true,
			},
		});

		return 'Success';
	}

	@Patch('/features/logs')
	async updateLogsFeature(@Param('guild') guild: string, @Body() body: LogsResponse) {
		const data = await this.guilds.getFeature(guild, 'logs');

		if (data?.logs?.channel !== body.channel && data?.logs?.webhook?.id)
			await this.bot.api.webhooks.delete(data?.logs.webhook.id);

		const self = await this.bot.getBotInfo();

		const webhook = await this.bot.api.channels.createWebhook(
			body.channel,
			{ name: 'Evelyn · Logs', avatar: self.avatar },
		);

		const encryptedToken = this.encryption.encrypt(
			webhook.token as string,
		);

		return await this.guilds.update(guild, {
			logs: {
				enabled: true,
				channel: body.channel,
				webhook: {
					id: webhook.id,
					token: encryptedToken,
				},
			},

		});
	}

	@Delete('/features/logs')
	async disableLogsFeature(@Param('guild') guild: string) {
		await this.guilds.update(guild, {
			logs: {
				enabled: false,
			},
		});

		return 'Success';
	}

	@Get('/features/goodbye')
	async getGBFeature(@Param('guild') guild: string) {
		const data = await this.guilds.getFeature(guild, 'goodbye');
		if (!data) return null;

		return {
			enabled: data?.goodbye?.enabled,
			channel: data?.goodbye?.channel,
			embed: data?.goodbye?.embed,
		};
	}

	@Post('/features/goodbye')
	async enableGBFeature(@Param('guild') guild: string) {
		await this.guilds.update(guild, {
			goodbye: {
				enabled: true,
			},
		});

		return 'Success';
	}

	@Patch('/features/goodbye')
	async updateGDFeature(
		@Param('guild') guild: string,
		@Body() body: GoodbyeResponse,
	) {
		return await this.guilds.update(guild, {
			goodbye: {
				enabled: true,
				channel: body.channel,
				embed: body.embed,
			},
		});
	}

	@Delete('/features/goodbye')
	async disableGBFeature(@Param('guild') guild: string) {
		await this.guilds.update(guild, {
			goodbye: {
				enabled: false,
			},
		});

		return 'Success';
	}

	@Get('/features/tickets')
	async getTicketsFeature(@Param('guild') guild: string) {
		const data = await this.guilds.getFeature(guild, 'tickets');
		if (!data) return null;

		return {
			enabled: data?.tickets?.enabled,
			embed: data?.tickets?.embed,
			transcriptChannel: data?.tickets?.transcriptChannel,
			assistantRole: data?.tickets?.assistantRole,
		};
	}

	@Post('/features/tickets')
	async enableTicketsFeature(@Param('guild') guild: string) {
		await this.guilds.update(guild, {
			tickets: {
				enabled: true,
			},
		});

		return 'Success';
	}

	@Patch('/features/tickets')
	async updateTicketsFeature(
		@Param('guild') guild: string,
		@Body() body: TicketsResponse,
	) {
		return await this.guilds.update(guild, {
			tickets: {
				enabled: true,
				embed: body.embed,
				transcriptChannel: body.transcriptChannel,
				assistantRole: body.assistantRole,
			},
		});
	}

	@Delete('/features/tickets')
	async disableTicketsFeature(@Param('guild') guild: string) {
		await this.guilds.update(guild, {
			tickets: {
				enabled: false,
			},
		});

		return 'Success';
	}

	@Get('/features/welcome')
	async getWLFeature(@Param('guild') guild: string) {
		const data = await this.guilds.getFeature(guild, 'welcome');
		if (!data) return null;

		return {
			enabled: data?.welcome?.enabled,
			channel: data?.welcome?.channel,
			embed: data?.welcome?.embed,
		};
	}

	@Post('/features/welcome')
	async enableWLFeature(@Param('guild') guild: string) {
		await this.guilds.update(guild, {
			welcome: {
				enabled: true,
			},
		});

		return 'Success';
	}

	@Patch('/features/welcome')
	async updateWLFeature(@Param('guild') guild: string, @Body() body: WelcomeResponse) {
		return await this.guilds.update(guild, {
			welcome: {
				enabled: true,
				channel: body.channel,
				embed: body.embed,
			},
		});
	}

	@Delete('/features/welcome')
	async disableWLFeature(@Param('guild') guild: string) {
		await this.guilds.update(guild, {
			welcome: {
				enabled: false,
			},
		});

		return 'Success';
	}

	@Get('/channels')
	async getChannels(@Param('guild') guild: string) {
		const channels = await this.bot.api.guilds.getChannels(guild);
		if (!channels) return null;

		return channels;
	}

	@Get('/roles')
	async getRoles(@Param('guild') guild: string) {
		const roles = await this.bot.api.guilds.getRoles(guild);
		if (!roles) return null;

		return roles;
	}
}

interface BaseResponse {
	enabled: boolean;
}

interface WelcomeResponse extends BaseResponse {
  channel: string;
  embed: EmbedInterface;
}

interface VerifyResponse extends BaseResponse {
  role: string;
}

interface GoodbyeResponse extends BaseResponse {
  channel: string;
  embed: EmbedInterface;
}

interface LogsResponse extends BaseResponse {
  channel: string;
}

interface ConfessionsResponse extends BaseResponse {
  channel: string;
}

interface TicketsResponse extends BaseResponse {
  transcriptChannel: string;
  assistantRole: string;
  embed: EmbedInterface;
}

interface StarboardResponse extends BaseResponse {
  channel: string;
  starsRequirement: string;
}

interface LevelsResponse extends BaseResponse {
  channel: string;
  message: string;
  restrictedRoles: string[];
  restrictedChannels: string[];
  roleRewards: {
	level: number;
	roleId: string;
  }[];
}