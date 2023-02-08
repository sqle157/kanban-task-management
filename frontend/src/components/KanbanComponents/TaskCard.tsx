import { DragEvent, useState } from 'react';
import { useModalContext } from '../../hooks/useModalContext';
import { useBoardContext } from '../../hooks/useBoardContext';
import { useFetch } from '../../hooks/useFetch';
// Interface
import { ITask } from '../../shared/types/interfaces';

function TaskCard({ task }: { task: ITask }) {
	const { dispatch, task: currentTask, isTargetedTask } = useBoardContext();
	const { dispatch: modalDispatch } = useModalContext();
	const [droppable, setDroppable] = useState<boolean>(false);
	const { sendFetchRequest } = useFetch<ITask>();

	// Event handler to handle view task click
	function handleViewTaskClick() {
		dispatch({ type: 'SET_TASK', payload: task });
		modalDispatch({ type: 'OPEN_MODAL', payload: 'VIEW_TASK' });
	}

	// Event handler to handle on drag start
	function handleOnDrag(e: DragEvent) {
		e.dataTransfer.effectAllowed = 'move';
		dispatch({ type: 'SET_TASK', payload: task });
	}

	// Event handler to handle drag over
	function handleDragOver(e: DragEvent) {
		e.preventDefault();
		if (currentTask?._id !== task._id) {
			setDroppable(true);
			dispatch({ type: 'SET_TARGETED_TASK', payload: true });
		}
	}

	// Event handler to handle drag leave
	function handleDragLeave() {
		setDroppable(false);
		dispatch({ type: 'SET_TARGETED_TASK', payload: false });
	}

	// Event handler to handle drag drop
	async function handleDragDrop() {
		setDroppable(false);
		// If there is a target task to replace
		if (isTargetedTask) {
			// Update the UI
			dispatch({
				type: 'UPDATE_TASK',
				payload: {
					...currentTask,
					status:
						currentTask?.status === task.status
							? currentTask.status
							: task.status,
					column:
						currentTask?.column === task.column
							? currentTask.column
							: task.column,
					position: task.position,
				} as ITask,
			});

			// Update the database
			try {
				await sendFetchRequest(
					`api/tasks/${currentTask?._id}`,
					'PATCH',
					JSON.stringify({
						...currentTask,
						status:
							currentTask?.status === task.status
								? currentTask.status
								: task.status,
						column:
							currentTask?.column === task.column
								? currentTask.column
								: task.column,
						position: task.position,
						targetId: task._id,
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
			className={`${
				droppable && 'bg-[white]/50'
			} mb-2 w-full cursor-pointer rounded-lg bg-[#2B2C37] px-4 py-6 text-start text-[.9375rem] font-bold leading-[19px] text-white shadow-md shadow-[rgba(54,78,126,0.101545)] hover:text-[#635FC7]`}
			draggable
			onDragStart={handleOnDrag}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDragDrop}>
			<button
				type='button'
				onClick={handleViewTaskClick}
				className='h-full w-full text-start'>
				{task.title}
				<span className='mt-5 block text-xs font-bold leading-[.9375rem] text-[#828FA3]'>
					{task.subtasks.filter((subtask) => subtask.isCompleted).length} of{' '}
					{task.subtasks.length} subtasks
				</span>
			</button>
		</div>
	);
}
export default TaskCard;
