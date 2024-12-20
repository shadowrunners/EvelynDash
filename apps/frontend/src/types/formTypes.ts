import type { FieldValues, Path, UseControllerProps, FieldPathByValue } from 'react-hook-form';
import type { ReactElement, ReactNode } from 'react';
import { Props as SelectProps } from 'react-select';
import type { Override } from '@/types';

export type FormProps = {
    required?: boolean;
    error?: string;
    label?: string | ReactNode;
    description?: string | ReactNode;
    children: ReactNode;
};



/** The type used by the multi select menu component. */
export type SelectMenuOptionArray = {
    /** The label of the option. */
	label: string;
    /** The value of the option. */
	value: string;
}[];
