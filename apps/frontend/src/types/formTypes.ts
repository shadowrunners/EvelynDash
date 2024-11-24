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

type SubmitFn<T> = (data: FormData | string) => Promise<T>;

export type UseFormRender<T = unknown> = (data: T, onSubmit: SubmitFn<T>) => UseFormRenderResult;

export type UseFormRenderResult = {
    /** Indicates if the current change(s) can be saved. */
    canSave?: boolean;
    /** The function that is called upon submitting. */
    onSubmit: () => void;
    /** The function that resets the current value. */
    reset?: () => void;

    component: ReactElement;
};

type ControlledInputProps<
    T,
    TFieldValue extends FieldValues,
    TName extends Path<TFieldValue>
> = Override<
    T,
    {
        control: Omit<FormProps, 'error' | 'children'>;
        controller: UseControllerProps<TFieldValue, TName>;
        showHeader?: boolean;
    }
>;

export type ControlledInput<Props, V = unknown> = <
    TFieldValues extends FieldValues,
    TName extends FieldPathByValue<TFieldValues, V>
>(
    props: ControlledInputProps<Props, TFieldValues, TName>,
) => ReactElement;

export type SelectMenuProps = Override<
  SelectProps<never, false>,
  {
    value?: string;
    onChange: (v: string | string[]) => void;
    showHeader?: boolean;
  }
>;

/** The type used by the multi select menu component. */
export type SelectMenuOptionArray = {
    /** The label of the option. */
	label: string;
    /** The value of the option. */
	value: string;
}[];
