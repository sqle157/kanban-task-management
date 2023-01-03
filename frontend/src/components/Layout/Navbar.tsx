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
	const handleAddTaskClick = () => {
		dispatch({ type: 'OPEN_MODAL', payload: 'ADD_TASK' });
		setOpenActionElement(false);
	};

	// Event handler to handle edit board action
	const handleEditBoardClick = () => {
		dispatch({ type: 'OPEN_MODAL', payload: 'EDIT_BOARD' });
		setOpenActionElement(false);
	};

	// Event handler to handle delete board action
	const handleDeleteBoardClick = () => {
		dispatch({ type: 'OPEN_MODAL', payload: 'DELETE_BOARD' });
		setOpenActionElement(false);
	};

	return (
		<>
			<header className='ml-[300px] bg-[#2B2C37] h-24 relative border-b border-b-[#3E3F4E]'>
				<div className='w-full h-full flex items-center'>
					{board ? (
						<div className='flex items-center justify-between flex-1 pl-6 pr-8'>
							<h1 className='font-bold text-white text-2xl'>{board.name}</h1>
							<div className='flex items-center gap-6'>
								<button
									className='h-12 px-6 grid place-items-center bg-[#635FC7] hover:bg-[#A8A4FF] rounded-3xl font-bold text-white text-[0.9375rem] leading-5 disabled:opacity-25 disabled:hover:bg-[#635FC7]'
									disabled={board.columns.length === 0}
									onClick={handleAddTaskClick}>
									+ Add New Task
								</button>

								<img
									src={verticalEllipse}
									alt=''
									className='cursor-pointer'
									onClick={() =>
										setOpenActionElement((prevState) => !prevState)
									}
								/>
							</div>
						</div>
					) : (
						<div className='flex items-center justify-center flex-1 px-8'>
							<h1 className='font-bold text-white text-2xl'>
								Kanban Task Management
							</h1>
						</div>
					)}
				</div>
				{openActionElement && (
					<div
						className='flex flex-col justify-between absolute right-6 top-[90%] w-48 h-[5.875rem] p-4 bg-[#20212C] rounded-lg shadow-sm shadow-white/5'
						ref={ref}>
						<span
							className='cursor-pointer text-[0.8125rem] leading-6 font-medium text-[#828FA3]'
							onClick={handleEditBoardClick}>
							Edit Board
						</span>
						<span
							className='cursor-pointer text-[0.8125rem] leading-6 font-medium text-[#EA5555]'
							onClick={handleDeleteBoardClick}>
							Delete Board
						</span>
					</div>
				)}
			</header>
		</>
	);
}
export default Navbar;
