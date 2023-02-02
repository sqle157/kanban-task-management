// Interfaces
import { LoadingSpinnerProps } from '../shared/types/interfaces';

function LoadingSpinner({ asOverlay }: LoadingSpinnerProps) {
	return (
		<div
			className={`${
				asOverlay &&
				'absolute top-0 left-0 flex h-full w-full items-center justify-center bg-black/50'
			}`}>
			<div className='inline-block h-16 w-16 animate-spin after:m-[1px] after:block after:h-[2.875rem] after:w-[2.875rem] after:rounded-full after:border-[5px] after:border-solid after:border-white after:border-t-white after:border-r-transparent after:border-b-white after:border-l-transparent' />
		</div>
	);
}
export default LoadingSpinner;
