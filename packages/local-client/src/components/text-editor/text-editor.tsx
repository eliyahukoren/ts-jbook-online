import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./text-editor.css";
import { Cell } from "../../state";
import { useActions } from "../../hooks/useActions";

interface TextEditorProps {
	cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
	const { updateCell } = useActions();

	const [editing, setEditing] = useState(false);
	const editorRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const listener = (event: MouseEvent) => {

			if (
				editorRef.current &&
				event.target &&
				editorRef.current.contains(event.target as Node)
			) {
				return;
			}

			setEditing(false);
		};
		document.addEventListener("click", listener, { capture: true });

		return () =>
			document.removeEventListener("click", listener, { capture: true });
	}, []);

	if (editing) {
		return (
			<div className="text-editor" ref={editorRef}>
				<MDEditor onChange={(v) => updateCell(cell.id, v || '')} value={cell.content} />
			</div>
		);
	}

	return (
		<div className="text-editor card" onClick={() => setEditing(true)}>
			<div className="card-content">
				<MDEditor.Markdown source={cell.content || 'Click to edit'} />
			</div>
		</div>
	);
};

export default TextEditor;
