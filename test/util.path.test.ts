import path from "path/posix";
import { map1, map3, map11, map12, map2, map6, map8 } from "../src/data/maps";
import PathDirection from "../src/types/PathDirection";
import PathSpecialChar from "../src/types/PathSpecialChar";
import IPointInfo from "../src/types/PointInfo";
import { findStart, getNextDirection, getNextPosition, goToNext } from "../src/utils/path";
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
        expect(findStart(matrix)).toStrictEqual(expectedResult);
    });

    const matrix2 = convertToMatrix(map6);
    it("Throw an error when start doesn't exits", ()  => {
        expect(() => findStart(matrix2)).toThrow(Error);
    });

    const matrix3 = convertToMatrix(map12);
    it("Throw an error when multiple starting pahts exists", ()  => {
        expect(() => findStart(matrix3)).toThrow(Error);
    });
});

describe("Get next position", () => {
    it("Decrease y for left direction", ()  => {
        expect(getNextPosition({x:2,y:3}, PathDirection.Left)).toStrictEqual({x: 2, y: 2});
    });

    it("Decrease x for up direction", ()  => {
        expect(getNextPosition({x:2,y:3}, PathDirection.Up)).toStrictEqual({x: 1, y: 3});
    });

    it("Increase y for right direction", ()  => {
        expect(getNextPosition({x:2,y:3}, PathDirection.Right)).toStrictEqual({x: 2, y: 4});
    });

    it("Increase x for down direction", ()  => {
        expect(getNextPosition({x:2,y:3}, PathDirection.Down)).toStrictEqual({x: 3, y: 3});
    });
});

describe("Get next direction", () => {
    const matrix = convertToMatrix(map1);
    it("Return down from horizontal with existing down value", ()  => {
        expect(getNextDirection(matrix, PathDirection.Right, {x: 0, y: 8}, '+', [])).toBe(PathDirection.Down);
    });

    it("Return up from horizontal with existing up value", ()  => {
        expect(getNextDirection(matrix, PathDirection.Right, {x: 4, y: 4}, '+', [])).toBe(PathDirection.Up);
    });

    it("Return left from vertical with existing left value", ()  => {
        expect(getNextDirection(matrix, PathDirection.Up, {x: 2, y: 4}, '+', [])).toBe(PathDirection.Left);
    });

    const matrix2 = convertToMatrix(map2);
    it("Return right from vertical with existing right value", ()  => {
        expect(getNextDirection(matrix2, PathDirection.Up, {x: 1, y: 2}, 'x', [])).toBe(PathDirection.Right);
    });goToNext
});

describe("Go to next", () => {
    const matrix = convertToMatrix(map1);
    it("Should should not change direction for horizontal", ()  => {
        const currentPoint: IPointInfo = {
            char: PathSpecialChar.Horizontal,
            direction: PathDirection.Right,
            coordinate: {
                x: 0,
                y: 1
            }
        };
        const expectedNextPoint = {
            char: PathSpecialChar.Horizontal,
            direction: PathDirection.Right,
            coordinate: {
                x: 0,
                y: 2
            }
        };
        let points: IPointInfo[] = [currentPoint];
        goToNext(matrix, points);
        expect(points).toStrictEqual([currentPoint, expectedNextPoint]);
    });

    it("Should should not change direction for letter that is not on turn", ()  => {
        const currentPoint: IPointInfo = {
            char: 'C',
            direction: PathDirection.Down,
            coordinate: {
                x: 2,
                y: 8
            }
        };
        const expectedNextPoint = {
            char: PathSpecialChar.Vertical,
            direction: PathDirection.Down,
            coordinate: {
                x: 3,
                y: 8
            }
        };
        let points: IPointInfo[] = [currentPoint];
        goToNext(matrix, points);
        expect(points).toStrictEqual([currentPoint, expectedNextPoint]);
    });

    it("Should change direction for +", ()  => {
        const currentPoint: IPointInfo = {
            char: PathSpecialChar.Horizontal,
            direction: PathDirection.Right,
            coordinate: {
                x: 0,
                y: 7
            }
        };
        const expectedNextPoint = {
            char: PathSpecialChar.DirectionChange,
            direction: PathDirection.Down,
            coordinate: {
                x: 0,
                y: 8
            }
        };
        let points: IPointInfo[] = [currentPoint];
        goToNext(matrix, points);
        expect(points).toStrictEqual([currentPoint, expectedNextPoint]);    
    });

    /** TODO **/

    // it("Should should not change direction for letter that is not on turn", ()  => {
    //     const currentPoint: IPointInfo = {
    //         char: '|',
    //         direction: PathDirection.Down,
    //         coordinate: {
    //             x: 1,
    //             y: 8
    //         }
    //     };
    //     const expectedNextPoint = {
    //         char: 'C',
    //         direction: PathDirection.Down,
    //         coordinate: {
    //             x: 2,
    //             y: 8
    //         }
    //     };
    //     let points: IPointInfo[] = [currentPoint];
    //     goToNext(matrix, points);
    //     expect(points).toStrictEqual([currentPoint, expectedNextPoint]);
    // });

    // it("Should change direction for letter on the corner", ()  => {
    //     const m = convertToMatrix(map3);
    //     const currentPoint: IPointInfo = {
    //         char: 'C',
    //         direction: PathDirection.Down,
    //         coordinate: {
    //             x: 3,
    //             y: 8
    //         }
    //     };
    //     const expectedNextPoint = {
    //         char: '-',
    //         direction: PathDirection.Left,
    //         coordinate: {
    //             x: 3,
    //             y: 7
    //         }
    //     };
    //     let points: IPointInfo[] = [currentPoint];
    //     goToNext(m, points);
    //     expect(points).toStrictEqual([currentPoint, expectedNextPoint]);    
    // });

    it("Should trow an error for a missing value(broken path)", ()  => {
        const brokenMatrix = convertToMatrix(map11);
        const currentPoint: IPointInfo = {
            direction: PathDirection.Down,
            coordinate: {
                x: 1,
                y: 5
            },
            char: PathSpecialChar.Vertical
        };
        expect(() => goToNext(brokenMatrix, [currentPoint])).toThrow(Error);
    });
});