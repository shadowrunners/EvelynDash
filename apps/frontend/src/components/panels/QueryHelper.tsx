import { QueryStatus } from '@tanstack/react-query';
import { Fragment, ReactNode } from 'react';

import { Loader } from '../ui/loading';
import { Error } from '../ui/error';

export const QueryStatusHelper = ({
	status,
	error,
	refetch,
	children,
}: {
	status: QueryStatus;
	refetch: () => void;
	error: string | undefined;
	children: ReactNode;
}) => {
	switch (status) {
		case 'error': {
			return (
				<Error errorMessage={error} refetch={refetch} />
			)
		}
		case 'pending': {
			return (
				<Loader />
			);
		}
		case 'success': {
			return (
				<Fragment>{children}</Fragment>
			)
		}
		default: {
			return (
				<></>
			);
		}
	}
};
