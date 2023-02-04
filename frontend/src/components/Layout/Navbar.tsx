import { useState, useRef } from 'react';
import { useBoardContext } from '../../hooks/useBoardContext';
import { useModalContext } from '../../hooks/useModalContext';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
// Icons & images
import KanbanLogo from '../../assets/logo-mobile.svg';
import MobileAddTaskIcon from '../../assets/icon-add-task-mobile.svg';
import ChevronDownIcon from '../../assets/icon-chevron-down.svg';
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

	// Event handler to handle view board action (in mobile)
	function handleViewBoardClick() {
		dispatch({ type: 'OPEN_MODAL', payload: 'VIEW_BOARD' });
		setOpenActionElement(false);
	}

	return (
		<header className='relative h-16 bg-[#2B2C37] sm:ml-[260px] sm:h-24 sm:border-b sm:border-b-[#3E3F4E] lg:ml-[300px]'>
			<div className='flex h-full w-full items-center px-4 sm:p-0'>
				{board ? (
					<>
						<img src={KanbanLogo} alt='logo' className='sm:hidden' />
						<div className='flex flex-1 items-center justify-between pl-4 sm:pl-6 sm:pr-6 lg:pr-8'>
							<div>
								<h1 className='hidden text-[1.125rem] font-bold leading-[22px] text-white sm:block sm:leading-6 lg:text-2xl'>
									{board.name}
								</h1>
								<button
									type='button'
									onClick={handleViewBoardClick}
									className='flex items-center gap-2 sm:hidden'>
									<span className='text-[1.125rem] font-bold leading-[22px] text-white sm:leading-6 lg:text-2xl'>
										{board.name}
									</span>
									<img
										src={ChevronDownIcon}
										alt=''
										className='block cursor-pointer sm:hidden'
									/>
								</button>
							</div>
							<div className='flex items-center gap-4 sm:gap-6'>
								<button
									className='grid h-8 place-items-center rounded-3xl bg-[#635FC7] px-6 text-[0.9375rem] font-bold leading-5 text-white hover:bg-[#A8A4FF] disabled:opacity-25 disabled:hover:bg-[#635FC7] sm:h-12'
									disabled={board.columns.length === 0}
									type='button'
									onClick={handleAddTaskClick}>
									<span className='hidden sm:block'>+ Add New Task</span>
									<img src={MobileAddTaskIcon} alt='' className='sm:hidden' />
								</button>

								<button
									className='cursor-pointer'
									type='button'
									onClick={() =>
										setOpenActionElement((prevState) => !prevState)
									}>
									<img src={verticalEllipse} alt='' />
								</button>
							</div>
						</div>
					</>
				) : (
					<div className='flex flex-1 items-center justify-between sm:justify-center sm:px-8'>
						<div className='flex items-center gap-2 sm:hidden'>
							<img src={KanbanLogo} alt='logo' />
							<button type='button' onClick={handleViewBoardClick}>
								<img src={ChevronDownIcon} alt='' />
							</button>
						</div>
						<h1 className='font-bold text-white sm:text-2xl'>
							Kanban Task Management
						</h1>
					</div>
				)}
			</div>
			{openActionElement && (
				<div
					className='absolute right-4 top-[90%] z-10 flex h-[5.875rem] w-48 flex-col justify-between rounded-lg bg-[#20212C] p-4 shadow-sm shadow-white/5 sm:right-6'
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
