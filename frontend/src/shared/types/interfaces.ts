import { ReactNode } from 'react';
import { MODAL_PAYLOAD_TYPE } from './contextTypes';

// Subtask definition
interface ISubtask {
	_id?: string;
	id?: string;
	title: string;
	isCompleted: boolean;
}

// Task definition
export interface ITask {
	_id?: string;
	title: string;
	description: string;
	status: string;
	column: string;
	position: number;
	subtasks: ISubtask[];
	boardId: string;
}

// Column definition
export interface IColumn {
	_id?: string; // Mongo ID
	id?: string; // temporary ID for column that haven't been added to the db
	name: string;
	tasks: ITask[];
}

// Board definition
export interface IBoard {
	_id?: string;
	name: string;
	columns: IColumn[];
}

// LoadingSpinner Props
export interface LoadingSpinnerProps {
	asOverlay?: boolean;
}

// Overlay Props
export interface OverlayProps {
	children?: ReactNode;
	overlayClassName?: string;
	containerClassName?: string;
}

// DeleteModal Props
export interface DeleteModalProps {
	action: Exclude<
		MODAL_PAYLOAD_TYPE,
		| 'ADD_TASK'
		| 'EDIT_TASK'
		| 'VIEW_TASK'
		| 'ADD_COLUMN'
		| 'EDIT_BOARD'
		| 'CREATE_BOARD'
		| 'VIEW_BOARD'
	>;
}

// CreateAndEditBoard Props
export interface CreateAndEditBoardProps {
	action: Exclude<
		MODAL_PAYLOAD_TYPE,
		| 'DELETE_BOARD'
		| 'ADD_TASK'
		| 'EDIT_TASK'
		| 'DELETE_TASK'
		| 'VIEW_TASK'
		| 'VIEW_BOARD'
	>;
}

// CreateAndEditBoard Props
export interface AddAndEditTaskProps {
	action: Exclude<
		MODAL_PAYLOAD_TYPE,
		| 'DELETE_BOARD'
		| 'CREATE_BOARD'
		| 'EDIT_BOARD'
		| 'DELETE_TASK'
		| 'ADD_COLUMN'
		| 'VIEW_TASK'
		| 'VIEW_BOARD'
	>;
}
