import { FaArrowLeft } from 'react-icons/fa';
import { useBoardContext } from '../../hooks/useBoardContext';
// Components
import KanbanBoard from '../KanbanComponents/KanbanBoard';

function MainSection() {
	const { board, boards } = useBoardContext();

	return (
		<main
			className='relative h-[calc(100%-6rem)] max-h-full sm:ml-[260px] sm:w-[calc(100%-260px)] lg:ml-[300px] lg:w-[calc(100%-300px)]'
			id='main'>
			{board ? (
				<div className='h-full overflow-x-visible pt-6 pl-6'>
					<KanbanBoard board={board} />
				</div>
			) : (
				<div className='flex h-full flex-col items-center justify-center gap-4 sm:flex-row sm:gap-3 lg:gap-8'>
					<FaArrowLeft
						size={16}
						className='rotate-90 animate-pulse sm:rotate-0'
					/>
					<h2 className='sm:text-base lg:text-xl'>{`Please ${
						boards.length === 0 ? 'create' : 'select'
					} a board to start working.`}</h2>
				</div>
			)}
		</main>
	);
}
export default MainSection;
