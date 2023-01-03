import { useContext } from 'react';
import { BoardContext } from '../context/BoardContext';

// Custom hook to return the context of BoardContext
export const useBoardContext = () => {
	const context = useContext(BoardContext);

	if (!context) {
		throw Error('useBoardContext must be used inside an BoardContextProvider');
	}

	return context;
};
