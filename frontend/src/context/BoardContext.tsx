import { createContext, useReducer, useEffect, PropsWithChildren } from 'react';
import { useFetch } from '../hooks/useFetch';
// Types & Interfaces
import {
	BoardInitialState,
	BoardContextType,
	BOARD_ACTION_TYPE,
} from '../shared/types/contextTypes';
import { IBoard } from '../shared/types/interfaces';
// Components
import LoadingSpinner from '../components/LoadingSpinner';

const initialState: BoardInitialState = {
	boards: [],
	board: null,
};

export const BoardContext = createContext<BoardContextType | null>(null);

// Reducer function
const boardReducer = (state: BoardInitialState, action: BOARD_ACTION_TYPE) => {
	switch (action.type) {
		case 'SET_BOARDS': {
			return {
				...state,
				boards: action.payload,
			};
		}
		case 'SET_BOARD': {
			return {
				...state,
				board: action.payload,
			};
		}
		case 'ADD_BOARD': {
			return {
				...state,
				boards: [...state.boards, action.payload],
			};
		}
		case 'UPDATE_BOARD': {
			const newBoards = state.boards.map((board) => {
				if (board._id === action.payload._id) {
					board = { ...action.payload };
				}
				return board;
			});

			return {
				...state,
				boards: [...newBoards],
				board: { ...action.payload },
			};
		}
		case 'DELETE_BOARD': {
			const filteredBoards = state.boards.filter(
				(board) => board._id !== action.payload
			);

			return {
				...state,
				boards: [...filteredBoards],
				board: null,
			};
		}
		default:
			return state;
	}
};

const BoardContextProvider = ({ children }: PropsWithChildren) => {
	const [state, dispatch] = useReducer(boardReducer, initialState);
	const { sendFetchRequest, loading } = useFetch<IBoard[]>();

	useEffect(() => {
		const fetchBoards = async () => {
			try {
				const data = await sendFetchRequest('/api/boards');

				if (data && data.length > 0) {
					// Set the boards
					dispatch({ type: 'SET_BOARDS', payload: data });
				}
			} catch (error) {}
		};

		// Fetch the data
		fetchBoards();
	}, []);

	if (loading) {
		return <LoadingSpinner asOverlay />;
	}

	return (
		<BoardContext.Provider value={{ ...state, dispatch }}>
			{children}
		</BoardContext.Provider>
	);
};

export default BoardContextProvider;
