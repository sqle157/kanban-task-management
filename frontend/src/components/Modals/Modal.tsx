import { useModalContext } from '../../hooks/useModalContext';
// Components
import Overlay from './Overlay';
import CreateAndEditBoard from './CreateAndEditBoard';
import DeleteBoard from './DeleteBoard';
import AddAndEditTask from './AddAndEditTask';

function Modal() {
	const { modalAction } = useModalContext();

	// Delete board action
	if (modalAction === 'DELETE_BOARD') {
		return (
			<Overlay>
				<DeleteBoard />
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
