import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { store } from './state';
import CellList from "./components/cell-list/cell-list";

import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
	return (
		<Provider store={store}>
			<CellList />
		</Provider>
	);
};

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(<App />);


