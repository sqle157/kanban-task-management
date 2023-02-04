import { CSSProperties } from 'react';
// Interface
import { IColumn } from '../../shared/types/interfaces';
// Component
import TaskCard from './TaskCard';

function generateRandomLightColor() {
	return `hsl(${Math.random() * 360}, 100%, 75%)`;
}

function Column({ column }: { column: IColumn }) {
	return (
		<div>
			<div className='mb-6 flex items-center gap-3'>
				<span
					className='inline-block h-[0.9735rem] w-[0.9375rem] rounded-full bg-[var(--randomBg)]'
					style={{ '--randomBg': generateRandomLightColor() } as CSSProperties}
				/>
				<h2 className='text-xs uppercase leading-[.9375rem] tracking-[.15rem] text-[#828FA3]'>
					{column.name} ({column.tasks?.length})
				</h2>
			</div>
			{column.tasks.map((task) => (
				<TaskCard key={task._id} task={task} />
			))}
		</div>
	);
}
export default Column;
