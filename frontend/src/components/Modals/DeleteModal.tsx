import { useBoardContext } from '../../hooks/useBoardContext';
import { useModalContext } from '../../hooks/useModalContext';
import { useFetch } from '../../hooks/useFetch';
// Components
import LoadingSpinner from '../LoadingSpinner';
// Interfaces
import { DeleteModalProps } from '../../shared/types/interfaces';

function DeleteModal({ action }: DeleteModalProps) {
	const { board, task, dispatch } = useBoardContext();
	const { dispatch: modalDispatch } = useModalContext();
	const { sendFetchRequest, loading } = useFetch<{ success: boolean }>();

	// Helper function to handle delete click
	async function handleDeleteClick() {
		try {
			const data = await sendFetchRequest(
				action === 'DELETE_BOARD'
					? `/api/boards/${board?._id}`
					: `/api/tasks/${task?._id}`,
				'DELETE'
			);

			if (data?.success) {
				dispatch({
					type: action === 'DELETE_BOARD' ? 'DELETE_BOARD' : 'DELETE_TASK',
					payload:
						action === 'DELETE_BOARD'
							? (board?._id as string)
							: (task?._id as string),
				});
				modalDispatch({ type: 'CLOSE_MODAL' });
			}
		} catch (error) {
			/* empty */
		}
	}

	// Helper function to handle cancel click
	function handleCancelClick() {
		modalDispatch({ type: 'CLOSE_MODAL' });
	}

	return (
		<>
			<h2 className='mb-6 text-lg font-bold leading-6 text-[#EA5555]'>
				Delete this {action === 'DELETE_BOARD' ? 'board' : 'task'}?
			</h2>
			<p className='mb-6 text-[0.8125rem] font-medium leading-6'>
				Are you sure you want to delete the{' '}
				{action === 'DELETE_BOARD'
					? `${board?.name} board? This action will remove all columns and tasks and cannot be reversed.`
					: `${task?.title} task and its subtasks? This action cannot be reversed.`}
			</p>
			<div className='flex items-center gap-4'>
				<button
					className='h-10 flex-1 rounded-[1.25rem] bg-[#EA5555] text-[0.8125rem] font-bold leading-6 text-white hover:bg-[#FF9898]'
					type='button'
					onClick={handleDeleteClick}>
					Delete
				</button>
				<button
					className='h-10 flex-1 rounded-[1.25rem] bg-white text-[0.8125rem] font-bold leading-6 text-[#635FC7]'
					type='button'
					onClick={handleCancelClick}>
					Cancel
				</button>
			</div>

			{loading && <LoadingSpinner asOverlay />}
		</>
	);
}
export default DeleteModal;
