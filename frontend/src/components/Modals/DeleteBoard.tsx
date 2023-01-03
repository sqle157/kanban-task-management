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
				`/api/boards/${board!._id}`,
				'DELETE'
			);

			if (data?.success) {
				dispatch({ type: 'DELETE_BOARD', payload: board!._id! });
				modalDispatch({ type: 'CLOSE_MODAL' });
			}
		} catch (error) {}
	};

	const handleCancelClick = () => {
		modalDispatch({ type: 'CLOSE_MODAL' });
	};

	return (
		<>
			<h2 className='text-lg leading-6 font-bold text-[#EA5555] mb-6'>
				Delete this board?
			</h2>
			<p className='text-[0.8125rem] leading-6 font-medium mb-6'>
				Are you sure you want to delete the {board!.name} board? This action
				will remove all columns and tasks and cannot be reversed.
			</p>
			<div className='flex items-center gap-4'>
				<button
					className='flex-1 h-10 bg-[#EA5555] hover:bg-[#FF9898] rounded-[1.25rem] text-[0.8125rem] leading-6 font-bold text-white'
					onClick={handleDeleteClick}>
					Delete
				</button>
				<button
					className='flex-1 h-10 bg-white rounded-[1.25rem] text-[0.8125rem] leading-6 font-bold text-[#635FC7]'
					onClick={handleCancelClick}>
					Cancel
				</button>
			</div>

			{loading && <LoadingSpinner asOverlay />}
		</>
	);
}
export default DeleteBoard;
