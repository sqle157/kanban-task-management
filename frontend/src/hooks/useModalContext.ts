import { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';

// Custom hook to return the context of BoardContext
// eslint-disable-next-line import/prefer-default-export
export const useModalContext = () => {
	const context = useContext(ModalContext);

	if (!context) {
		throw Error('useModalContext must be used inside an ModalContextProvider');
	}

	return context;
};
