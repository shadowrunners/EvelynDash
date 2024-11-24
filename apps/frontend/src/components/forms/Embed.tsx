'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { DiscordMessages, DiscordMessage, DiscordEmbed, DiscordEmbedDescription, DiscordEmbedFooter } from '@skyra/discord-components-react';
import { UseFormRegister, Control } from 'react-hook-form';
import { SmallColorPickerForm } from '@/components/forms';
import type { CustomFeatures } from '@/types/features';
import { Input, Textarea } from '@UI';
import { Fragment } from 'react';

interface IEmbed<T extends CustomFeatures> {
	fullData: any;
	register: UseFormRegister<T>;
	control: Control<T>;
}

interface IEmbedData {
		/** The content of the message. */
		content: string;
		/** The embed's color. */
		color: string;
		/** The embed's title. */
		title: string;
		/** The embed's author object. */
		author: {
			/** The embed's author name. */
			name: string;
			/** The embed's author icon. */
			iconURL: string;
		};
		/** The embed's description. */
		description: string;
		/** The embed's thumbnail. */
		thumbnail: string;
		/** The embed's image. */
		image: string;
		/** The embed's footer object. */
		footer: {
			/** The embed's footer text. */
			text: string;
			/** The embed's footer icon. */
			iconURL: string;
		}
}

export const Embed = ({ fullData, register, control }: IEmbed<any>) => {
	const embed = fullData.embed as IEmbedData;
	return (
		<Fragment>
			<div className='flex-1 bg-secondary p-5 rounded-3xl'>
				<h1 className='text-xl font-semibold mb-2'>
					Embed Settings
				</h1>

				<h1 className='mt-2 ml-1 mb-1 font-semibold'>Author Name</h1>
				<Input
					className="mb-3 text-white"
					{...register('embed.author.name')}
				/>

				<h1 className='ml-1 mb-1 font-semibold'>Author Icon</h1>
				<Input
					className="mb-3 text-white"
					{...register('embed.author.iconURL')}
				/>

				<h1 className='ml-1 mb-2 font-semibold'>Title</h1>
				<Input
					className='text-white mb-3'
					{...register('embed.title')}
				/>

				<h1 className='ml-1 font-semibold'>Description</h1>
				<Textarea
					className='mb-3 mt-2 text-white'
					maxLength={2048}
					{...register('embed.description')}
				/>

				<h1 className='ml-1 mb-2 font-semibold'>Thumbnail</h1>
				<Input
					className='mb-3 text-white'
					{...register('embed.thumbnail')}
				/>

				<h1 className='ml-1 mb-2 font-semibold'>Image</h1>
				<Input
					className='mb-3 text-white'
					{...register('embed.image')}
				/>

				<h1 className='ml-1 mb-2 font-semibold'>Footer Text</h1>
				<Input
					className='mb-3 text-white'
					{...register('embed.footer.text')}
				/>

				<h1 className='ml-1 mb-2 font-semibold'>Footer Icon</h1>
				<Input
					className='mb-3 text-white'
					{...register('embed.footer.iconURL')}
				/>

				<h1 className='ml-1 mb-2 font-semibold'>Color</h1>
				<SmallColorPickerForm
					control={{
						label: 'Color',
					}}
					controller={{
						control, name: 'embed.color',
					}}
				/>
			</div>

			<div className='flex-1 mr-4 mt-2'>
				<h1 className='text-xl font-semibold mb-2'>Embed Preview</h1>
				<DiscordMessages className="rounded-xl grow-0 w-full">
					<DiscordMessage
						author="Evelyn"
						avatar="https://cdn.discordapp.com/avatars/274973338676494347/00dcf84af54a0a58d2394b4054e0f7f5.png?size=100"
						className='bg-secondary'
					>
						<DiscordMessage>
							{embed?.content}
						</DiscordMessage>
						<DiscordEmbed
							slot='embeds'
							authorName={embed?.author?.name}
							authorImage={embed?.author?.iconURL}
							color={embed?.color}
							embedTitle={embed?.title}
							image={embed?.image}
							thumbnail={embed?.thumbnail}
						>
							<DiscordEmbedDescription slot='description'>
								{embed?.description}
							</DiscordEmbedDescription>
							<DiscordEmbedFooter
								slot='footer'
								footerImage={embed?.footer?.iconURL}
							>
								{embed?.footer?.text}
							</DiscordEmbedFooter>
						</DiscordEmbed>
					</DiscordMessage>
				</DiscordMessages>
			</div>
		</Fragment>
	);
};