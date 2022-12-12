import { Dispatch } from "react";
import { Direction } from "./../actions/index";
import { CellTypes } from "./../cell";
import { ActionTypes } from "../action-types";
import {
	IDeleteCellAction,
	IUpdateCellAction,
	IInsertCellAfterAction,
	IMoveCellAction,
	Action
} from "../actions";
import bundle from "../../bundler";

export const updateCell = (id: string, content: string): IUpdateCellAction => {
	return {
		type: ActionTypes.UPDATE_CELL,
		payload: {
			id,
			content,
		},
	};
};

export const deleteCell = (id: string): IDeleteCellAction => {
	return {
		type: ActionTypes.DELETE_CELL,
		payload: id,
	};
};

export const moveCell = (id: string, direction: Direction): IMoveCellAction => {
	return {
		type: ActionTypes.MOVE_CELL,
		payload: {
			id,
			direction,
		},
	};
};

export const insertCellAfter = (
	id: string | null,
	cellType: CellTypes
): IInsertCellAfterAction => {
	return {
		type: ActionTypes.INSERT_CELL_AFTER,
		payload: {
			id,
			type: cellType,
		},
	};
};

export const createBundle = (cellId: string, input: string) => {
	return async (dispatch: Dispatch<Action>) => {
		dispatch({
			type: ActionTypes.BUNDLE_START,
			payload: {
				cellId
			}
		});

		const result = await bundle(input);

		dispatch({
			type: ActionTypes.BUNDLE_COMPLETE,
			payload: {
				cellId,
				bundle: result
			}
		});
	}
}
