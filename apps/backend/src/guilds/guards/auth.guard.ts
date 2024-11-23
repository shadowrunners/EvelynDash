import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { BotService } from '../../bot/services/bot.service';
import { FastifyRequest } from 'fastify';
import { PermissionFlagsBits } from '@discordjs/core';
import { getAccessToken } from '../../utils';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly bot: BotService,
        private readonly users: UsersService,
    ) {}

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest() as FastifyRequest;

        const authHeader = request.headers.authorization;
        if (!authHeader) return false;

        const authToken = getAccessToken(authHeader);
        if (!authToken) return false;

        const guildId = request.url.split('/')[3];
        
        let guild;
        try {
            guild = await this.bot.api.guilds.get(guildId, { with_counts: false });
        } catch (_err) {
            throw new HttpException('Missing or invalid cyberspace ID', HttpStatus.NOT_FOUND);
        }
        
        const mID = await this.users.getCUser(authToken);
        if (!mID) return false;

        const member = await this.bot.api.guilds.getMember(guild.id, mID.id);
        if (
            (Number(guild.permissions) & Number(PermissionFlagsBits.Administrator)) !== 0 &&
            guild.owner_id !== member?.user.id
        ) throw new HttpException('Missing permissions', HttpStatus.FORBIDDEN);

        return true;
    }
}

