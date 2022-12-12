import { ResizableBox, ResizableBoxProps } from "react-resizable";
import { useEffect, useState } from "react";
import "./resizable.css";

interface ResizableProps {
	direction: "horizontal" | "vertical";
	children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
	let resizableProps: ResizableBoxProps;

	const [innerHeight, setInnerHeight] = useState(window.innerHeight);
	const [innerWidth, setInnerWidth] = useState(window.innerWidth);
	const [width, setWidth ] = useState(window.innerWidth);

	useEffect(() => {
		const listener = () => {
			let timer: any;

			if (timer) {
				clearTimeout(timer);
			}

			timer = setTimeout(() => {
				setInnerHeight(window.innerHeight);
				setInnerWidth(window.innerWidth);
				if(window.innerWidth * 0.75 < width){
					setWidth(window.innerWidth * 0.75);
				}
			}, 100);
		};

		window.addEventListener("resize", listener);

		return () => {
			window.removeEventListener("resize", listener);
		};
	}, [width]);

	if (direction === "horizontal") {
		resizableProps = {
			className: "resize-horizontal",
			minConstraints: [innerWidth * 0.2, Infinity],
			maxConstraints: [innerWidth * 0.75, Infinity],
			height: Infinity,
			width: width,
			resizeHandles: ["e"],
			onResizeStop: (_, data) => { setWidth(data.size.width) }
		};
	} else {
		resizableProps = {
			height: 300,
			width: Infinity,
			maxConstraints: [Infinity, innerHeight * 0.95],
			minConstraints: [Infinity, 50],
			resizeHandles: ["s"],
		};
	}
	return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
