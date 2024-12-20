'use client';

import { DiscordMessages, DiscordMessage, DiscordEmbed, DiscordEmbedDescription, DiscordEmbedFooter } from '@skyra/discord-components-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Popover, PopoverContent, PopoverTrigger, Textarea } from '@UI';
import { HexColorPicker } from 'react-colorful';
import { FormParams } from '@/types';

export function EmbedForm({
	form,
	formLabel,
}: FormParams) {
	const values = form.watch('embed');

	return (
		<Form {...form}>
			<form className='flex gap-4 bg-primary p-4 mt-2 rounded-xl'>
				<div className='flex-1'>
					<h1 className='text-xl font-semibold mb-2'>{formLabel}</h1>
					<FormField
						control={form.control}
						name="embed.title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Title
								</FormLabel>
								<FormControl>
									<Input
										className='text-white mb-3'
										value={values.title}
										onChange={field.onChange}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="embed.description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Description
								</FormLabel>
								<FormControl>
									<Textarea
										className='text-white mb-3'
										maxLength={2048}
										value={values.description}
										onChange={field.onChange}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="embed.thumbnail"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Thumbnail
								</FormLabel>
								<FormControl>
									<Input
										className='text-white mb-3'
										value={values.thumbnail}
										onChange={field.onChange}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="embed.image"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Image
								</FormLabel>
								<FormControl>
									<Input
										className='text-white mb-3'
										value={values.image}
										onChange={field.onChange}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="embed.footer.text"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Footer Text
								</FormLabel>
								<FormControl>
									<Input
										className='text-white mb-3'
										value={values.footer.text}
										onChange={field.onChange}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="embed.footer.iconURL"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Footer Icon
								</FormLabel>
								<FormControl>
									<Input
										className='text-white mb-3'
										value={values.footer.iconURL}
										onChange={field.onChange}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="embed.color"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Color
								</FormLabel>
								<FormControl>
									<Popover>
										<div className='flex flex-col width-[100%] relative shadow text-white'>
											<PopoverTrigger>
												<Input
													className='text-white'
													autoComplete="off"
													placeholder={field.value ?? 'Select a color'}
													{...field}
												/>
											</PopoverTrigger>

											<PopoverContent className='bg-secondary'>
												<HexColorPicker {...field} />
											</PopoverContent>
										</div>
									</Popover>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='flex-1 mr-4 mt-2'>
					<h1 className='text-xl font-semibold mb-2'>Embed Preview</h1>
					<DiscordMessages className="rounded-xl grow-0 w-full bg-secondary">
						<DiscordMessage
							author="Evelyn"
							avatar="https://cdn.discordapp.com/avatars/274973338676494347/00dcf84af54a0a58d2394b4054e0f7f5.png?size=100"
							className='bg-secondary'
						>
							{values.content}
							<DiscordEmbed
								slot='embeds'
								color={values.color}
								embedTitle={values.title}
								image={values.image}
								thumbnail={values.thumbnail}
							>
								<DiscordEmbedDescription slot='description'>
									{values.description}
								</DiscordEmbedDescription>
								<DiscordEmbedFooter
									slot='footer'
									footerImage={values.footer.iconURL}
								>
									{values.footer.text}
								</DiscordEmbedFooter>
							</DiscordEmbed>
						</DiscordMessage>
					</DiscordMessages>
				</div>
			</form>
		</Form>
	);
}