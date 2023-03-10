import ReactDOM from 'react-dom';
import { useFetch } from '../../hooks/useFetch';
import { useBoardContext } from '../../hooks/useBoardContext';
import { useModalContext } from '../../hooks/useModalContext';
// interfaces
import { IBoard } from '../../shared/types/interfaces';
import LoadingSpinner from '../LoadingSpinner';

function BoardItem({ board }: { board: IBoard }) {
	const { dispatch, board: activeBoard } = useBoardContext();
	const { dispatch: modalDispatch } = useModalContext();
	const { sendFetchRequest, loading } = useFetch<IBoard>();

	// Helper function to handle select the board
	async function handleBoardClick(boardId: string | null) {
		if (boardId) {
			try {
				const data = await sendFetchRequest(`/api/boards/${boardId}`);

				if (data) {
					dispatch({ type: 'SET_BOARD', payload: data });
				}
			} catch (error) {
				/* empty */
			}
			modalDispatch({ type: 'CLOSE_MODAL' });
		}
	}

	return (
		<>
			<div
				className={`flex h-12 w-full cursor-pointer items-center rounded-tr-[100px] rounded-br-[100px] pl-6 text-[0.9375rem] 
					font-bold capitalize leading-5 sm:pl-8 ${
						activeBoard?._id !== board._id &&
						'bg-transparent text-[#828FA3] hover:bg-white hover:text-[#635FC7]'
					} ${activeBoard?._id === board._id && 'bg-[#635FC7] text-white'}`}>
				<button
					type='button'
					onClick={() => handleBoardClick(board._id ?? null)}
					className='flex h-full w-full items-center gap-4'>
					<svg width='16' height='16' xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z'
							fill={activeBoard?._id === board._id ? '#ffffff' : '#828FA3'}
							className={`${
								activeBoard?._id !== board._id && 'group-hover:fill-[#635FC7]'
							}`}
						/>
					</svg>
					{board.name}
				</button>
			</div>

			{loading &&
				ReactDOM.createPortal(
					<div className='absolute inset-0 grid items-center'>
						<LoadingSpinner asOverlay />
					</div>,
					document.getElementById('main') as HTMLElement
				)}
		</>
	);
}
export default BoardItem;
