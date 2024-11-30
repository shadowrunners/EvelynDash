import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function PrivacyPage() {
	const t = useTranslations('privacy');

	return (
		<div className='flex justify-center items-start text-white mt-4'>
			<div className="xl:max-w-[1280px] w-full">
				<section className='flex md:flex-row flex-col'>
					<div className="flex-1 flex justify-center items-start xl:mb-[80px] flex-col xl:px-0 sm:px-16 px-6 relative">
						<div className='h-[20rem] w-full bg-black bg-grid-small-white/[0.2] relative flex items-center justify-center'>
							<div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
							<h1 className="font-sans font-semibold text-4xl sm:text-7xl text-center relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
								{t('header.title')}
							</h1>
						</div>

						<p className="text-dimWhite font-normal font-sans text-[18px] leading-[30.8px]">
							{t('header.description')} <br />
							{t('header.last_updated')}
						</p>

						<h4 className='mt-7 xl:mt-2 text-left text-lg text-[18px] font-bold'>
							{t('section1.header')}
						</h4>
						<h4 className='mt-7 xl:mt-2 text-left text-lg text-[18px] font-bold'>
							{t('section1.subsection1.title')}
						</h4>
						<p>
							{t('section1.subsection1.content_1')} <br />
							{t('section1.subsection1.content_2')} <br />
							{t('section1.subsection1.content_3')}
						</p>
						<h4 className='mt-7 xl:mt-2 text-left text-lg text-[18px] font-bold'>
							{t('section1.subsection2.title')}
						</h4>
						<p>
							{t('section1.subsection2.content_1')} <br />
							{t('section1.subsection2.content_2')} <br />
						</p>
						<h4 className='mt-7 xl:mt-2 text-left text-lg text-[18px] font-bold'>
							{t('section1.subsection3.title')}
						</h4>
						<p>
							{t('section1.subsection3.content_1')} <br />
							{t('section1.subsection3.content_2')} <br />
						</p>

						<h4 className='mt-7 xl:mt-2 text-left text-lg text-[18px] font-bold'>
							{t('section2.header')}
						</h4>
						<p>
							{t('section2.content_1')} <br />
							{t('section2.content_2')} <br />
							{t('section2.content_3')} <br />
							{t('section2.content_4')} <br />
							<br />
							{t('section2.content_5')}
						</p>

						<h4 className='mt-7 xl:mt-2 text-left text-lg text-[18px] font-bold'>
							{t('section3.header')}
						</h4>
						<p>
							{t('section3.content_1')} <br />
							<br />
							{t('section3.content_2')} <br />
							<br />
							{t('section3.content_3')} <br />
						</p>

						<h4 className='mt-7 xl:mt-2 text-left text-lg text-[18px] font-bold'>
							{t('section4.header')}
						</h4>
						<p>
							{t('section4.content_1')} <br />
							{t('section4.content_2')} <Link href={`${t('section4.content_2_link')}`} className='hover:text-dimWhite cursor-pointer'>{t('section4.content_2_link')}</Link>. <br />
							{t('section4.content_3')} <br />
							{t('section4.content_4')} <Link href={`${t('section4.content_4_link')}`} className='hover:text-dimWhite cursor-pointer'>{t('section4.content_4_link')}</Link>. <br />
						</p>

						<h4 className='mt-7 xl:mt-2 text-left text-lg text-[18px] font-bold'>
							{t('section5.header')}
						</h4>
						<p>
							{t('section5.content_1')} <br />
							{t('section5.content_2')} <br />
							{t('section5.content_3')} <br />
							{t('section5.content_4')} <br />
							{t('section5.content_5')} <br />
							<br />
							{t('section5.content_6')} <br />
						</p>

						<h4 className='mt-7 xl:mt-2 text-left text-lg text-[18px] font-bold'>
							{t('section6.header')}
						</h4>
						<p>
							{t('section6.content_1')} <Link href={`${t('section6.content_1_link')}`} className='hover:text-dimWhite cursor-pointer'>{t('section6.content_1_link')}</Link>. <br />
							<br />
							{t('section6.content_2')} <br />
							<br />
							{t('section6.content_3')}
						</p>

						<p className='mt-7 xl:mt-2 text-left text-lg text-[18px] font-bold'>
							{t('agreement')}
						</p>
					</div>
				</section>
			</div>
		</div>
	);
};
