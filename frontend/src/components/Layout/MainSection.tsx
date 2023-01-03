import { useBoardContext } from '../../hooks/useBoardContext';
// Icons
import { FaArrowLeft } from 'react-icons/fa';
// Components
import KanbanBoard from '../KanbanComponents/KanbanBoard';

function MainSection() {
	const { board, boards } = useBoardContext();

	return (
		<main
			className='w-[calc(100%-300px)] h-[calc(100%-6rem)] max-h-full ml-[300px] relative'
			id='main'>
			{board ? (
				<div className='w-full h-full pt-6 pl-6 overflow-x-visible'>
					<KanbanBoard board={board} />
				</div>
			) : (
				<div className='h-full flex gap-8 justify-center items-center'>
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
