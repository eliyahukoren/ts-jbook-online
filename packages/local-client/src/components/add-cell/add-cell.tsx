import { useActions } from "../../hooks/useActions";
import AddCellButton from "../add-cell-button/add-cell-button";
import "./add-cell.css";

interface IAddCellProps {
	previousCellId: string | null;
	forceVisible?: boolean;
}

const AddCell: React.FC<IAddCellProps> = ({ forceVisible, previousCellId }) => {
	const { insertCellAfter } = useActions();

	return (
		<div className={`add-cell ${forceVisible && "force-visible"}`}>
			<div className="add-buttons">
				<AddCellButton
					onClick={() => insertCellAfter(previousCellId, "code")}
					caption="Code"
				/>
				<AddCellButton
					onClick={() => insertCellAfter(previousCellId, "text")}
					caption="Text"
				/>
			</div>
			<div className="divider"></div>
		</div>
	);
};

export default AddCell;
