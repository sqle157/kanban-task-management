import { useBoardContext } from '../../hooks/useBoardContext';
import { useModalContext } from '../../hooks/useModalContext';
import { useFetch } from '../../hooks/useFetch';
import LoadingSpinner from '../LoadingSpinner';

function DeleteBoard() {
	const { board, dispatch } = useBoardContext();
	const { dispatch: modalDispatch } = useModalContext();
	const { sendFetchRequest, loading } = useFetch<{ success: boolean }>();

	const handleDeleteClick = async () => {
		try {
			const data = await sendFetchRequest(
				`/api/boards/${board?._id}`,
				'DELETE'
			);

			if (data?.success) {
				dispatch({ type: 'DELETE_BOARD', payload: board?._id ?? '' });
				modalDispatch({ type: 'CLOSE_MODAL' });
			}
		} catch (error) {
			/* empty */
		}
	};

	const handleCancelClick = () => {
		modalDispatch({ type: 'CLOSE_MODAL' });
	};

	return (
		<>
			<h2 className='mb-6 text-lg font-bold leading-6 text-[#EA5555]'>
				Delete this board?
			</h2>
			<p className='mb-6 text-[0.8125rem] font-medium leading-6'>
				Are you sure you want to delete the {board?.name} board? This action
				will remove all columns and tasks and cannot be reversed.
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
export default DeleteBoard;
