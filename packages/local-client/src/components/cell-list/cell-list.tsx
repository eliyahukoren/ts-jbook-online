import { Fragment, useEffect } from "react";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import AddCell from "../add-cell/add-cell";
import CellListItem from "../cell-list-item/cell-list-item";
import { useActions } from "../../hooks/useActions";

import './cell-list.css';

const CellList: React.FC = () => {
	const cells = useTypedSelector(({ cells: { order, data } }) =>
		order.map((id) => data[id])
	);

	const { fetchCells, saveCells } = useActions();

	useEffect(() => {
		fetchCells();
	}, []);

	useEffect(() => {
		saveCells();
	},[JSON.stringify(cells)]);

	const renderedCells = cells.map((cell) => (
		<Fragment key={cell.id}>
			<CellListItem cell={cell} />
			<AddCell previousCellId={cell.id} />
		</Fragment>
	));

	return (
		<div className="cell-list">
			<AddCell forceVisible={cells.length === 0} previousCellId={null} />
			{renderedCells}
		</div>
	);
};

export default CellList;
