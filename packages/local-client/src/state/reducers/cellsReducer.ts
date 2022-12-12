import { ICell } from "./../cell";
import { ActionTypes } from "../action-types";
import { Action } from "../actions";
import produce from "immer";
import { randomId } from "../../utils/helpers";

interface ICellsState {
	loading: boolean;
	error: string | null;
	order: string[];
	data: {
		[key: string]: ICell;
	};
}

const initialState: ICellsState = {
	loading: false,
	error: null,
	order: [],
	data: {},
};

// deal with data via immer lib !!!!
const reducer = produce((state: ICellsState = initialState, action: Action) => {
	switch (action.type) {
		case ActionTypes.UPDATE_CELL:
			const { id, content } = action.payload;
			// because of immer lib it's simple !!!
			state.data[id].content = content;
			return state;
		case ActionTypes.DELETE_CELL:
			delete state.data[action.payload];
			state.order = state.order.filter(
				(id) => id !== action.payload
			) as string[];
			return state;
		case ActionTypes.MOVE_CELL:
			const { direction } = action.payload;
			const index = state.order.findIndex((id) => id === action.payload.id);
			const targetIndex = direction === "up" ? index - 1 : index + 1;

			// exit if move is out of range
			if (targetIndex < 0 || targetIndex > state.order.length) {
				return state;
			}

			state.order[index] = state.order[targetIndex];
			state.order[targetIndex] = action.payload.id;

			return state;
		case ActionTypes.INSERT_CELL_AFTER:
			const cell: ICell = {
				content: "",
				type: action.payload.type,
				id: randomId(),
			};

			state.data[cell.id] = cell;

			const idx = state.order.findIndex((id) => id === action.payload.id);

			if (idx < 0) {
				state.order.unshift(cell.id);
			} else {
				state.order.splice(idx + 1, 0, cell.id);
			}

			return state;
		default:
			return state;
	}
}, initialState);

export default reducer;