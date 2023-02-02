import { useState, useRef } from 'react';
import { useBoardContext } from '../../hooks/useBoardContext';
import { useModalContext } from '../../hooks/useModalContext';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
// Icons
import verticalEllipse from '../../assets/icon-vertical-ellipsis.svg';

function Navbar() {
	const { board } = useBoardContext();
	const { dispatch } = useModalContext();
	const [openActionElement, setOpenActionElement] = useState<boolean>(false);
	// useOnClickOutside reference
	const ref = useRef(null);
	useOnClickOutside<HTMLDivElement>(ref, () => setOpenActionElement(false));

	// Event handler to handle add task action
	function handleAddTaskClick() {
		dispatch({ type: 'OPEN_MODAL', payload: 'ADD_TASK' });
		setOpenActionElement(false);
	}

	// Event handler to handle edit board action
	function handleEditBoardClick() {
		dispatch({ type: 'OPEN_MODAL', payload: 'EDIT_BOARD' });
		setOpenActionElement(false);
	}

	// Event handler to handle delete board action
	function handleDeleteBoardClick() {
		dispatch({ type: 'OPEN_MODAL', payload: 'DELETE_BOARD' });
		setOpenActionElement(false);
	}

	return (
		<header className='relative ml-[300px] h-24 border-b border-b-[#3E3F4E] bg-[#2B2C37]'>
			<div className='flex h-full w-full items-center'>
				{board ? (
					<div className='flex flex-1 items-center justify-between pl-6 pr-8'>
						<h1 className='text-2xl font-bold text-white'>{board.name}</h1>
						<div className='flex items-center gap-6'>
							<button
								className='grid h-12 place-items-center rounded-3xl bg-[#635FC7] px-6 text-[0.9375rem] font-bold leading-5 text-white hover:bg-[#A8A4FF] disabled:opacity-25 disabled:hover:bg-[#635FC7]'
								disabled={board.columns.length === 0}
								type='button'
								onClick={handleAddTaskClick}>
								+ Add New Task
							</button>

							<button
								className='cursor-pointer'
								type='button'
								onClick={() => setOpenActionElement((prevState) => !prevState)}>
								<img src={verticalEllipse} alt='' />
							</button>
						</div>
					</div>
				) : (
					<div className='flex flex-1 items-center justify-center px-8'>
						<h1 className='text-2xl font-bold text-white'>
							Kanban Task Management
						</h1>
					</div>
				)}
			</div>
			{openActionElement && (
				<div
					className='absolute right-6 top-[90%] z-10 flex h-[5.875rem] w-48 flex-col justify-between rounded-lg bg-[#20212C] p-4 shadow-sm shadow-white/5'
					ref={ref}>
					<button
						className='cursor-pointer text-start text-[0.8125rem] font-medium leading-6 text-[#828FA3]'
						type='button'
						onClick={handleEditBoardClick}>
						Edit Board
					</button>
					<button
						className='cursor-pointer text-start text-[0.8125rem] font-medium leading-6 text-[#EA5555]'
						type='button'
						onClick={handleDeleteBoardClick}>
						Delete Board
					</button>
				</div>
			)}
		</header>
	);
}
export default Navbar;
