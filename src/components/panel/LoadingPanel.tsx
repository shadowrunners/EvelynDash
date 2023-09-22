import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function LoadingPanel() {
	const t = useTranslations();

	return (
		<div className='flex items-center justify-center flex-col card-background w-full h-full'>
			<div className='flex items-center flex-col gap-2.5'>
				<Loader2 className='animate-spin w-[45px] h-[45px]' />
				<h1>{t('loading')}</h1>
			</div>
		</div>
	);
}
