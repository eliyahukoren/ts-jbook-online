export type CellTypes = 'code' | 'text';

export interface ICell {
	id: string;
	type: CellTypes;
	content: string;
}
