'use client';

export default function FeatureHeader({ name, description }: { name: string; description: string; }) {
	return (
		<header className="bg-primary p-4 rounded-xl mt-2">
			<h1 className="text-xl font-semibold">{name}</h1>
			<p className="text-dimWhite">{description}</p>
		</header>
	);
}