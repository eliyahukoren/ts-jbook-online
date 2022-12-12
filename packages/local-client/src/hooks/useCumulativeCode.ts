import { useTypedSelector } from "./useTypedSelector";

const showFunc = `
	import _React from 'react';
	import _ReactDOM from 'react-dom';

	var show = (value) => {
		const root = document.querySelector('#root');

		if (typeof value !== 'object'){
			root.innerHTML = value;
			return;
		}

		if( value.$$typeof && value.props ){
			_ReactDOM.render(value, root);
			return;
		}

		root.innerHTML = JSON.stringify(value);
}`;

const showFuncNoop = `var show = () => {}`;

export const useCumulativeCode = (cellId: string) => {
	return useTypedSelector((state) => {
		const { data, order } = state.cells;
		const orderedCells = order.map((id) => data[id]).filter(cell => cell.type === 'code');

		const cumulativeCode = [];

		for (let c of orderedCells) {
			if (c.id === cellId) {
				cumulativeCode.push(showFunc);
			} else {
				cumulativeCode.push(showFuncNoop);
			}

			cumulativeCode.push(c.content);

			if (c.id === cellId) {
				break;
			}
		}

		return cumulativeCode;
	}).join("\n");
};
