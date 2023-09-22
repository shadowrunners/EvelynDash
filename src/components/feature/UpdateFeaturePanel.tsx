'use client';

import { FeatureConfig, UseFormRenderResult, CustomFeatures } from '@/config/types';
import { useEnableFeatureMutation, useUpdateFeatureMutation } from '@/api/hooks';
import { RiErrorWarningFill as WarningIcon } from 'react-icons/ri';
import { IoSave } from 'react-icons/io5';
import { Button, Spacer } from '@/components/ui';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function UpdateFeaturePanel({
	guild,
	featureId,
	feature,
	config,
}: {
  guild: string,
  featureId: keyof CustomFeatures,
  feature: CustomFeatures[keyof CustomFeatures];
  config: FeatureConfig<keyof CustomFeatures>;
}) {
	console.log(`Feature: ${feature}, Config: ${config}`);
	const mutation = useUpdateFeatureMutation();
	const enableMutation = useEnableFeatureMutation();
	const result = config.useRender(feature, async (data) => {
		return await mutation.mutateAsync({
			guild,
			feature: featureId,
			options: data,
		});
	});
	const t = useTranslations('dash');

	const onDisable = () => {
		enableMutation.mutate({ enabled: false, guild, feature: featureId });
	};

	return (
		<div className='flex flex-col gap-5 w-full h-full mt-5 text-white'>
			<div className='flex flex-col md:flex-row mx-3 sm:mx-5 justify-between'>
				<div>
					<h2 className='text-2xl font-semibold'>
						{config.name}
					</h2>
					<p className='text-dimWhite'>{config.description}</p>
				</div>
				<div className='inline-flex mt-3'>
					<Button variant="destructive" onClick={onDisable}>
						{t('button.disablefeature')}
					</Button>
				</div>
			</div>

			{result.component}
			<Savebar isLoading={mutation.isLoading} result={result} />
		</div>
	);
}

function Savebar({
	result: { canSave, onSubmit, reset },
	isLoading,
}: {
  result: UseFormRenderResult;
  isLoading: boolean;
}) {
	const t = useTranslations();
	const t2 = useTranslations('dash');

	const variants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<motion.div
			initial='hidden'
			animate={canSave ? 'visible' : 'hidden'}
			exit='hidden'
			variants={variants}
			className='flex card-background rounded-3xl sticky bottom-2 md:bottom-10 w-full p-1 md:p-[15px] shadow-normal items-center flex-col md:flex-row gap-1 md:gap-2 mt-auto'
		>
			<WarningIcon className='hidden sm:block w-[30px] h-[30px]' />
			<h1 className="font-semibold text-md md:text-lg">{t('unsaved')}</h1>
			<Spacer />
			<div className='inline-flex'>
				<Button
					className='rounded-full'
					type="submit"
					variant="default"
					onClick={onSubmit}
				>
					<IoSave className='mr-1' />
					{t2('button.save')}
				</Button>
				<Button className='rounded-full' onClick={reset}>
					{t2('button.discard')}
				</Button>
			</div>
		</motion.div>
	);
}
