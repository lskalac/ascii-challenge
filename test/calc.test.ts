import { add } from "../src/calc";

describe("Add two number", () => {
    it("Should return 15 for add(10,5)", ()  => {
        expect(add(10, 5)).toBe(15);
    });

    it("Should return -15 for add(-10,-5)", () => {
        expect(add(-10, -5)).toBe(-15);
    });

    it("Should return 15 for add(10,-5)", () => {
        expect(add(10, -5)).toBe(5);
    });

    it("Should return 15 for add(-10,5)", () => {
        expect(add(-10, 5)).toBe(-5);
    });
});