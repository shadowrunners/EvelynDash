import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { BotService } from "../../bot/services/bot.service";
import { FastifyRequest } from "fastify";
import { getAccessToken } from "../../utils";

@Injectable()
export class DevGuard implements CanActivate {
    constructor(
        private readonly bot: BotService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest() as FastifyRequest;

        const authHeader = request.headers.authorization;
        if (!authHeader) return false;

        const authToken = getAccessToken(authHeader);
        if (!authToken) return false;

        const isOwner = await this.bot.isOwner(authToken);
        if (!isOwner) return false;

        return true;
    }
}