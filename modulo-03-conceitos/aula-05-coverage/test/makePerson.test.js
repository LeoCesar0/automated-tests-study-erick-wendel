import { it, expect } from "@jest/globals";
import { describe } from "node:test";
import { makePerson } from "../src/makePerson";

const sum = (a, b) => {
    return a + b
};


it('sums numbers', () => {
    expect(sum(1, 2)).toEqual(3);
})


describe('makePerson Test Suite', () => {

    describe('successful cases', () => {
        it('should return a person object', () => {
            const person = makePerson('{"name": "Lucas", "age": 22}');
            expect(person).toEqual({
                name: "Lucas",
                age: 22,
                createdAt: expect.any(Date)
            })
        })
    })

    describe('error cases', () => {
        it('should throw an error', () => {
            expect(() => makePerson('{"name"}')).toThrow('Unexpected token } in JSON at position 7')
        })
    })

})