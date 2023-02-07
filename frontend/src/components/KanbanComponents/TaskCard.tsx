import { useModalContext } from '../../hooks/useModalContext';
import { useBoardContext } from '../../hooks/useBoardContext';
// Interface
import { ITask } from '../../shared/types/interfaces';

function TaskCard({ task }: { task: ITask }) {
	const { dispatch } = useBoardContext();
	const { dispatch: modalDispatch } = useModalContext();

	// Event handler to handle view task click
	function handleViewTaskClick() {
		dispatch({ type: 'SET_TASK', payload: task });
		modalDispatch({ type: 'OPEN_MODAL', payload: 'VIEW_TASK' });
	}

	// Event handler to handle on drag start
	function handleOnDrag(e: React.DragEvent) {
		e.dataTransfer.effectAllowed = 'move';
		dispatch({ type: 'SET_TASK', payload: task });
	}

	return (
		<div
			className='mb-2 w-full cursor-pointer rounded-lg bg-[#2B2C37] px-4 py-6 text-start text-[.9375rem] font-bold leading-[19px] text-white shadow-md shadow-[rgba(54,78,126,0.101545)] hover:text-[#635FC7]'
			draggable
			onDragStart={handleOnDrag}>
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
