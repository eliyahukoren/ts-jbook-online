const initialCells = [
	{
		content:
			"This is an interactive coding environment. \n\nYou can write Javascript, import any NPM modules and see it executed, and write comprehensive documentation using markdown.\n\n1. Click any text cell (including this one) to edit it\n\n2. Click any text cell (including this one) to edit it\n\n3. You can show any React component, string, number or anything else by calling show function. This is a function built into this environment. Call show multiple times to show multiple values.\n\n4. Re-order or delete cells using the buttons on the top right\n\n5. Add new cells by hovering on the divider between cells\n\nAll of your changes get saved to the file you opened jBook with. \n\nSo if your run npx jsnote-ek serve test.js, all of the text and code you write will be saved to the test.js that located in the same directory where you run command.",
		type: "text",
		id: "rke48",
	},
	{
		content:
			"import { useState } from 'react';\n\nconst Counter = () => {\n  const [count, setCount] = useState(0);\n  return(\n    <div>\n      <button onClick={() => setCount(count + 1)}>Click +</button>\n      <button onClick={() => setCount(count - 1)}>Click -</button>\n      <h1>Count: {count}</h1>\n    </div>\n  );\n}\n\n// display any variable or React component by calling 'show' function\nshow(<Counter />);",
		type: "code",
		id: "0b1yc",
	},
	{
		content:
			"const App = () => {\n  return (\n    <div>\n      <h1>App Says Hi!</h1>\n      <i>Counter component will be rendered bellow. ...</i>\n      <hr />\n      {/*\n        Counter was declared in an earlier cell -\n        we can refernce it here \n      */}\n      <Counter />\n    </div>\n  )\n}\n\nshow(<App />);",
		type: "code",
		id: "n7vai",
	},
];

export default initialCells;
