import { useModalContext } from './hooks/useModalContext';
// Components
import MainSection from './components/Layout/MainSection';
import Navbar from './components/Layout/Navbar';
import SideDrawer from './components/Layout/SideDrawer';
import Modal from './components/Modals/Modal';

function App() {
	const { modalOpen } = useModalContext();

	return (
		<>
			<SideDrawer />
			<Navbar />
			<MainSection />
			{modalOpen && <Modal />}
		</>
	);
}

export default App;
