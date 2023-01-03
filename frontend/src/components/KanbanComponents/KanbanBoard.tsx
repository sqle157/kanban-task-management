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
			<div className='h-full flex flex-col gap-8 justify-center items-center'>
				<h2>This board is empty. Create a new column to get started.</h2>
				<button
					className='h-12 px-6 grid place-items-center bg-[#635FC7] hover:bg-[#A8A4FF] rounded-3xl font-bold text-white text-[0.9375rem] leading-5 disabled:opacity-25'
					onClick={handleAddColumnClick}>
					+ Add New Column
				</button>
			</div>
		);
	}

	return (
		<div className='kanban-grid h-full grid grid-flow-col auto-cols-[17.5rem] gap-6 overflow-scroll'>
			{board.columns.map((column) => (
				<Column key={column._id} column={column} />
			))}
			<button
				className='cursor-pointer mt-[2.4375rem] rounded-md flex items-center justify-center bg-gradient-to-r from-[#2B2C3740]/25 to-[#2B2C3720]/[0.125] text-[#828FA3] hover:text-[#635FC7] text-2xl leading-[1.875rem] font-bold'
				onClick={handleAddColumnClick}>
				+ New Column
			</button>
		</div>
	);
}
export default KanbanBoard;
