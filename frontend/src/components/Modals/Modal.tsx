import { useModalContext } from '../../hooks/useModalContext';
// Components
import Overlay from './Overlay';
import CreateAndEditBoard from './CreateAndEditBoard';
import DeleteModal from './DeleteModal';
import AddAndEditTask from './AddAndEditTask';
import ViewTask from './ViewTask';
import ViewBoard from './ViewBoard';

function Modal() {
	const { modalAction } = useModalContext();

	// View board action (in mobile only)
	if (modalAction === 'VIEW_BOARD') {
		return (
			<Overlay
				overlayClassName='fixed inset-0 z-10 grid w-full place-items-start bg-black/50 py-20'
				containerClassName='mx-auto my-0 w-[min(30rem,100%-3rem)] rounded-lg bg-[#2B2C37] py-6 pr-6'>
				<ViewBoard />
			</Overlay>
		);
	}
	// Delete board and delete task action
	if (modalAction === 'DELETE_BOARD' || modalAction === 'DELETE_TASK') {
		return (
			<Overlay>
				<DeleteModal action={modalAction} />
			</Overlay>
		);
	}

	// Add task and edit task action
	if (modalAction === 'ADD_TASK' || modalAction === 'EDIT_TASK') {
		return (
			<Overlay>
				<AddAndEditTask action={modalAction} />
			</Overlay>
		);
	}

	// View task action
	if (modalAction === 'VIEW_TASK') {
		return (
			<Overlay>
				<ViewTask />
			</Overlay>
		);
	}

	return (
		<Overlay>
			{(modalAction === 'CREATE_BOARD' ||
				modalAction === 'EDIT_BOARD' ||
				modalAction === 'ADD_COLUMN') && (
				<CreateAndEditBoard action={modalAction} />
			)}
		</Overlay>
	);
}
export default Modal;
