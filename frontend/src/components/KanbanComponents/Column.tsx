import { CSSProperties } from 'react';
// Interface
import { ColumnProps } from '../../shared/types/interfaces';
// Component
import TaskCard from './TaskCard';

function generateRandomLightColor() {
	return 'hsl(' + Math.random() * 360 + ', 100%, 75%)';
}

const Column = ({ column }: ColumnProps) => {
	return (
		<div>
			<div className='mb-6 flex items-center gap-3'>
				<span
					className={`inline-block w-[0.9375rem] h-[0.9735rem] rounded-full bg-[var(--randomBg)]`}
					style={
						{ '--randomBg': generateRandomLightColor() } as CSSProperties
					}></span>
				<h2 className='text-[#828FA3] text-xs leading-[.9375rem] tracking-[.15rem] uppercase'>
					{column.name} ({column.tasks?.length})
				</h2>
			</div>
			{column.tasks.map((task) => (
				<TaskCard key={task._id} task={task} />
			))}
		</div>
	);
};
export default Column;
