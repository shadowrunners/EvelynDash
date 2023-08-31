import { CustomFeatures, CustomGuildInfo } from '@/config/types';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { getGuilds, fetchUserInfo } from '@/api/discord';
import {
	disableFeature,
	enableFeature,
	fetchGuildChannels,
	fetchGuildInfo,
	fetchGuildRoles,
	getFeature,
	updateFeature,
} from '@/api/bot';
import { GuildInfo } from '@/config/types';
import type { UserInfo } from '@/types/types';
import { useSession } from 'next-auth/react';

export const client = new QueryClient({
	defaultOptions: {
		mutations: {
			retry: 0,
		},
		queries: {
			refetchOnWindowFocus: false,
			staleTime: Infinity,
			retry: 0,
		},
	},
});

/** Gets the access token from the session. */
export function getAccessToken() {
	const { data: session } = useSession();
	return session?.accessToken;
}

export const Keys = {
	login: ['login'],
	guild_info: (guild: string) => ['guild_info', guild],
	features: (guild: string, feature: string) => ['feature', guild, feature],
	guildRoles: (guild: string) => ['guild_roles', guild],
	guildChannels: (guild: string) => ['guild_channel', guild],
};

export function useGuilds() {
	const accessToken = getAccessToken();

	return useQuery(['user_guilds'], () => getGuilds(accessToken as string), {
		enabled: accessToken != null,
	});
}

export function useSelfUserQuery() {
	const accessToken = getAccessToken();

	return useQuery<UserInfo>(['users', 'me'], () => fetchUserInfo(accessToken as string), {
		enabled: accessToken != null,
		staleTime: Infinity,
	});
}

export function useGuildInfoQuery(guild: string) {
	const { data: session, status } = useSession();

	return useQuery<CustomGuildInfo | null>(
		Keys.guild_info(guild),
		() => fetchGuildInfo(session, guild),
		{
			enabled: status === 'authenticated',
			refetchOnWindowFocus: true,
			retry: false,
			staleTime: 0,
		},
	);
}

export function useFeatureQuery<K extends keyof CustomFeatures>(guild: string, feature: K) {
	const { data: session, status } = useSession();

	return useQuery(Keys.features(guild, feature), () => getFeature(session, guild, feature), {
		enabled: status === 'authenticated',
	});
}

export type EnableFeatureOptions = { guild: string; feature: string; enabled: boolean };
export function useEnableFeatureMutation() {
	const { data: session } = useSession();

	return useMutation(
		async ({ enabled, guild, feature }: EnableFeatureOptions) => {
			if (enabled) return enableFeature(session, guild, feature);
			return disableFeature(session, guild, feature);
		},
		{
			async onSuccess(_, { guild, feature, enabled }) {
				await client.invalidateQueries(Keys.features(guild, feature));
				client.setQueryData<GuildInfo | null>(Keys.guild_info(guild), (prev) => {
					if (prev === null) return null;

					if (enabled) {
						return {
							...prev,
							enabledFeatures: prev?.enabledFeatures?.includes(feature)
								? prev.enabledFeatures
								: [...prev?.enabledFeatures as string[], feature],
						};
					}
					else {
						return {
							...prev,
							enabledFeatures: prev?.enabledFeatures?.filter((f) => f !== feature),
						};
					}
				});
			},
		},
	);
}

export type UpdateFeatureOptions = {
  guild: string;
  feature: keyof CustomFeatures;
  options: FormData | string;
};
export function useUpdateFeatureMutation() {
	const { data: session } = useSession();

	return useMutation(
		(options: UpdateFeatureOptions) =>
			updateFeature(session, options.guild, options.feature, options.options),
		{
			onSuccess(updated, options) {
				const key = Keys.features(options.guild, options.feature);

				return client.setQueryData(key, updated);
			},
		},
	);
}

export function useGuildRolesQuery(guild: string) {
	const { data: session } = useSession();

	return useQuery(Keys.guildRoles(guild), () => fetchGuildRoles(session!, guild));
}

export function useGuildChannelsQuery(guild: string) {
	const { data: session } = useSession();

	return useQuery(Keys.guildChannels(guild), () => fetchGuildChannels(session!, guild));
}

export function useSelfUser(): UserInfo {
	return useSelfUserQuery().data!;
}

export function useGuildPreview(guild: string) {
	const query = useGuilds();

	return {
		guild: query.data?.find((g) => g.id === guild),
		query,
	};
}
