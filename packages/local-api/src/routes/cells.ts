import path from "path";
import express from "express";
import fs from "fs/promises";
import initialCells from '../helpers';

interface Cell {
	id: string;
	content: string;
	type: 'code' | 'text';
}

interface LocalApiError {
	code: string;
}

export const createCellsRouter = (filename: string, dirName: string) => {
	const router = express.Router();
	router.use(express.json());

	const fullPath = path.join(dirName, filename);

	router.get("/cells", async (req, res) => {
		const isLocalApiError = (err: any): err is LocalApiError => {
			return typeof err.code === "string";
		};

		try {
			// read file
			const result = await fs.readFile(fullPath, {encoding: 'utf-8'});

			res.send(JSON.parse(result));
		} catch (err) {
			if (isLocalApiError(err)) {
				if (err.code === "ENOENT") {
					await fs.writeFile(fullPath, JSON.stringify(initialCells), "utf-8");
					res.send(initialCells);
				}
			} else {
				throw err;
			}
		}

		// read the file
		// parse a list of cells out of it
		// send list of cells bact to browser
	});

	router.post("/cells", async (req, res) => {
		// take the list of cells from request obj
		// serialize them
		const { cells }: { cells: Cell } = req.body;

		// write the cells into the file
		await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");

		res.send({ status: "ok" });
	});

	return router;
};
