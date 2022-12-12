import { useEffect, useRef } from 'react';
import './preview.css';

interface PreviewProps {
	code: string;
	err: string;
}

const html = `
	<html>
		<head>
			<meta charset="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="theme-color" content="#000000" />
			<style>html { background: #ececec;}</style>
		</head>
		<body>
			<div id="root"></div>
			<script>

				const handleError = (err) => {
					const root = document.getElementById('root');
					root.innerHTML = '<div style="color: red;"><h4>Runtime error:</h4>' + err + '</div>';
					throw err;
				};

				window.addEventListener('error', (event) => {
					event.preventDefault();
					handleError(event.error);
				});

				window.addEventListener('message',(event) => {
					try{
						eval(event.data);
					}catch(err){
						handleError(err);
					}
				}, false)
			</script>
		</body>
	</html>
	`;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
	const iframe = useRef<any>(null);

	useEffect(() => {
		iframe.current.srcdoc = html;

		setTimeout(() => {
			iframe.current.contentWindow.postMessage(code, "*");
		}, 50);
	}, [code]);


	return (
		<div className="preview-wrapper">
			<iframe
				title="code preview"
				ref={iframe}
				sandbox="allow-scripts"
				srcDoc={html}
			></iframe>
			{ err && <div className="preview-error"><h4>Runtime error:</h4>{err}</div>}
		</div>
	);
};

export default Preview;
