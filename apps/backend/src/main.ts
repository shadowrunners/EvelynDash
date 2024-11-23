import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

config();

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

	app.setGlobalPrefix('/api');

	app.enableCors({
		credentials: true,
		maxAge: 40,
		origin: process.env.WEB_URL,
		allowedHeaders: ['Content-Type', 'Authorization'],
		methods: ['GET', 'HEAD', 'POST', 'DELETE', 'PATCH'],
	});

	// eslint-disable-next-line @typescript-eslint/no-var-requires
	await app.register(require('@fastify/helmet'));

	await app.listen({
		port: process.env.PORT || 8080,
		host: '0.0.0.0',
	})
}

bootstrap();