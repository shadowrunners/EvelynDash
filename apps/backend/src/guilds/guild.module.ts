import { ThrottlerGuard } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { GuildController } from './controllers/guild.controller';
import { GuildsService } from './services/guild.service';
import { GuildSchema } from './schemas/guild.schema';
import { BotModule } from '../bot/bot.module';
import { BotService } from '../bot/services/bot.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/services/users.service';
import { EncryptionService } from './services/encryption.service';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Guilds', schema: GuildSchema }]),
		BotModule,
		UsersModule,
	],
	controllers: [GuildController],
	providers: [
		GuildsService,
		BotService,
		UsersService,
		EncryptionService,
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
	exports: [GuildsService]
})
export class GuildsModule {}
