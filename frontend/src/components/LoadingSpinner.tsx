// Interfaces
import { LoadingSpinnerProps } from '../shared/types/interfaces';

const LoadingSpinner = (props: LoadingSpinnerProps) => {
	return (
		<div
			className={`${
				props.asOverlay &&
				'flex justify-center items-center h-full w-full absolute top-0 left-0 bg-black/50'
			}`}>
			<div className='animate-spin inline-block w-16 h-16 after:block after:w-[2.875rem] after:h-[2.875rem] after:m-[1px] after:rounded-full after:border-solid after:border-[5px] after:border-white after:border-t-white after:border-r-transparent after:border-b-white after:border-l-transparent'></div>
		</div>
	);
};
export default LoadingSpinner;
