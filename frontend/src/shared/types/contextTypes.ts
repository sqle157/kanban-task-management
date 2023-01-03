import { IBoard } from './interfaces';

// Board Context Types
export type BoardInitialState = {
	boards: IBoard[];
	board: IBoard | null;
};

export type BoardContextType = BoardInitialState & {
	dispatch: React.Dispatch<BOARD_ACTION_TYPE>;
};

export type BOARD_ACTION_TYPE =
	| { type: 'SET_BOARDS'; payload: IBoard[] }
	| { type: 'SET_BOARD'; payload: IBoard }
	| { type: 'ADD_BOARD'; payload: IBoard }
	| { type: 'UPDATE_BOARD'; payload: IBoard }
	| { type: 'DELETE_BOARD'; payload: string };

// Modal Context Types
export type ModalInitialState = {
	modalOpen: boolean;
	modalAction: PAYLOAD_TYPE | null;
};

export type PAYLOAD_TYPE =
	| 'CREATE_BOARD'
	| 'EDIT_BOARD'
	| 'ADD_COLUMN'
	| 'DELETE_BOARD'
	| 'ADD_TASK'
	| 'EDIT_TASK'
	| 'DELETE_TASK';

export type MODAL_ACTION_TYPE =
	| { type: 'OPEN_MODAL'; payload: PAYLOAD_TYPE }
	| { type: 'CLOSE_MODAL' };

export type ModalContextType = ModalInitialState & {
	dispatch: React.Dispatch<MODAL_ACTION_TYPE>;
};
