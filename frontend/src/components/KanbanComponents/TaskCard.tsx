// Interface
import { TaskCardProps } from '../../shared/types/interfaces';

const TaskCard = ({ task }: TaskCardProps) => {
	return (
		<div className='group cursor-pointer px-4 py-6 mb-5 bg-[#2B2C37] rounded-lg shadow-md shadow-[rgba(54,78,126,0.101545)]'>
			<h3 className='text-white group-hover:text-[#635FC7] font-bold text-[.9375rem] leading-5 mb-2'>
				{task.title}
			</h3>
			<span className='text-xs text-[#828FA3] leading-[.9375rem] font-bold '>
				{task.subtasks.filter((subtask) => subtask.isCompleted).length} of{' '}
				{task.subtasks.length} subtasks
			</span>
		</div>
	);
};
export default TaskCard;
