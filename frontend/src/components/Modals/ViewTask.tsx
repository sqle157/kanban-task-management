import { useRef, useState, useEffect } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { useBoardContext } from '../../hooks/useBoardContext';
import { useModalContext } from '../../hooks/useModalContext';
import { useFetch } from '../../hooks/useFetch';
// Icons
import verticalEllipse from '../../assets/icon-vertical-ellipsis.svg';
import { ITask } from '../../shared/types/interfaces';

function ViewTask() {
	const { board, task, dispatch } = useBoardContext();
	const { dispatch: modalDispatch } = useModalContext();
	const { sendFetchRequest } = useFetch<ITask>();
	const [taskData, setTaskData] = useState<ITask>({ ...task } as ITask);
	const [openActionElement, setOpenActionElement] = useState<boolean>(false);
	const [isSelectStatus, setIsSelectStatus] = useState<boolean>(false);
	// useOnClickOutside reference
	const actionRef = useRef(null);
	useOnClickOutside<HTMLDivElement>(actionRef, () => {
		setOpenActionElement(false);
	});

	// Run the effect everytime after the taskData change
	useEffect(() => {
		async function updateTask() {
			try {
				await sendFetchRequest(
					`api/tasks/${task?._id}`,
					'PATCH',
					JSON.stringify(taskData),
					{
						'Content-Type': 'application/json',
					}
				);
			} catch (error) {
				/* empty */
			}
		}

		// Update the database
		updateTask();

		// Update the UI
		dispatch({
			type: 'UPDATE_TASK',
			payload: taskData,
		});
	}, [taskData]);

	// Event handler to handle checkbox click
	function handleCheckBoxClick(id: string) {
		setTaskData((prevData) => {
			const newSubtasks = prevData.subtasks.map((subtask) => {
				if (subtask._id === id) {
					const newSubtask = { ...subtask, isCompleted: !subtask.isCompleted };

					return newSubtask;
				}

				return subtask;
			});

			return {
				...prevData,
				subtasks: [...newSubtasks],
			};
		});
	}

	// Event handler to handle edit board action
	function handleEditTaskClick() {
		modalDispatch({ type: 'OPEN_MODAL', payload: 'EDIT_TASK' });
		setOpenActionElement(false);
	}

	// Event handler to handle delete board action
	function handleDeleteTaskClick() {
		modalDispatch({ type: 'OPEN_MODAL', payload: 'DELETE_TASK' });
		setOpenActionElement(false);
	}

	// Event handler to handle status change
	function handleChangeStatus(name: string, id: string, position: number) {
		if (id) {
			setTaskData((prevData) => ({
				...prevData,
				status: name,
				column: id,
				position,
			}));

			setIsSelectStatus(false);
		}
	}

	return (
		task && (
			<>
				<div className='relative mb-6 flex items-center justify-between gap-6'>
					<h2 className='text-lg font-bold leading-6 text-white'>
						{taskData.title}
					</h2>
					<button
						className='cursor-pointer'
						type='button'
						aria-label='open actions container'
						onClick={() => setOpenActionElement((prevState) => !prevState)}>
						<img src={verticalEllipse} alt='' />
					</button>
					{openActionElement && (
						<div
							className='absolute -right-[6rem] top-[calc(100%+20px)] z-10 flex h-[5.875rem] w-48 flex-col justify-between rounded-lg bg-[#20212C] p-4 shadow-sm shadow-white/5'
							ref={actionRef}>
							<button
								className='w-full cursor-pointer text-start text-[0.8125rem] font-medium leading-6 text-[#828FA3]'
								aria-label='edit task'
								type='button'
								onClick={handleEditTaskClick}>
								Edit Task
							</button>
							<button
								className='w-full cursor-pointer text-start text-[0.8125rem] font-medium leading-6 text-[#EA5555]'
								aria-label='delete task'
								type='button'
								onClick={handleDeleteTaskClick}>
								Delete Task
							</button>
						</div>
					)}
				</div>
				<div className='mb-6'>
					<p className='text-[0.8125rem] font-medium leading-6'>
						{taskData.description}
					</p>
				</div>
				<div className='mb-6'>
					<h3 className='mb-4 text-xs font-bold text-white'>
						Subtasks (
						{taskData.subtasks.filter((subtask) => subtask.isCompleted).length}{' '}
						of {taskData.subtasks.length})
					</h3>
					{taskData.subtasks.map((subtask) => (
						<button
							key={subtask._id ?? subtask._id}
							className={`flex w-full cursor-pointer items-center gap-4 p-3 ${
								subtask.isCompleted ? 'bg-[#20212C]' : 'bg-[#635FC7]/25'
							} mb-2 rounded-sm`}
							aria-label='change subtask status'
							type='button'
							onClick={() => handleCheckBoxClick(subtask._id ?? '')}>
							<span
								className={`grid h-4 w-4 place-items-center ${
									subtask.isCompleted ? 'bg-[#635FC7]' : 'bg-[#2B2C37]'
								} rounded-sm border border-[#828FA33F]/25`}>
								{subtask.isCompleted && (
									<svg width='10' height='8' xmlns='http://www.w3.org/2000/svg'>
										<path
											stroke='#FFF'
											strokeWidth='2'
											fill='none'
											d='m1.276 3.066 2.756 2.756 5-5'
										/>
									</svg>
								)}
							</span>
							<p
								className={`text-xs font-bold ${
									subtask.isCompleted
										? 'text-white/50 line-through'
										: 'text-white'
								}`}>
								{subtask.title}
							</p>
						</button>
					))}
				</div>
				<div className='relative'>
					<h3 className='mb-4 text-xs font-bold text-white'>Current status</h3>
					<button
						className='relative h-10 w-full cursor-pointer rounded border border-[#828FA3]/25 bg-transparent px-4 py-2 text-start text-[0.8125rem] font-medium leading-6 text-white hover:border-[#635FC7]'
						type='button'
						aria-label='toggle select status'
						onClick={(e) => {
							e.preventDefault();
							setIsSelectStatus((prevStatus) => !prevStatus);
						}}>
						<span className='text-[0.8125rem] font-medium leading-6'>
							{taskData.status}
						</span>
						<svg
							className='absolute right-4 top-[50%] -translate-y-[50%]'
							width='10'
							height='7'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								stroke='#635FC7'
								strokeWidth='2'
								fill='none'
								d='m1 1 4 4 4-4'
							/>
						</svg>
					</button>
					{isSelectStatus && (
						<div className='absolute left-0 top-[calc(100%+5px)] flex w-full flex-col gap-2 rounded-lg bg-[#20212C] p-4'>
							{board?.columns.map((column) => (
								<button
									key={column._id}
									className='cursor-pointer text-start text-[0.8125rem] font-medium leading-6 text-[#828FA3]'
									type='button'
									aria-label='change status'
									onClick={() =>
										handleChangeStatus(
											column.name,
											column._id ?? '',
											column.tasks.length
										)
									}>
									{column.name}
								</button>
							))}
						</div>
					)}
				</div>
			</>
		)
	);
}
export default ViewTask;
