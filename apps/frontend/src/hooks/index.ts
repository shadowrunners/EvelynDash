import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import type { SPAPIGuild, SPAPIPartialGuild } from '@/types';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useRouter } from '@/i18n/routing';

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

/**
 * A universal function used across all hooks to fetch data from the API.
 * @param endpoint The API endpoint that the feature will hit to get the feature specific data.
 * @param data The data that will be sent to the API to update feature data. (optional; used only for updating feature data)
 * @param method The method used to hit the API.
 * @param session The user's access token for API authentication purposes.
 */
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

	if (data) {
		options = {
			method,
			body: JSON.stringify(data),
			headers: {
				Authorization: `Bearer ${session}`,
			},
		};
	}
	else {
		options = {
			method,
			headers: {
				Authorization: `Bearer ${session}`,
			},
		};
	}

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

/** Retrieves the list of guilds where the user is administrator. */
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

/** Retrieves data about the guild that the user is currently configuring. */
export function useCurrentGuild() {
	const { session, status } = useAccessToken();
	const guildId = useGuildId();

	return useQuery<SPAPIGuild>({
		queryFn: async () => {
			return await useAPI({ endpoint: `/guilds/${guildId}`, method: 'GET', session }) as SPAPIGuild;
		},
		queryKey: ['current_guild'],
		enabled: status === 'authenticated',
	}, client);
}

/** Retrieves feature related data for the currently selected guild. */
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

/** Updates feature related data for the currently selected guild. */
export function useUpdateFeature() {
	const { session } = useAccessToken();
	const guildId = useGuildId();

	return useMutation({
		mutationFn: async ({ feature, data }: { feature: string; data: FormData; }) => {
			return await useAPI({ endpoint: `/guilds/${guildId}/features/${feature}`, data, method: 'PATCH', session });
		},
		mutationKey: ['feature_update'],
	}, client);
}

/** Disables the feature for the currently selected guild. */
export function useDisableFeature() {
	const { session } = useAccessToken();
	const guildId = useGuildId();
	const router = useRouter();

	return useMutation({
		mutationFn: async ({ feature }: { feature: string }) => {
			return await useAPI({ endpoint: `/guilds/${guildId}/features/${feature}`, method: 'DELETE', session });
		},
		onSuccess: () => {
			// sending the user back because the api literally has zero data
			router.back();
		},
		mutationKey: ['feature_delete'],
	}, client);
}

/** Enables the feature for the currently selected guild. */
export function useEnableFeature() {
	const { session } = useAccessToken();
	const guildId = useGuildId();

	return useMutation({
		mutationFn: async ({ feature }: { feature: string }) => {
			return await useAPI({ endpoint: `/guilds/${guildId}/features/${feature}`, method: 'POST', session });
		},
	}, client);
}

// TODO: implement this
// eslint-disable-next-line no-empty-function
export function useDev() {}

/** Gets the access token from the session. */
function useAccessToken() {
	const { data: session, status } = useSession();
	return { session: String(session?.accessToken), status };
}

export function useGuildId(): string {
	return usePathname().split('/')[3];
}