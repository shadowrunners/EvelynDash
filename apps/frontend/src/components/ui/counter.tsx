import React, { useState } from 'react';
import { Button } from './button';
import { Input } from './input';

// this is the most duct taped component I've ever written
// but if it works, it works 🤷‍♂️
const CounterComponent: React.FC<{ value?: number, onChange: (val: number) => void }> = ({ value, onChange }) => {
	const [count, setCount] = useState(value !== undefined ? value : 0);

	console.log(value);

	const increaseCounter = () => {
		if (count < 100) {
			setCount((prevCount) => {
				const newVal = prevCount + 1;
				onChange(newVal);
				setCount(newVal);
				return newVal;
			});
		}
	};

	const decreaseCounter = () => {
		if (count > 0) {
			setCount((prevCount) => {
				const newVal = prevCount - 1;
				onChange(newVal);
				setCount(newVal);
				return newVal;
			});
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = parseInt(e.target.value);
		if (val > 100) e.target.value = '100';

		setCount(val);
		onChange(count);
	};

	return (
		<div
			className='flex items-center justify-between p-2 border rounded-2xl mt-2 w-[150px]'
		>
			<Button className='bg-gray-900' onClick={decreaseCounter}>
				-
			</Button>
			<Input
				type='number'
				className='w-[90%] bg-transparent text-center outline-none border-none'
				value={count}
				onKeyDown={(event) => {
					if (!(event.key === 'Backspace' || /[0-9]/.test(event.key))) {
						event.preventDefault();
					}
				}}
				maxLength={3}
				onChange={(e) => handleChange(e)}
			/>
			<Button className='bg-gray-900' onClick={increaseCounter}>
				+
			</Button>
		</div>
	);
};

export default CounterComponent;