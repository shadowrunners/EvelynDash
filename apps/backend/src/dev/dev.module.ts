import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DevController } from './controllers/dev.controller';
import { UBSchema } from './schemas/userblacklist.schema';
import { GBSchema } from './schemas/guildblacklist.schema';
import { BotService } from '../bot/services/bot.service';
import { DevService } from './services/dev.service';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { GuildsService } from '../guilds/services/guild.service';
import { GuildSchema } from '../guilds/schemas/guild.schema';
import { UsersModule } from '../users/users.module';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'UBlacklist', schema: UBSchema }]),
		MongooseModule.forFeature([{ name: 'GBlacklist', schema: GBSchema }]),
		MongooseModule.forFeature([{ name: 'Guilds', schema: GuildSchema }]),
		UsersModule,
	],
	controllers: [DevController],
	providers: [
		BotService,
		GuildsService,
		DevService,
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
})
export class DevModule {}
