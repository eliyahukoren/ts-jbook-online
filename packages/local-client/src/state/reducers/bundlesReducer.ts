import produce from 'immer';
import { ActionTypes } from '../action-types';
import { Action } from '../actions';

interface IBundleState {
	[key: string]: {
		loading: boolean;
		code: string;
		err: string
	} | undefined;
}

const initialState: IBundleState = {};

const reducer = produce((state: IBundleState = initialState, action: Action): IBundleState => {
	switch(action.type){
		case ActionTypes.BUNDLE_START:
			state[action.payload.cellId] = {
				loading: true,
				code: '',
				err: ''
			}
			return state;
		case ActionTypes.BUNDLE_COMPLETE:
			state[action.payload.cellId] = {
				loading: false,
				code: action.payload.bundle.code,
				err: action.payload.bundle.err
			}
			return state;
		default:
			return state;
	}
}, initialState);

export default reducer;
