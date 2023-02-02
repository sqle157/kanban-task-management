import { createContext, useReducer, useMemo, PropsWithChildren } from 'react';
import {
	ModalInitialState,
	ModalContextType,
	MODAL_ACTION_TYPE,
} from '../shared/types/contextTypes';

const initialState: ModalInitialState = {
	modalOpen: false,
	modalAction: null,
};

export const ModalContext = createContext<ModalContextType | null>(null);

// Reducer function
const modalReducer = (state: ModalInitialState, action: MODAL_ACTION_TYPE) => {
	switch (action.type) {
		case 'OPEN_MODAL':
			return {
				modalOpen: true,
				modalAction: action.payload,
			};
		case 'CLOSE_MODAL':
			return {
				modalOpen: false,
				modalAction: null,
			};
		default:
			return state;
	}
};

function ModalContextProvider({ children }: PropsWithChildren) {
	const [state, dispatch] = useReducer(modalReducer, initialState);
	const value = useMemo(() => ({ ...state, dispatch }), [state]);

	return (
		<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
	);
}

export default ModalContextProvider;
