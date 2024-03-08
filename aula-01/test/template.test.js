import { it } from "@jest/globals";

const sum = (a, b) => a + b;


it('sums numbers', () => {
    expect(sum(1, 2)).toEqual(3);
})