'use client';

import { Savebar } from '@/components/panels/UpdateFeaturePanel';
import { Button, Card, CardContent, Form, FormControl, FormField, FormItem } from '@/components/ui';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FeatureHeader } from '@/components/ui/featureheader';
import { Switch } from '@/components/ui/switch';
import { useFeature, useUpdateFeatureMutation } from '@/hooks';
import type { AutoModFeature } from '@Features';
import type { UseFormRender } from '@Types';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { ReactElement, JSXElementConstructor } from 'react';
import { ControllerFieldState, ControllerRenderProps, UseFormStateReturn, useForm } from 'react-hook-form';
import { GoMention } from "react-icons/go";
import { z } from 'zod';

const AutoModSchema = z.object({
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
})

export default function AutoMod() {
    const { data } = useFeature<AutoModFeature>('automod');
    const form = useForm<AutoModFeature>({
        defaultValues: {
            mentionspam: {
                enabled: false,
            }
        },
    })

	const submitData = (data) => {
		console.log(data)
	}
    
    const t = useTranslations('dash');

    console.log(data)

    return (
       <Form {...form}>
			<form>
				 <div className='flex-col'>
            		<FeatureHeader name={t('features.automod.title')} description={t('features.automod.description')}  />
						<Card className='bg-secondary text-white border'>
							<CardContent className='flex flex-gap gap-3 mt-5'>
								<div className='flex rounded-xl w-[50px] h-[50px] text-3xl bg-primary border justify-center items-center'>
									<GoMention />
								</div>
								<div className="flex flex-grow justify-between items-center">
									<p className="font-semibold text-base md:text-lg">
										Mention Spam
									</p>

								<FormField
									control={form.control}
									name="mentionspam.enabled"
									render={({ field }) => {
										console.log(field)
										return (
											<FormItem>
												<FormControl>
													<Switch checked={field.value} onCheckedChange={field.onChange} />
												</FormControl>
											</FormItem>
										)
									}}
								/>
						</div>
					</CardContent>
				</Card>
				<Card className='bg-secondary text-white border'>
					<CardContent className='flex flex-gap gap-3 mt-5'>
						<div className='flex rounded-xl w-[50px] h-[50px] text-3xl bg-primary border justify-center items-center'>
							<GoMention />
						</div>
						<div className="flex flex-grow justify-between items-center">
							<p className="font-semibold text-base md:text-lg">
								Profanity
							</p>

							<FormField
									control={form.control}
									name="profanity.enabled"
									render={({ field }) => {
										console.log(field)
										return (
											<FormItem>
												<FormControl>
													<Switch checked={field.value} onCheckedChange={field.onChange} />
												</FormControl>
											</FormItem>
										)
									}}
								/>
						</div>
					</CardContent>
				</Card>
				<Card className='bg-secondary text-white border'>
					<CardContent className='flex flex-gap gap-3 mt-5'>
						<div className='flex rounded-xl w-[50px] h-[50px] text-3xl bg-primary border justify-center items-center'>
							<GoMention />
						</div>
						<div className="flex flex-grow justify-between items-center">
							<p className="font-semibold text-base md:text-lg">
								Sexual Content
							</p>

							<Switch />
						</div>
					</CardContent>
				</Card>
				<Card className='bg-secondary text-white border'>
					<CardContent className='flex flex-gap gap-3 mt-5'>
						<div className='flex rounded-xl w-[50px] h-[50px] text-3xl bg-primary border justify-center items-center'>
							<GoMention />
						</div>
						<div className="flex flex-grow justify-between items-center">
							<p className="font-semibold text-base md:text-lg">
								Spam
							</p>

							<Switch />
						</div>
					</CardContent>
				</Card>
				<Card className='bg-secondary text-white border'>
					<CardContent className='flex flex-gap gap-3 mt-5'>
						<div className='flex rounded-xl w-[50px] h-[50px] text-3xl bg-primary border justify-center items-center'>
							<GoMention />
						</div>
						<div className="flex flex-grow justify-between items-center">
							<h1 className="font-semibold text-base md:text-lg">
								Custom Keyword
							</h1>
							
							<Switch />
						</div>
						
					</CardContent>
				</Card>
				<Card className='bg-secondary text-white border'>
					<CardContent className='flex flex-gap gap-3 mt-5'>
						<div className='flex rounded-xl w-[50px] h-[50px] text-3xl bg-primary border justify-center items-center'>
							<GoMention />
						</div>
						<div className="flex flex-grow justify-between items-center">
							<p className="font-semibold text-base md:text-lg">
								Mention Spam
							</p>

							<Switch />
						</div>
					</CardContent>
				</Card>
				<Card className='bg-secondary text-white border'>
					<CardContent className='flex flex-gap gap-3 mt-5'>
						<div className='flex rounded-xl w-[50px] h-[50px] text-3xl bg-primary border justify-center items-center'>
							<GoMention />
						</div>
						<div className="flex flex-grow justify-between items-center">
							<p className="font-semibold text-base md:text-lg">
								Mention Spam
							</p>

							<Switch />
						</div>
					</CardContent>
				</Card>
				<Card className='bg-secondary text-white border'>
					<CardContent className='flex flex-gap gap-3 mt-5'>
						<div className='flex rounded-xl w-[50px] h-[50px] text-3xl bg-primary border justify-center items-center'>
							<GoMention />
						</div>
						<div className="flex flex-grow justify-between items-center">
							<p className="font-semibold text-base md:text-lg">
								Mention Spam
							</p>

							<Switch />
						</div>
					</CardContent>
				</Card>
				<Card className='bg-secondary text-white border'>
					<CardContent className='flex flex-gap gap-3 mt-5'>
						<div className='flex rounded-xl w-[50px] h-[50px] text-3xl bg-primary border justify-center items-center'>
							<GoMention />
						</div>
						<div className="flex flex-grow justify-between items-center">
							<p className="font-semibold text-base md:text-lg">
								Mention Spam
							</p>

							<Switch />
						</div>
					</CardContent>
				</Card>

				<Savebar canSave={form.formState.isDirty} reset={form.reset} onSubmit={() => form.handleSubmit(submitData)} />
			</div>
			</form>
	   </Form>
    )
}