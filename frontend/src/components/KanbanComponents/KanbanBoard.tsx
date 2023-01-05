import { useModalContext } from '../../hooks/useModalContext';
// Interfaces
import { KanbanBoardProps } from '../../shared/types/interfaces';
// Components
import Column from './Column';

function KanbanBoard({ board }: KanbanBoardProps) {
	const { dispatch } = useModalContext();

	// Event handler to handle add column action
	const handleAddColumnClick = () => {
		dispatch({ type: 'OPEN_MODAL', payload: 'ADD_COLUMN' });
	};

	// If there is no column
	if (board.columns.length === 0) {
		return (
			<div className='flex h-full flex-col items-center justify-center gap-8'>
				<h2>This board is empty. Create a new column to get started.</h2>
				<button
					className='grid h-12 place-items-center rounded-3xl bg-[#635FC7] px-6 text-[0.9375rem] font-bold leading-5 text-white hover:bg-[#A8A4FF] disabled:opacity-25'
					type='button'
					onClick={handleAddColumnClick}>
					+ Add New Column
				</button>
			</div>
		);
	}

	return (
		<div className='kanban-grid grid h-full auto-cols-[17.5rem] grid-flow-col gap-6 overflow-scroll'>
			{board.columns.map((column) => (
				<Column key={column._id} column={column} />
			))}
			<button
				className='mt-[2.4375rem] flex cursor-pointer items-center justify-center rounded-md bg-gradient-to-r from-[#2B2C3740]/25 to-[#2B2C3720]/[0.125] text-2xl font-bold leading-[1.875rem] text-[#828FA3] hover:text-[#635FC7]'
				type='button'
				onClick={handleAddColumnClick}>
				+ New Column
			</button>
		</div>
	);
}
export default KanbanBoard;
