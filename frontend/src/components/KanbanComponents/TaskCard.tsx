import { useModalContext } from '../../hooks/useModalContext';
import { useBoardContext } from '../../hooks/useBoardContext';
// Interface
import { TaskCardProps } from '../../shared/types/interfaces';

function TaskCard({ task }: TaskCardProps) {
	const { dispatch } = useBoardContext();
	const { dispatch: modalDispatch } = useModalContext();

	function handleViewTaskClick() {
		dispatch({ type: 'SET_TASK', payload: task });
		modalDispatch({ type: 'OPEN_MODAL', payload: 'VIEW_TASK' });
	}

	return (
		<button
			className='mb-2 w-full cursor-pointer rounded-lg bg-[#2B2C37] px-4 py-6 text-start text-[.9375rem] font-bold leading-5 text-white shadow-md shadow-[rgba(54,78,126,0.101545)] hover:text-[#635FC7]'
			type='button'
			onClick={handleViewTaskClick}>
			{task.title}
			<span className='mt-5 block text-xs font-bold leading-[.9375rem] text-[#828FA3]'>
				{task.subtasks.filter((subtask) => subtask.isCompleted).length} of{' '}
				{task.subtasks.length} subtasks
			</span>
		</button>
	);
}
export default TaskCard;
