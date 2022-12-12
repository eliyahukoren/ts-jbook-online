import { CellTypes } from './../cell';
import { ActionTypes } from "../action-types";

export type Direction = 'up' | 'down';

export interface IMoveCellAction {
	type: ActionTypes.MOVE_CELL;
	payload: {
		id: string;
		direction: Direction;
	};
}

export interface IDeleteCellAction {
	type: ActionTypes.DELETE_CELL;
	payload: string;
}

export interface IInsertCellAfterAction {
	type: ActionTypes.INSERT_CELL_AFTER;
	payload: {
		id: string | null;
		type: CellTypes;
	};
}

export interface IUpdateCellAction {
	type: ActionTypes.UPDATE_CELL;
	payload: {
		id: string;
		content: string;
	};
}

export interface IBundleStartAction {
	type: ActionTypes.BUNDLE_START,
	payload: {
		cellId: string
	};
}

export interface IBindleCompleteAction {
	type: ActionTypes.BUNDLE_COMPLETE,
	payload: {
		cellId: string;
		bundle: {
			code: string,
			err: string
		}
	};
}

export type Action =
	| IDeleteCellAction
	| IInsertCellAfterAction
	| IUpdateCellAction
	| IMoveCellAction
	| IBundleStartAction
	| IBindleCompleteAction;
