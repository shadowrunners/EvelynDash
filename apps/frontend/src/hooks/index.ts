import type { CustomFeatures } from '@/types/features';
import type { SPAPIGuild, SPAPIPartialGuild } from '@/types';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import {
	disableFeature,
	enableFeature,
	updateFeature,
} from '@/hooks/fetch';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

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

async function useAPI({
	endpoint,
	data,
	method,
	session,
}: {
	endpoint: string;
	data?: FormData;
	method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
	session: string | undefined;
}) {
	let options: RequestInit;

	console.log(data);
	if (data) {
		options = {
			method,
			body: JSON.stringify(data),
			headers: {
				Authorization: `Bearer ${session}`,
				'Content-Type': 'application/json',
			},
		};
	} else {
		options = {
			method,
			headers: {
				Authorization: `Bearer ${session}`,
			},
		};
	}

	console.log(options);



	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, options);

	if (res.status === 401) {
		await signOut();
		return null;
	}

	if (!res.ok) {
		const response = await res.json();
		throw new Error(`${response.message} (${response.statusCode})`);
	}

	return await res.json();
}

export function useGuilds() {
	const { session, status } = useAccessToken();

	return useQuery<SPAPIPartialGuild[]>({
		queryFn: async () => {
			return await useAPI({ endpoint: '/users/@me/guilds', method: 'GET', session });
		},
		queryKey: ['user_guilds'],
		enabled: status === 'authenticated',
	}, client);
}

export function useCurrentGuild() {
	const { session, status } = useAccessToken();
	const guildId = useGuildId();

	return useQuery<SPAPIGuild>({
		queryFn: async () => {
			return await useAPI({ endpoint: `/guilds/${guildId}`, method: 'GET', session }) as SPAPIGuild;
		},
		queryKey: ['specific_guild'],
		enabled: status === 'authenticated',
	}, client);
}

export function useFeature<T>(feature: string) {
	const { session, status } = useAccessToken();
	const guildId = useGuildId();

	return useQuery<T>({
		queryFn: async () => {
			return await useAPI({ endpoint: `/guilds/${guildId}/features/${feature}`, method: 'GET', session }) as T;
		},
		queryKey: ['feature_data'],
		enabled: status === 'authenticated',
	}, client);
}


type UpdateFeatureOptions = {
  guild: string;
  feature: keyof CustomFeatures;
  options: FormData | string;
};

export function useUpdateFeature() {
	const { session } = useAccessToken();
	const guildId = useGuildId();

	return useMutation({
		mutationFn: async ({ feature, data }: { feature: string; data: FormData; }) => {
			return await await useAPI({ endpoint: `/guilds/${guildId}/features/${feature}`, data, method: 'PATCH', session });
		},
		mutationKey: ['feature_update'],
	}, client);
}


export function useUpdateFeatureMutation() {
	const { session } = useAccessToken();

	return useMutation({
		mutationFn: async (options: UpdateFeatureOptions) => {
			return await updateFeature(options.guild, options.feature, options.options, session!);
		},
		onSuccess: (updated, options) => {
			const key = Keys.features(options.guild, options.feature);
			return client.setQueryData(key, updated);
		},
	}, client);
}

// export function updateFeatureData(feature: string, data: FormData) {
//	const { session, status } = useAccessToken();
//	const guildId = useGuildId();

//	return useQuery({
//		queryFn: async () => await updateFeature(guildId, feature, data, session!),
//		queryKey: ['feature_data'],
//		enabled: status === 'authenticated',
//	});
// }

export function useDev() {}

/** Gets the access token from the session. */
function useAccessToken() {
	const { data: session, status } = useSession();
	return { session: String(session?.accessToken), status };
}

const Keys = {
	login: ['login'],
	guild_info: (guild: string) => ['guild_info', guild],
	features: (guild: string, feature: string) => ['feature', guild, feature],
	guildRoles: (guild: string) => ['guild_roles', guild],
	guildChannels: (guild: string) => ['guild_channel', guild],
};


type EnableFeatureOptions = { guild: string; feature: string; enabled: boolean };
export function useEnableFeatureMutation() {
	const { session } = useAccessToken();

	return useMutation({
		mutationFn: async ({ enabled, guild, feature }: EnableFeatureOptions) => {
			if (enabled) return await enableFeature(guild, feature, session!);
			return await disableFeature(guild, feature, session!);
		},
		onSuccess: async (_, { guild, feature, enabled }) => {
			await client.invalidateQueries({ queryKey: Keys.features(guild, feature) });
			client.setQueryData<HVGuild | null>(Keys.guild_info(guild), (prev) => {
				if (prev === null) return null;

				if (enabled) return {
					...prev,
					enabledFeatures: prev?.enabledFeatures?.includes(feature)
						? prev.enabledFeatures
						: [...prev?.enabledFeatures as string[], feature],
				};

				else return {
					...prev,
					enabledFeatures: prev?.enabledFeatures?.filter((f) => f !== feature),
				};
			});
		},
	}, client);
}

export function useGuildId(): string {
	return usePathname().split('/')[3];
}