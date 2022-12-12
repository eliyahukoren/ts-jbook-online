import { ICell } from "../../state";
import CodeCell from "../code-cell/code-cell";
import TextEditor from "../text-editor/text-editor";
import ActionBar from '../action-bar/action-bar';
import "./cell-list-item.css";

interface CellListItemProps {
	cell: ICell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
	const child: JSX.Element =
		cell.type === "code" ? (
			<>
				<div className="action-bar-wrapper">
					<ActionBar id={cell.id} />
				</div>
				<CodeCell cell={cell} />
			</>
		) : (
			<>
				<TextEditor cell={cell} />
				<ActionBar id={cell.id} />
			</>
		);

	return (
		<div className="cell-list-item">
			{child}
		</div>
	);
};

export default CellListItem;
