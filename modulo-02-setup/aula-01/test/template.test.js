import { it, expect } from "@jest/globals";

const sum = (a, b) => {
    return a + b
};


it('sums numbers', () => {
    expect(sum(1, 2)).toEqual(3);
})