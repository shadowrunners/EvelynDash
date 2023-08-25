import { CustomFeatures, FeatureConfig } from '@/config/types';
import { features } from '@/config/features';

export type IdFeature<K extends keyof CustomFeatures = keyof CustomFeatures> = FeatureConfig<K> & {
  id: K;
};

export function getFeatures() {
	return Object.entries(features).map(([k, v]) => {
		return {
			id: k,
			...v,
		};
	});
}

export function toRGB(num: number) {
	num >>>= 0;
	const b = num & 0xff,
		g = (num & 0xff00) >>> 8,
		r = (num & 0xff0000) >>> 16;
	return 'rgb(' + [r, g, b].join(',') + ')';
}
