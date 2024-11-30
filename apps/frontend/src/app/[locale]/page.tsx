import { FAQ } from '@/components/homepage/home-faq';
import { DotBackground } from '@/components/ui/dotbackground';
import { Features, Footer, Hero, Navbar, SupportBanner } from '@components/homepage';

export default function Main() {
	return (
		<div className='bg-black w-full overflow-hidden font-sans font-semibold'>
			<div className='sm:px-16 px-6 flex justify-center items-center'>
				<div className='xl:max-w-[1920px] w-full'>
					<Navbar />
				</div>
			</div>
			<div className='flex items-start justify-center'>
				<div className='xl:m-20 w-full'>
					<Hero />
				</div>
			</div>
			<DotBackground>
				<div className='sm:px-16 px-6 flex justify-center items-start'>
					<div className='xl:max-w-[1280px] w-full'>
						<Features />
					</div>
				</div>
			</DotBackground>
			<div className='sm:px-16 px-6 flex justify-center items-start'>
				<div className='xl:max-w-[1280px] w-full'>
					<SupportBanner /> <Footer />
				</div>
			</div>
		</div>
	);
}