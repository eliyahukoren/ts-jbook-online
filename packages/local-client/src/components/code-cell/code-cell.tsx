import { useEffect } from "react";
import CodeEditor from "../code-editor/code-editor";
import Preview from "../preview/preview";
import Resizable from "../resizable/resizable";
import { Cell } from "../../state";
import { useActions } from "../../hooks/useActions";
import { useCumulativeCode } from "../../hooks/useCumulativeCode";
import {useTypedSelector} from "../../hooks/useTypedSelector";

import './code-cell.css';
import ProgressBar from "../progress-bar/progress-bar";

interface CodeCellProps {
	cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
	const { updateCell, createBundle } = useActions();
	const bundle = useTypedSelector((state) => state.bundles[cell.id]);
	const cumulativeCode = useCumulativeCode(cell.id);

	useEffect(() => {
		if (!bundle) {
			createBundle(cell.id, cumulativeCode);
			return;
		}

		const timer = setTimeout(async () => {
			createBundle(cell.id, cumulativeCode);
		}, 750);

		return () => {
			clearTimeout(timer);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cell.id, cumulativeCode, createBundle]);

	return (
		<Resizable direction="vertical">
			<div
				style={{
					height: "calc(100% - 10px)",
					display: "flex",
					flexDirection: "row",
				}}
			>
				<Resizable direction="horizontal">
					<CodeEditor
						onChange={(value) => updateCell(cell.id, value)}
						initialValue={cell.content}
					/>
				</Resizable>
				<div className="progress-wrapper">
					{!bundle || bundle.loading ? (
						<ProgressBar />
					) : (
						<Preview code={bundle.code} err={bundle.err} />
					)}
				</div>
			</div>
		</Resizable>
	);
};

export default CodeCell;
