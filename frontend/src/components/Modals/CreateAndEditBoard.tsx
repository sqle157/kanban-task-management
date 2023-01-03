import { useState, ChangeEvent, FormEvent } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useBoardContext } from '../../hooks/useBoardContext';
import { useModalContext } from '../../hooks/useModalContext';
// Interfaces
import { IBoard } from '../../shared/types/interfaces';
import { CreateAndEditBoardProps } from '../../shared/types/interfaces';
// Component
import LoadingSpinner from '../LoadingSpinner';

function CreateAndEditBoard({ action }: CreateAndEditBoardProps) {
	const { board, dispatch } = useBoardContext();
	const { sendFetchRequest, loading, error } = useFetch<IBoard>();
	const { dispatch: modalDispatch } = useModalContext();
	// Initial Board Data
	const [boardData, setBoardData] = useState<IBoard>(() => {
		if (action === 'EDIT_BOARD' || action === 'ADD_COLUMN') {
			return {
				_id: board!._id,
				name: board!.name,
				columns: board!.columns,
			};
		} else {
			return {
				name: '',
				columns: [],
			};
		}
	});

	// Event handler to handle change board name
	const handleChangeBoardName = (e: ChangeEvent<HTMLInputElement>) => {
		const target = e.target.name;

		setBoardData((prevData) => {
			return { ...prevData, [target]: e.target.value };
		});
	};

	// Helper function to handle change column name
	const handleChangeColumnName = (value: string, id: string) => {
		setBoardData((prevData) => {
			const newColumns = prevData.columns.map((column) => {
				if ((column._id ?? column.id) === id) {
					column = { ...column, name: value };
				}
				return column;
			});

			return {
				...prevData,
				columns: [...newColumns],
			};
		});
	};

	// Event handler to handle add new column
	const handleAddColumnClick = () => {
		setBoardData((prevData) => {
			return {
				...prevData,
				columns: [
					...prevData.columns,
					{ name: '', id: crypto.randomUUID(), tasks: [] },
				],
			};
		});
	};

	// Helper function to handle delete column
	const handleDeleteColumn = (id: string) => {
		setBoardData((prevData) => {
			const filteredColumns = prevData.columns.filter(
				(column) => (column._id ?? column.id) !== id
			);

			return {
				...prevData,
				columns: [...filteredColumns],
			};
		});
	};

	// Event handler to handle submit form event
	const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const data = await sendFetchRequest(
				action === 'EDIT_BOARD' || action === 'ADD_COLUMN'
					? `/api/boards/${board!._id}`
					: '/api/boards',
				action === 'EDIT_BOARD' || action === 'ADD_COLUMN' ? 'PATCH' : 'POST',
				JSON.stringify(boardData),
				{
					'Content-Type': 'application/json',
				}
			);

			if (data) {
				dispatch({
					type:
						action === 'EDIT_BOARD' || action === 'ADD_COLUMN'
							? 'UPDATE_BOARD'
							: 'ADD_BOARD',
					payload: data,
				});
				modalDispatch({ type: 'CLOSE_MODAL' });
			}
		} catch (error) {}
	};

	return (
		<>
			<form onSubmit={handleOnSubmit}>
				<h2 className='text-lg leading-6 font-bold text-white mb-6'>
					{action === 'CREATE_BOARD'
						? 'Add New Board'
						: action === 'EDIT_BOARD'
						? 'Edit Board'
						: 'Add Column'}
				</h2>
				{action !== 'ADD_COLUMN' && (
					<div className='mb-6 relative'>
						<h3 className='text-xs font-bold mb-2 text-white'>Board Name</h3>
						<input
							type='text'
							value={boardData.name}
							placeholder='e.g. Web Design'
							name='name'
							onChange={handleChangeBoardName}
							className={`peer w-full h-10 bg-inherit border border-[#828FA3]/25 px-4 rounded text-white placeholder:opacity-25 placeholder:text-[.8125rem] placeholder:leading-6 placeholder:text-white placeholder:font-medium focus-within:outline-none ${
								error &&
								!boardData.name &&
								'outline outline-1 outline-[#EA5555]'
							}`}
						/>
						{error && !boardData.name && (
							<span className='absolute right-4 bottom-2 text-[#EA5555] font-medium text-[.8125rem] leading-6 peer-focus-within:hidden'>
								{error}
							</span>
						)}
					</div>
				)}
				<div className='mb-6'>
					<h3 className='text-xs font-bold mb-2 text-white'>Board Columns</h3>

					{boardData.columns.map((column) => (
						<div
							key={column._id ?? column.id}
							className='flex items-center gap-4 mb-3 relative'>
							<input
								type='text'
								placeholder='e.g. Web Design'
								value={column.name}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									handleChangeColumnName(
										e.target.value,
										column._id ?? column.id!
									)
								}
								id='columns'
								className={`peer w-full h-10 bg-inherit border border-[#828FA3]/25 px-4 rounded text-white placeholder:opacity-25 placeholder:text-[.8125rem] placeholder:leading-6 placeholder:text-white placeholder:font-medium focus-within:outline-none ${
									error && !column.name && 'outline outline-1 outline-[#EA5555]'
								}`}
							/>
							{action !== 'ADD_COLUMN' && (
								<svg width='15' height='15' xmlns='http://www.w3.org/2000/svg'>
									<g
										fill={`${error && !column.name ? '#EA5555' : '#828FA3'}`}
										fillRule='evenodd'
										className='cursor-pointer'
										onClick={() =>
											handleDeleteColumn(column._id ?? column.id!)
										}>
										<path d='m12.728 0 2.122 2.122L2.122 14.85 0 12.728z' />
										<path d='M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z' />
									</g>
								</svg>
							)}
							{error && !column.name && (
								<span className='absolute right-10 bottom-2 text-[#EA5555] font-medium text-[.8125rem] leading-6 peer-focus-within:hidden'>
									{error}
								</span>
							)}
						</div>
					))}

					<button
						className='w-full h-10 text-[#635FC7] font-bold text-[.8125rem] leading-6 bg-white rounded-[1.25rem]'
						onClick={handleAddColumnClick}
						type='button'>
						+ Add New Column
					</button>
				</div>

				<button
					className='w-full h-10 text-white font-bold text-[.8125rem] leading-6 bg-[#635FC7] hover:bg-[#A8A4FF] rounded-[1.25rem]'
					type='submit'>
					{action === 'EDIT_BOARD' || action === 'ADD_COLUMN'
						? 'Save Changes'
						: 'Create New Board'}
				</button>
			</form>

			{loading && <LoadingSpinner asOverlay />}
		</>
	);
}
export default CreateAndEditBoard;
