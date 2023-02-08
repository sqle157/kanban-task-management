import { CSSProperties, useState, DragEvent } from 'react';
import { useBoardContext } from '../../hooks/useBoardContext';
import { useFetch } from '../../hooks/useFetch';
// Interface
import { IColumn, ITask } from '../../shared/types/interfaces';
// Component
import TaskCard from './TaskCard';

function generateRandomLightColor() {
	return `hsl(${Math.random() * 360}, 100%, 75%)`;
}

function Column({ column }: { column: IColumn }) {
	const { task, isTargetedTask, dispatch } = useBoardContext();
	const [droppable, setDroppable] = useState<boolean>(false);
	const { sendFetchRequest } = useFetch<ITask>();

	// Event handler to handle drag over
	function handleDragOver(e: DragEvent) {
		e.preventDefault();
		setDroppable(true);
	}

	// Event handlre to handle drag drop
	async function handleDragDrop(
		columnId: string,
		status: string,
		position: number
	) {
		setDroppable(false);
		// If task is moved to another column
		// And there is no target task to replace
		if (task && task.column !== columnId && !isTargetedTask) {
			// Update the UI
			dispatch({
				type: 'UPDATE_TASK',
				payload: {
					...task,
					status,
					column: columnId,
					position,
				} as ITask,
			});

			// Update the database
			try {
				await sendFetchRequest(
					`api/tasks/${task?._id}`,
					'PATCH',
					JSON.stringify({
						...task,
						status,
						column: columnId,
						position,
					}),
					{
						'Content-Type': 'application/json',
					}
				);
			} catch (error) {
				// Empty
			}
		}
	}

	return (
		<div
			onDragOver={handleDragOver}
			onDragLeave={() => {
				setDroppable(false);
			}}
			onDrop={() =>
				handleDragDrop(column._id as string, column.name, column.tasks.length)
			}
			className={`${droppable && 'border border-[#3E3F4E]'}`}>
			<div className='mb-6 flex items-center gap-3'>
				<span
					className='inline-block h-[0.9735rem] w-[0.9375rem] rounded-full bg-[var(--randomBg)]'
					style={{ '--randomBg': generateRandomLightColor() } as CSSProperties}
				/>
				<h2 className='text-xs uppercase leading-[.9375rem] tracking-[.15rem] text-[#828FA3]'>
					{column.name} ({column.tasks?.length})
				</h2>
			</div>
			{column.tasks.map((t) => (
				<TaskCard key={t._id} task={t} />
			))}
		</div>
	);
}
export default Column;
