import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from './breadcrumb';
import { useGuild } from '../contexts/guildcontext';
import { usePathname } from '@/i18n/routing';
import { Fragment } from 'react';

export function DynamicBreadcrumb() {
	const guild = useGuild();

	const pathname = usePathname();
	const breadcrumbs = [
		{ href: '/', label: 'Home' },
		{ href: `/guilds/${guild?.data.id}`, label: guild?.data.name },
	];

	const isFeaturePage = pathname.split('/').includes('features');
	const featureName = isFeaturePage ? pathname.split('/').pop() : null;

	if (isFeaturePage && featureName) {
		breadcrumbs.push({ href: pathname, label: featureName });
	}

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{breadcrumbs.map((crumb, i) => (
					<Fragment key={crumb.label}>
						<BreadcrumbItem className="font-sans text-dimWhite text-base capitalize">
							<BreadcrumbLink href={crumb.href}>
								{crumb.label}
							</BreadcrumbLink>
						</BreadcrumbItem>
						{i < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
					</Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}