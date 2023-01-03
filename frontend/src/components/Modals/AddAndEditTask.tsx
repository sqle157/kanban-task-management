import { ChangeEvent, MouseEvent, useState } from 'react';
import { useBoardContext } from '../../hooks/useBoardContext';
import { useFetch } from '../../hooks/useFetch';
// Interfaces
import { AddAndEditTaskProps, ITask } from '../../shared/types/interfaces';

function AddAndEditTask({ action }: AddAndEditTaskProps) {
	const { board } = useBoardContext();
	const { sendFetchRequest, error } = useFetch<ITask>();
	const [isSelectStatus, setIsSelectStatus] = useState<boolean>(false);
	const [taskData, setTaskData] = useState<ITask>({
		title: '',
		description: '',
		subtasks: [],
		status: board!.columns[0].name,
		column: board!.columns[0]._id!,
		boardId: board!._id!,
	});

	// Event handler to handle change title and description value
	const handleOnChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const target = e.target.name;

		setTaskData((prevData) => {
			return {
				...prevData,
				[target]: e.target.value,
			};
		});
	};

	// Event handler to handle add new subtask
	const handleAddSubtaskClick = () => {
		setTaskData((prevData) => {
			return {
				...prevData,
				subtasks: [
					...prevData.subtasks,
					{ title: '', isCompleted: false, id: crypto.randomUUID() },
				],
			};
		});
	};

	// Helper function to handle delete subtaks
	const handleDeleteSubtask = (id: string) => {
		setTaskData((prevData) => {
			const filterdSubtasks = prevData.subtasks.filter(
				(subtask) => (subtask.id ?? subtask._id) !== id
			);

			return {
				...prevData,
				subtasks: [...filterdSubtasks],
			};
		});
	};

	// Helper function to handle change subtask title
	const handleChangeSubtaskTitle = (value: string, id: string) => {
		setTaskData((prevData) => {
			const newSubtasks = prevData.subtasks.map((subtask) => {
				if ((subtask._id ?? subtask.id) === id) {
					subtask = {
						...subtask,
						title: value,
					};
				}

				return subtask;
			});

			return {
				...prevData,
				subtasks: [...newSubtasks],
			};
		});
	};

	// Event handler to handle status change
	const handleChangeStatus = (e: MouseEvent<HTMLSpanElement>) => {
		const value = e.currentTarget.dataset.value;

		if (value) {
			setTaskData((prevData) => {
				return {
					...prevData,
					status: value,
				};
			});
		}

		setIsSelectStatus(false);
	};

	return (
		<form>
			<h2 className='text-lg leading-6 font-bold text-white mb-6'>
				{action === 'ADD_TASK' ? 'Add New Task' : 'Edit Task'}
			</h2>
			<div className='mb-6'>
				<h3 className='text-xs font-bold mb-2 text-white'>Title</h3>
				<input
					type='text'
					value={taskData.title}
					placeholder='e.g. Take coffee break'
					name='title'
					onChange={handleOnChange}
					className={`peer w-full h-10 bg-inherit border border-[#828FA3]/25 px-4 rounded text-white placeholder:opacity-25 placeholder:text-[.8125rem] placeholder:leading-6 placeholder:text-white placeholder:font-medium focus-within:outline-none ${
						error && !taskData.title && 'outline outline-1 outline-[#EA5555]'
					}`}
				/>
			</div>
			<div className='mb-6'>
				<h3 className='text-xs font-bold mb-2 text-white'>Description</h3>
				<textarea
					value={taskData.description}
					placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
					name='description'
					onChange={handleOnChange}
					className={`resize-none w-full h-28 bg-inherit border border-[#828FA3]/25 px-4 pt-2 rounded text-white placeholder:opacity-25 placeholder:text-[.8125rem] placeholder:leading-6 placeholder:text-white placeholder:font-medium focus-within:outline-none`}
				/>
			</div>
			<div className='mb-6'>
				<h3 className='text-xs font-bold mb-2 text-white'>Subtasks</h3>
				{taskData.subtasks.map((subtask) => (
					<div
						key={subtask._id ?? subtask.id}
						className='flex items-center gap-4 mb-3 relative'>
						<input
							type='text'
							placeholder='e.g. Web Design'
							value={subtask.title}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								handleChangeSubtaskTitle(
									e.target.value,
									subtask._id ?? subtask.id!
								)
							}
							id='columns'
							className={`peer w-full h-10 bg-inherit border border-[#828FA3]/25 px-4 rounded text-white placeholder:opacity-25 placeholder:text-[.8125rem] placeholder:leading-6 placeholder:text-white placeholder:font-medium focus-within:outline-none ${
								error && !subtask.title && 'outline outline-1 outline-[#EA5555]'
							}`}
						/>

						<svg width='15' height='15' xmlns='http://www.w3.org/2000/svg'>
							<g
								fill={`${error && !subtask.title ? '#EA5555' : '#828FA3'}`}
								fillRule='evenodd'
								className='cursor-pointer'
								onClick={() => handleDeleteSubtask(subtask._id ?? subtask.id!)}>
								<path d='m12.728 0 2.122 2.122L2.122 14.85 0 12.728z' />
								<path d='M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z' />
							</g>
						</svg>

						{error && !subtask.title && (
							<span className='absolute right-10 bottom-2 text-[#EA5555] font-medium text-[.8125rem] leading-6 peer-focus-within:hidden'>
								{error}
							</span>
						)}
					</div>
				))}
				<button
					className='w-full h-10 text-[#635FC7] font-bold text-[.8125rem] leading-6 bg-white rounded-[1.25rem]'
					onClick={handleAddSubtaskClick}
					type='button'>
					+ Add New Subtask
				</button>
			</div>

			<div className='relative mb-6'>
				<h3 className='text-xs font-bold mb-2 text-white'>Status</h3>
				<button
					className='cursor-pointer relative w-full h-10 px-4 py-2 text-white text-start font-medium text-[0.8125rem] leading-6 bg-transparent rounded border border-[#828FA3]/25 hover:border-[#635FC7]'
					onClick={(e) => {
						e.preventDefault();
						setIsSelectStatus((prevStatus) => !prevStatus);
					}}>
					<span className='font-medium text-[0.8125rem] leading-6'>
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
					<div className='absolute left-0 top-[calc(100%+5px)] w-full flex flex-col gap-2 p-4 bg-[#20212C] rounded-lg'>
						{board?.columns.map((column) => (
							<span
								key={column._id}
								className='cursor-pointer font-medium text-[0.8125rem] leading-6 text-[#828FA3]'
								data-value={column.name}
								onClick={handleChangeStatus}>
								{column.name}
							</span>
						))}
					</div>
				)}
			</div>

			<button
				className='w-full h-10 text-white font-bold text-[.8125rem] leading-6 bg-[#635FC7] hover:bg-[#A8A4FF] rounded-[1.25rem]'
				type='submit'>
				{action === 'EDIT_TASK' ? 'Save Changes' : 'Create Task'}
			</button>
		</form>
	);
}
export default AddAndEditTask;
