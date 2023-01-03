import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import BoardContextProvider from './context/BoardContext';
import ModalContextProvider from './context/ModalContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BoardContextProvider>
			<ModalContextProvider>
				<App />
			</ModalContextProvider>
		</BoardContextProvider>
	</React.StrictMode>
);
