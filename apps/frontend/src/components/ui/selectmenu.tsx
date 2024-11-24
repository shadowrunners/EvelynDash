'use client';


import Select, { Props } from 'react-select';
import { cn } from '@/utils';
import { forwardRef } from 'react';

const multiValueStyles =
    'mt-0.5 ml-1 mb-0.5 bg-background border border-gray-800 rounded items-center py-0.5 pl-2 pr-1 gap-1.5 bg-transparent';
const multiValueLabelStyles = 'font-poppins text-white';
const multiValueRemoveStyles =
    'border border-gray-800 text-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md bg-transparent';
const indicatorsContainerStyles = 'p-1 gap-1 rounded-lg';
const clearIndicatorStyles = 'text-gray-500 p-1 rounded-md hover:text-red-800';
const indicatorSeparatorStyles = 'bg-mutated';

interface SelectComponentProps extends Props {
    value?: unknown;
    isMulti?: boolean;
    isDisabled?: boolean;
    isLoading?: boolean;
    placeholder?: string;
}

export const SelectMenu = forwardRef<never, SelectComponentProps>(
	({ options, value, onChange, isDisabled, isLoading, placeholder, ...props }, ref) => {
		return (
			<Select
				ref={ref}
				unstyled={true}
				isSearchable={true}
				value={value}
				isDisabled={isDisabled}
				isMulti={true}
				isLoading={isLoading}
				isClearable={true}
				placeholder={placeholder}
				options={options}
				noOptionsMessage={() => 'No options available.'}
				onChange={onChange}
				classNames={{
					control: ({ isFocused }) =>
						cn(
							'rounded-md border',
							'border-input py-1 text-sm',
							isFocused ? 'ring-1 ring-ring' : '',
						),
					placeholder: () => cn('text-muted-foreground text-sm ml-1'),
					input: () => cn(
						'text-sm overflow-x-hidden text-white ml-1',
					),
					option: () =>
						cn(
							'cursor-pointer w-full hover:bg-gray-200 hover:text-black font-poppins max-w-[515px]',
							'select-none items-center rounded-sm py-1.5 pl-2 pr-8 m-1 text-sm outline-none',
						),
					menu: () =>
						cn(
							'relative z-50 top-0 mt-1 text-sm w-full bg-primary',
							'rounded-md border shadow-md overflow-x-hidden',
						),
					valueContainer: () => cn('text-foreground text-white text-sm ml-3 font-poppins'),
					multiValue: () => multiValueStyles,
					multiValueLabel: () => multiValueLabelStyles,
					multiValueRemove: () => multiValueRemoveStyles,
					indicatorsContainer: () => indicatorsContainerStyles,
					clearIndicator: () => clearIndicatorStyles,
					indicatorSeparator: () => indicatorSeparatorStyles,
					dropdownIndicator: () => cn('text-white hover:text-dimWhite'),
					noOptionsMessage: () => cn('m-2'),
				}}
				className='bg-transparent z-auto'
				{...props}
			/>
		);
	},
);