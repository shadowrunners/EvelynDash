import {
	PermissionFlagsBits,
	RESTGetAPICurrentUserGuildsResult,
	RESTGetAPICurrentUserResult,
} from "@discordjs/core";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class UsersService {
    /** Gets the current user's data from the Discord API by using their access token. Equivalent of Discord's /users/@me. */
	async getCUser(accessToken: string) {
		const res = await fetch('https://discord.com/api/v10/users/@me', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (!res.ok) throw new UnauthorizedException('Missing or invalid access token.');
		return await res.json() as RESTGetAPICurrentUserResult;
	}

	/** Gets the current user's guilds from the Discord API by using their access token. Equivalent of Discord's /users/@me/guilds. */
	async getCUserGuilds(accessToken: string) {
		const res = await fetch('https://discord.com/api/v10/users/@me/guilds', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (!res.ok) throw new UnauthorizedException('Missing or invalid access token.');

		const data = await res.json() as RESTGetAPICurrentUserGuildsResult;
		return data.filter((guild) => (BigInt(guild.permissions) & BigInt(PermissionFlagsBits.Administrator)) !== BigInt(0))
  	};
}