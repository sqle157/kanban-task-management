import { ChangeEvent, FormEvent, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useBoardContext } from '../../hooks/useBoardContext';
import { useModalContext } from '../../hooks/useModalContext';
// Interfaces
import { AddAndEditTaskProps, ITask } from '../../shared/types/interfaces';

function AddAndEditTask({ action }: AddAndEditTaskProps) {
	const { sendFetchRequest, error } = useFetch<ITask>();
	const { board, task, dispatch } = useBoardContext();
	const { dispatch: modalDispatch } = useModalContext();
	const [isSelectStatus, setIsSelectStatus] = useState<boolean>(false);
	const [taskData, setTaskData] = useState<ITask>(() => {
		if (board) {
			return {
				title: '',
				description: '',
				subtasks: [],
				status: board.columns[0].name,
				column: board.columns[0]._id ?? '',
				boardId: board._id,
			};
		}

		return {
			title: '',
			description: '',
			subtasks: [],
			status: '',
			column: '',
			boardId: '',
		};
	});

	// Event handler to handle change title and description value
	const handleOnChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const target = e.target.name;

		setTaskData((prevData) => ({
			...prevData,
			[target]: e.target.value,
		}));
	};

	// Event handler to handle add new subtask
	const handleAddSubtaskClick = () => {
		setTaskData((prevData) => ({
			...prevData,
			subtasks: [
				...prevData.subtasks,
				{ title: '', isCompleted: false, id: crypto.randomUUID() },
			],
		}));
	};

	// Helper function to handle delete subtaks
	const handleDeleteSubtask = (id: string | null) => {
		if (id) {
			setTaskData((prevData) => {
				const filterdSubtasks = prevData.subtasks.filter(
					(subtask) => (subtask.id ?? subtask._id) !== id
				);

				return {
					...prevData,
					subtasks: [...filterdSubtasks],
				};
			});
		}
	};

	// Helper function to handle change subtask title
	const handleChangeSubtaskTitle = (value: string, id: string | null) => {
		if (id) {
			setTaskData((prevData) => {
				const newSubtasks = prevData.subtasks.map((subtask) => {
					if ((subtask._id ?? subtask.id) === id) {
						const newSubtask = {
							...subtask,
							title: value,
						};

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
	};

	// Event handler to handle status change
	const handleChangeStatus = (name: string, id: string | null) => {
		if (id) {
			setTaskData((prevData) => ({
				...prevData,
				status: name,
				column: id,
			}));
		}

		setIsSelectStatus(false);
	};

	// Event handler to handle form submit
	const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const data = await sendFetchRequest(
				'/api/tasks',
				'POST',
				JSON.stringify(taskData),
				{
					'Content-Type': 'application/json',
				}
			);

			if (data) {
				dispatch({ type: 'ADD_TASK', payload: data });
				modalDispatch({ type: 'CLOSE_MODAL' });
			}
		} catch (err) {
			/* empty */
		}
	};

	return (
		<form onSubmit={handleOnSubmit}>
			<h2 className='mb-6 text-lg font-bold leading-6 text-white'>
				{action === 'ADD_TASK' ? 'Add New Task' : 'Edit Task'}
			</h2>
			<div className='relative mb-6'>
				<h3 className='mb-2 text-xs font-bold text-white'>Title</h3>
				<input
					type='text'
					value={taskData.title}
					placeholder='e.g. Take coffee break'
					name='title'
					onChange={handleOnChange}
					className={`peer h-10 w-full rounded border border-[#828FA3]/25 bg-inherit px-4 text-white placeholder:text-[.8125rem] placeholder:font-medium placeholder:leading-6 placeholder:text-white placeholder:opacity-25 focus-within:outline-none ${
						error && !taskData.title && 'outline outline-1 outline-[#EA5555]'
					}`}
				/>
				{error && !taskData.title && (
					<span className='absolute right-4 bottom-2 text-[.8125rem] font-medium leading-6 text-[#EA5555] peer-focus-within:hidden'>
						{error}
					</span>
				)}
			</div>
			<div className='mb-6'>
				<h3 className='mb-2 text-xs font-bold text-white'>Description</h3>
				<textarea
					value={taskData.description}
					placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
					name='description'
					onChange={handleOnChange}
					className='h-28 w-full resize-none rounded border border-[#828FA3]/25 bg-inherit px-4 pt-2 text-white placeholder:text-[.8125rem] placeholder:font-medium placeholder:leading-6 placeholder:text-white placeholder:opacity-25 focus-within:outline-none'
				/>
			</div>
			<div className='mb-6'>
				<h3 className='mb-2 text-xs font-bold text-white'>Subtasks</h3>
				{taskData.subtasks.map((subtask) => (
					<div
						key={subtask._id ?? subtask.id}
						className='relative mb-3 flex items-center gap-4'>
						<input
							type='text'
							placeholder='e.g. Web Design'
							value={subtask.title}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								handleChangeSubtaskTitle(
									e.target.value,
									subtask._id ?? subtask.id ?? null
								)
							}
							id='columns'
							className={`peer h-10 w-full rounded border border-[#828FA3]/25 bg-inherit px-4 text-white placeholder:text-[.8125rem] placeholder:font-medium placeholder:leading-6 placeholder:text-white placeholder:opacity-25 focus-within:outline-none ${
								error && !subtask.title && 'outline outline-1 outline-[#EA5555]'
							}`}
						/>

						<svg width='15' height='15' xmlns='http://www.w3.org/2000/svg'>
							<g
								fill={`${error && !subtask.title ? '#EA5555' : '#828FA3'}`}
								fillRule='evenodd'
								className='cursor-pointer'
								onClick={() =>
									handleDeleteSubtask(subtask._id ?? subtask.id ?? null)
								}>
								<path d='m12.728 0 2.122 2.122L2.122 14.85 0 12.728z' />
								<path d='M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z' />
							</g>
						</svg>

						{error && !subtask.title && (
							<span className='absolute right-10 bottom-2 text-[.8125rem] font-medium leading-6 text-[#EA5555] peer-focus-within:hidden'>
								{error}
							</span>
						)}
					</div>
				))}
				<button
					className='h-10 w-full rounded-[1.25rem] bg-white text-[.8125rem] font-bold leading-6 text-[#635FC7]'
					onClick={handleAddSubtaskClick}
					type='button'>
					+ Add New Subtask
				</button>
			</div>

			<div className='relative mb-6'>
				<h3 className='mb-2 text-xs font-bold text-white'>Status</h3>
				<button
					className='relative h-10 w-full cursor-pointer rounded border border-[#828FA3]/25 bg-transparent px-4 py-2 text-start text-[0.8125rem] font-medium leading-6 text-white hover:border-[#635FC7]'
					type='button'
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
								className='cursor-pointer text-[0.8125rem] font-medium leading-6 text-[#828FA3]'
								type='button'
								onClick={() =>
									handleChangeStatus(column.name, column._id ?? null)
								}>
								{column.name}
							</button>
						))}
					</div>
				)}
			</div>

			<button
				className='h-10 w-full rounded-[1.25rem] bg-[#635FC7] text-[.8125rem] font-bold leading-6 text-white hover:bg-[#A8A4FF]'
				type='submit'>
				{action === 'EDIT_TASK' ? 'Save Changes' : 'Create Task'}
			</button>
		</form>
	);
}
export default AddAndEditTask;
