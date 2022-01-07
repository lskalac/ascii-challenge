import { map1, map11, map6, map8 } from "../src/data/maps";
import PathDirection from "../src/types/PathDirection";
import PathSpecialChar from "../src/types/PathSpecialChar";
import IPointInfo from "../src/types/PointInfo";
import { findStart, getNextDirection, getNextPosition } from "../src/utils/path";
import { convertToMatrix } from "../src/utils/string";

describe("Find start", () => {
    const matrix = convertToMatrix(map1);
    const expectedResult: IPointInfo = {
        direction: PathDirection.Right,
        char: PathSpecialChar.Start,
        coordinate: {
            x: 0,
            y: 0
        }
    };
    it("Return position when start exists", ()  => {
        expect(findStart(matrix)).toBe(expectedResult);
    });

    const matrix2 = convertToMatrix(map6);
    it("Throw an error when start doesn't exits", ()  => {
        expect(() => findStart(matrix2)).toThrow(Error);
    });

    const matrix3 = convertToMatrix(map8);
    it("Throw an error when multiple starts exists", ()  => {
        expect(() => findStart(matrix3)).toThrow(Error);
    });
});

describe("Get next position", () => {
    it("Decrease x for left direction", ()  => {
        expect(getNextPosition({x:2,y:3}, PathDirection.Left)).toBe({x: 1, y: 3});
    });

    it("Decrease y for up direction", ()  => {
        expect(getNextPosition({x:2,y:3}, PathDirection.Up)).toBe({x: 2, y: 4});
    });

    it("Increase x for right direction", ()  => {
        expect(getNextPosition({x:2,y:3}, PathDirection.Right)).toBe({x: 3, y: 3});
    });

    it("Increase y for down direction", ()  => {
        expect(getNextPosition({x:2,y:3}, PathDirection.Down)).toBe({x: 2, y: 4});
    });
});

describe("Get next direction", () => {
    const matrix = convertToMatrix(map1);
    it("Return down from horizontal with existing down value", ()  => {
        expect(getNextDirection(matrix, PathDirection.Right, {x: 0, y: 8})).toBe(PathDirection.Down);
    });

    it("Return up from horizontal with existing up value", ()  => {
        expect(getNextDirection(matrix, PathDirection.Right, {x: 4, y: 4})).toBe(PathDirection.Up);
    });

    it("Return left from vertical with existing left value", ()  => {
        expect(getNextDirection(matrix, PathDirection.Right, {x: 2, y: 4})).toBe(PathDirection.Left);
    });

    /** TODO */
    // it("Return right from vertical with existing right value", ()  => {
    //     expect(getNextDirection(matrix, PathDirection.Right, {x: 0, y: 3})).toBe(PathDirection.Right);
    // });

    const brokenMatrix = convertToMatrix(map11);
    it("Should trow an error for a missing value", ()  => {
        expect(() => getNextDirection(brokenMatrix, PathDirection.Down, {x:2, y: 5})).toThrow(Error);
    });
});

describe("Go to next", () => {
    /** TODO */
});