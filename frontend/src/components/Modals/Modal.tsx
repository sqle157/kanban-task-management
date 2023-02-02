import { useModalContext } from '../../hooks/useModalContext';
// Components
import Overlay from './Overlay';
import CreateAndEditBoard from './CreateAndEditBoard';
import DeleteModal from './DeleteModal';
import AddAndEditTask from './AddAndEditTask';
import ViewTask from './ViewTask';

function Modal() {
	const { modalAction } = useModalContext();

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
