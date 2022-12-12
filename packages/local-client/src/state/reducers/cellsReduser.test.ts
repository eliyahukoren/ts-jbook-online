import { store } from "./../store";
import { ActionTypes } from "../action-types";

// TODO: Please create for me test, please :)
// const sum = (num1, num2) => num1 + num2

// function* sumSaga() {
// 	let value = 0;

// 	value = yield call(sum, value, 1);
// 	value = yield call(sum, value, 2);

// 	yield value;
// }

// it("sumSaga should yield the correct values", () => {
// 	const gen = sumSaga();
// 	let value = 0;

// 	expect(gen.next().value).toEqual(call(sumSaga, value, 1));
// 	expect(gen.next(1).value).toEqual(call(sumSaga, value, 2));
// 	expect(gen.next().value).toBeUndefined();
// });

describe("some description", () => {
	beforeAll(() => {});
	it("should return initial state", () => {
		store.dispatch({
			type: ActionTypes.INSERT_CELL_AFTER,
			payload: {
				id: null,
				type: "text",
			},
		});
		const res = store.getState();
		expect(res.cells).toBeDefined();
		const id = res.cells?.order[0] as string;
		expect(res.cells?.data[id].content).toBe("");
	});
});
