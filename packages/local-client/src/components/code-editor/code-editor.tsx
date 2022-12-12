import { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import './code-editor.css';
import './syntax.css';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';

interface ICodeEditorProps {
	initialValue: string;
	onChange(value: string): void
}

const CodeEditor: React.FC<ICodeEditorProps> = ({ onChange, initialValue }) => {
	const editorRef = useRef<any>(null);
	const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

	const onEditorDidMount: EditorDidMount = (
		getValue,
		monacoEditor
	) => {
		editorRef.current = monacoEditor;
		monacoEditor.onDidChangeModelContent(() => {
			onChange(getValue());
		});

		monacoEditor.getModel()?.updateOptions({tabSize: 2});
		const hightligher = new Highlighter(
			// @ts-ignore
			window.monaco,
			codeShift,
			monacoEditor
		);

		hightligher.highLightOnDidChangeModelContent(
			() => {},
			() => {},
			undefined,
			() => {}
		);
	};

	const onFormatClick = () => {
		// get current value
		const unformatted = editorRef.current.getModel().getValue();

		// format that value
		const formatted = prettier.format(unformatted, {
			parser: 'babel',
			plugins: [parser],
			useTabs: false,
			semi: true,
			singleQuote: true
		}).replace(/\n$/, '');

		// set the formatted value back in the editor
		editorRef.current.setValue(formatted);
	}

	return (
		<div className="editor-wrapper">
			<button className='button button-format is-primary is-small is-rounded' onClick={onFormatClick}>Format</button>
			<MonacoEditor
				value={initialValue}
				editorDidMount={onEditorDidMount}
				height="100%"
				language="javascript"
				theme={isDarkTheme ? "dark" : "light"}
				options={{
					wordWrap: "on",
					minimap: { enabled: false },
					showUnused: false,
					folding: false,
					lineNumbersMinChars: 3,
					fontSize: 16,
					scrollBeyondLastLine: false,
					automaticLayout: true,
				}}
			/>
		</div>
	);
}

export default CodeEditor;
