import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { ActionTypes } from './action-types';

export const store = createStore(reducers, {}, applyMiddleware(thunk));

// TODO: remove initial test data

store.dispatch({
	type: ActionTypes.INSERT_CELL_AFTER,
	payload: {
		id: null,
		type: 'code'
	}
});

store.dispatch({
	type: ActionTypes.INSERT_CELL_AFTER,
	payload: {
		id: null,
		type: "text",
	},
});

store.dispatch({
	type: ActionTypes.INSERT_CELL_AFTER,
	payload: {
		id: null,
		type: "code",
	},
});

store.dispatch({
	type: ActionTypes.INSERT_CELL_AFTER,
	payload: {
		id: null,
		type: "text",
	},
});


