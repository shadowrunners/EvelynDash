import {
	Control,
	UseControllerProps,
	useFieldArray,
} from 'react-hook-form';
import {
	Button,
	Spacer,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '.';
import {
	RoleSelectForm,
	NumericTextForm,
} from '../forms';
import { MdOutlineRemoveCircleOutline } from 'react-icons/md';
import { LevellingFeature } from '@/types/features';

type LevelTableArgs = {
	control: Control<LevellingFeature, unknown, LevellingFeature>;
	controller: UseControllerProps<LevellingFeature, 'roleRewards'>;
};

export const LevelTable = ({
	control,
	...props
}: LevelTableArgs) => {
	const { fields, append, remove } = useFieldArray({
		control: control,
		name: 'roleRewards',
	});

	return (
		<div className={`bg-secondary rounded-3xl p-5 ${props}`}>
			<section>
				<label className="block text-start mr-3 transition-all duration-300 opacity-100 text-base font-medium mb-0">
					<h2 className="text-2xl font-semibold">Role Rewards</h2>
					<p className="text-gray-500 mb-3">Control what roles are rewarded at the levels you desire.</p>
				</label>
				<Spacer />
			</section>

			<Table className='border rounded-3xl'>
				<TableHeader>
					<TableRow>
						<TableHead className='text-white px-4'>Level</TableHead>
						<TableHead className='text-white'>Role</TableHead>
						<TableHead className='text-white'>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{fields.map((_field, index) => (
						<TableRow>
							<TableCell className='min-w-[200px]'>
								<NumericTextForm
									control={{ label: '', description: '' }}
									controller={{ control, name: `roleRewards.${index}.level` }}
									className='p-3'
								/>
							</TableCell>
							<TableCell className='min-w-[200px]'>
								<RoleSelectForm
									control={{ label: '', description: '' }}
									controller={{ control, name: `roleRewards.${index}.roleId` }} />
							</TableCell>
							<TableCell>
								<Button className='hover:bg-white hover:text-black' onClick={() => remove(index)}>
									<MdOutlineRemoveCircleOutline className='mr-1 hover:text-black' /> Remove Reward
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<Button className="relative bottom-0 left-0 mt-2" onClick={() => append({ 'level': 0, 'roleId': '' })}>
				Create Reward
			</Button>
		</div>
	);
};