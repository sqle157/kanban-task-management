import {
	createContext,
	useReducer,
	useEffect,
	useMemo,
	PropsWithChildren,
} from 'react';
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
	task: null,
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
					const newBoard = { ...action.payload };

					return newBoard;
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
		case 'SET_TASK': {
			return {
				...state,
				task: action.payload,
			};
		}
		case 'ADD_TASK': {
			// Add the task to the column
			const newCurrentColumns = state.board?.columns.map((column) => {
				if (column._id === action.payload.column) {
					const newColumn = {
						...column,
						tasks: [...column.tasks, action.payload],
					};

					return newColumn;
				}

				return column;
			});

			// Update the current board
			const newCurrentBoard = {
				...state.board,
				columns: newCurrentColumns
					? [...newCurrentColumns]
					: state.board && [...state.board.columns],
			};

			// Update the board list
			const newBoards = state.boards.map((board) => {
				if (board._id === newCurrentBoard._id) {
					const newBoard = { ...newCurrentBoard };

					return newBoard;
				}

				return board;
			});

			return {
				boards: [...newBoards],
				board: { ...newCurrentBoard },
				task: null,
			} as BoardInitialState;
		}
		default:
			return state;
	}
};

function BoardContextProvider({ children }: PropsWithChildren) {
	const [state, dispatch] = useReducer(boardReducer, initialState);
	const { sendFetchRequest, loading } = useFetch<IBoard[]>();
	const value = useMemo(() => ({ ...state, dispatch }), [state]);

	useEffect(() => {
		const fetchBoards = async () => {
			try {
				const data = await sendFetchRequest('/api/boards');

				if (data && data.length > 0) {
					// Set the boards
					dispatch({ type: 'SET_BOARDS', payload: data });
				}
			} catch (error) {
				/* empty */
			}
		};

		// Fetch the data
		fetchBoards();
	}, []);

	if (loading) {
		return <LoadingSpinner asOverlay />;
	}

	return (
		<BoardContext.Provider value={value}>{children}</BoardContext.Provider>
	);
}

export default BoardContextProvider;
