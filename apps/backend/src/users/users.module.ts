import { ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { forwardRef, Module } from '@nestjs/common';

import { UsersController } from './controllers/users.controller';
import { BotService } from '../bot/services/bot.service';
import { GuildsModule } from '../guilds/guild.module';
import { UsersService } from './services/users.service';

@Module({
	imports: [forwardRef(() => GuildsModule)],
	controllers: [UsersController],
	providers: [
        BotService,
		UsersService,
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
	exports: [
		UsersService
	]
})
export class UsersModule {}
