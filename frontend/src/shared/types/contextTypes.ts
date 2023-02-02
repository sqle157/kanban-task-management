import { IBoard, ITask } from './interfaces';

// ---------- Board Context Types ------------- //
export type BoardInitialState = {
	boards: IBoard[];
	board: IBoard | null;
	task: ITask | null;
};

export type BOARD_ACTION_TYPE =
	| { type: 'SET_BOARDS'; payload: IBoard[] }
	| { type: 'SET_BOARD'; payload: IBoard }
	| { type: 'ADD_BOARD'; payload: IBoard }
	| { type: 'UPDATE_BOARD'; payload: IBoard }
	| { type: 'DELETE_BOARD'; payload: string }
	| { type: 'SET_TASK'; payload: ITask }
	| { type: 'ADD_TASK'; payload: ITask }
	| { type: 'UPDATE_TASK'; payload: ITask }
	| { type: 'DELETE_TASK'; payload: string };

export type BoardContextType = BoardInitialState & {
	dispatch: React.Dispatch<BOARD_ACTION_TYPE>;
};

// ---------- Modal Context Types ------------- //
export type ModalInitialState = {
	modalOpen: boolean;
	modalAction: MODAL_PAYLOAD_TYPE | null;
};

export type MODAL_PAYLOAD_TYPE =
	| 'CREATE_BOARD'
	| 'EDIT_BOARD'
	| 'ADD_COLUMN'
	| 'DELETE_BOARD'
	| 'ADD_TASK'
	| 'EDIT_TASK'
	| 'DELETE_TASK'
	| 'VIEW_TASK';

export type MODAL_ACTION_TYPE =
	| { type: 'OPEN_MODAL'; payload: MODAL_PAYLOAD_TYPE }
	| { type: 'CLOSE_MODAL' };

export type ModalContextType = ModalInitialState & {
	dispatch: React.Dispatch<MODAL_ACTION_TYPE>;
};
