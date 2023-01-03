import ReactDOM from 'react-dom';
import { PropsWithChildren, useRef } from 'react';
import { useModalContext } from '../../hooks/useModalContext';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

function Overlay({ children }: PropsWithChildren) {
	const { dispatch } = useModalContext();
	// useOnClickOutside reference
	const ref = useRef(null);
	useOnClickOutside<HTMLDivElement>(ref, () => {
		dispatch({ type: 'CLOSE_MODAL' });
	});

	return ReactDOM.createPortal(
		<div
			id='overlay'
			className='grid place-items-center fixed inset-0 w-full bg-black/50 z-10'>
			<div
				className='w-[min(30rem,100%-3rem)] bg-[#2B2C37] mx-auto my-0 p-8'
				ref={ref}>
				{children}
			</div>
		</div>,
		document.getElementById('modal') as HTMLElement
	);
}
export default Overlay;
