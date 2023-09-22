'use client';
import { FaDiscord } from 'react-icons/fa';
import { signIn, useSession } from 'next-auth/react';
import { Button } from '@/components/ui';
import { useTranslations } from 'next-intl';
import { RedirectType, redirect } from 'next/navigation';

export default function SignIn() {
	const { data: session } = useSession();
	if (session) return redirect('/dash/home', RedirectType.replace);

	return <LoginPage />;
}

function LoginPage() {
	const t = useTranslations('auth');

	return (
		<section id='signin' className='flex md:flex-row flex-col h-screen text-center bg-black text-white'>
			<div
				className='flex-1 flex justify-center flex-col relative text-center'
			>
				<h1
					className={'font-poppins font-semibold text-[50px]'}
				>
					{t('login_header')} <span className='text-gradient'>{t('login_header2')}</span>.
				</h1>
				<div>
					<Button
						size='lg'
						variant='outline'
						className='mt-2'
						onClick={() => signIn('discord', {
							redirect: true,
						})}
					>
						<a href='' />
						<FaDiscord className='mr-3' />
						{t('login_btn')}
					</Button>
					<p
						className='font-poppins font-normal text-dimWhite text-[15px] leading-[30.8px] mt-2'
					>
						{t('login_punchline')} <span className='text-gradient'>{t('login_punchline2')}</span>.
					</p>
				</div>
			</div>
		</section>
	);
}
