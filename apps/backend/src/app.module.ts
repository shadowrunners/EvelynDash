import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GuildController } from './guilds/controllers/guild.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { GuildsModule } from './guilds/guild.module';
import { DevController } from './dev/controllers/dev.controller';
import { DevModule } from './dev/dev.module';
import { UsersModule } from './users/users.module';
import { BotModule } from './bot/bot.module';

@Module({
	imports: [
		MongooseModule.forRoot(process.env.DATABASE_URL),
		ThrottlerModule.forRoot([{ ttl: 30000, limit: 10 }]),
		GuildsModule,
		DevModule,
		UsersModule,
		BotModule,
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(GuildController);
		consumer.apply(AuthMiddleware).forRoutes(DevController);
	}
}
