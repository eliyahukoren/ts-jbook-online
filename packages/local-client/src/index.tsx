import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { store } from './state';
import CellList from "./components/cell-list/cell-list";

import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
	return (
		<Provider store={store}>
			<div style={{ display: "flex", padding: 10 }}>
				<img
					src="favicon-32x32.png"
					style={{ width: 32, height: 32, marginRight: 10 }}
					alt="application logo"
				/>
				<h4 style={{ color: "#747474" }}>
					Interactive Coding Environment
				</h4>
			</div>
			<CellList />
		</Provider>
	);
};

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(<App />);


