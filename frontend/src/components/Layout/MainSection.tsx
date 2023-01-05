import { FaArrowLeft } from 'react-icons/fa';
import { useBoardContext } from '../../hooks/useBoardContext';
// Components
import KanbanBoard from '../KanbanComponents/KanbanBoard';

function MainSection() {
	const { board, boards } = useBoardContext();

	return (
		<main
			className='relative ml-[300px] h-[calc(100%-6rem)] max-h-full w-[calc(100%-300px)]'
			id='main'>
			{board ? (
				<div className='h-full w-full overflow-x-visible pt-6 pl-6'>
					<KanbanBoard board={board} />
				</div>
			) : (
				<div className='flex h-full items-center justify-center gap-8'>
					<FaArrowLeft size={16} className='animate-pulse' />
					<h2 className='text-xl'>{`Please ${
						boards.length === 0 ? 'create' : 'select'
					} a board to start working.`}</h2>
				</div>
			)}
		</main>
	);
}
export default MainSection;
