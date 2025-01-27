import { cn } from '@/utils';

export const FeatureCard = ({
	title,
	description,
	icon,
	index,
	additionalInfo,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
    additionalInfo?: string;
}) => {
	return (
		<div
			className={cn(
				'flex flex-col lg:border-r  py-10 relative group/feature border-neutral-800',
				(index === 0 || index === 4) && 'lg:border-l border-neutral-800',
				index < 4 && 'lg:border-b border-neutral-800',
			)}
		>
			{index < 4 && (
				<div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-800 to-transparent pointer-events-none" />
			)}
			{index >= 4 && (
				<div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-800 to-transparent pointer-events-none" />
			)}
			<div className="mb-4 relative z-10 px-10 text-neutral-400">
				{icon}
			</div>
			<div className="text-lg font-bold mb-2 relative z-10 px-10">
				<div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
				<span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-100">
					{title}
				</span>
			</div>
			<p className="text-sm text-neutral-300 max-w-xs relative z-10 px-10">
				{description}
			</p>
			<p className="text-sm text-neutral-400 max-w-xs z-10 px-10 mt-3">
				{additionalInfo}
			</p>
		</div>
	);
};