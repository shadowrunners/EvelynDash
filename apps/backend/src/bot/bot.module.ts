import { forwardRef, Module } from '@nestjs/common';

import { GuildsModule } from '../guilds/guild.module';
import { BotService } from './services/bot.service';
import { UsersService } from '../users/services/users.service';
import { UsersModule } from '../users/users.module';

@Module({
	imports: [
		forwardRef(() => GuildsModule),
		UsersModule,
	],
	controllers: [],
	providers: [BotService, UsersService],
    exports: [BotService],
})
export class BotModule {}
