import type { APIRole, APIGuild, APIChannel, APIUser, HVGuild } from '@/types/types';
import type { CustomFeatures } from '@/types/features';
import { signOut } from 'next-auth/react';

/**
 * Gets the custom information about the guild from the backend.
 * @param id The guild's ID.
 * @param accessToken The user's access token.
 * @returns The information if the user is in the guild otherwise null.
 */
export async function fetchGuildInfo(id: string, accessToken: string): Promise<HVGuild | null> {
	const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guilds/${id}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	return await data.json();
}

/**
 * Enables the feature on the backend.
 * @param id The guild's ID.
 * @param feature The feature that will be enabled.
 * @param accessToken The user's access token.
 * @returns A 200 response to indicate that the feature was enabled.
 */
export async function enableFeature(id: string, feature: string, accessToken: string) {
	return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guilds/${id}/features/${feature}`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
}

/**
 * Disables the feature on the backend.
 * @param id The guild's ID.
 * @param feature The feature that will be enabled.
 * @param accessToken The user's access token.
 * @returns A 200 response to indicate that the feature was disabled.
 */
export async function disableFeature(id: string, feature: string, accessToken: string) {
	return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guilds/${id}/features/${feature}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
}

/**
 * Gets the information about the feature.
 * @param id The guild's ID.
 * @param feature The feature that will have its information fetched.
 * @param accessToken The user's access token.
 * @returns The information about the feature.
 */
export async function getFeature<K extends keyof CustomFeatures>(
	id: string,
	feature: K,
	accessToken: string,
): Promise<CustomFeatures[K]> {
	const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guilds/${id}/features/${feature}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	return await data.json();
}

/**
 * Updates the feature on the backend.
 * @param id The guild's ID.
 * @param feature The feature that will have its information fetched.
 * @param options The new feature config.
 * @param accessToken The user's access token.
 * @returns The information about the feature.
 */
export async function updateFeature<K extends keyof CustomFeatures>(
	id: string,
	feature: K,
	options: FormData | string,
	accessToken: string,
): Promise<CustomFeatures[K]> {
	const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guilds/${id}/features/${feature}`, {
		method: 'PATCH',
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json',
		},
		body: options,
	});

	return await data.json();
}

/**
 * Fetches the guild's roles from the backend.
 * @param id The guild's ID.
 * @param accessToken The user's access token.
 * @returns The guild's roles.
 */
export async function fetchGuildRoles(id: string, accessToken: string) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guilds/${id}/roles`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	return await res.json() as APIRole[];
}

/**
 * Fetches the guild's channels from the backend.
 * @param id The guild's ID.
 * @param accessToken The user's access token.
 * @returns The guild's channels.
 */
export async function fetchGuildChannels(id: string, accessToken: string) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guilds/${id}/channels`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const body = res.json() as Promise<APIChannel[]>;
	return body;
}

/**
 * Fetches information about the user from the Discord API.
 * @param accessToken The user's access token.
 * @returns The guild's channels.
 */
export async function fetchUserInfo(accessToken: string) {
	const res = await fetch('https://discord.com/api/v10/users/@me', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (res.status === 401) await signOut();

	return await res.json() as APIUser;
}

/**
 * Fetches the guilds the user is in.
 * @param accessToken The user's access token.
 * @returns The user's guilds.
 */
export async function getGuilds(accessToken: string) {
	const data = await fetch('https://discord.com/api/v10/users/@me/guilds', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	return await data.json() as APIGuild[];
}

/**
 * Fetches information about the guild from the Discord API.
 * @param accessToken The user's access token.
 * @param id The guild's ID.
 * @returns The user's guilds.
 */
export async function getGuild(accessToken: string, id: string) {
	const data = await fetch(`https://discord.com/api/v10/guilds/${id}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	return await data.json() as APIGuild[];
}

export function getGuildImg(id: string, icon: string) {
	// TODO: Replace this with the placeholder image.
	if (!id || !icon) return './send.svg';
	return `https://cdn.discordapp.com/icons/${id}/${icon}.webp`;
}

export function getAvatarUrl(user: APIUser | undefined) {
	// TODO: Replace this with the placeholder image.
	if (!user) return './send.svg';
	return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=256`;
}