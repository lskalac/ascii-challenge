import { map1, map10, map11, map12, map13, map2, map3, map4, map5, map6, map7, map8, map9 } from "../src/data/maps";
import { followMap } from "../src/services/path";
import IPathResult from "../src/types/PathResult";

describe("Follow map", () => {
    /*************************  VALID CASES  ********************/
    it("Should return correct path for basic example", ()  => {
        const expectedResult: IPathResult = {
            path: '@---A---+|C|+---+|+-B-x',
            letters: 'ACB'
        };
        expect(followMap(map1)).toBe(expectedResult);
    });

    it("Should go straight to intersection", ()  => {
        const expectedResult: IPathResult = {
            path: '@|A+---B--+|+--C-+|-||+---D--+|x',
            letters: 'ABCD'
        };
        expect(followMap(map2)).toBe(expectedResult);
    });

    it("Should switch direction on some letters", ()  => {
        const expectedResult: IPathResult = {
            path: '@---A---+|||C---+|+-B-x',
            letters: 'ACB'
        };
        expect(followMap(map3)).toBe(expectedResult);    
    });

    it("Shouldn't collect a letter from the same location twice", ()  => {
        const expectedResult: IPathResult = {
            path: '@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x',
            letters: 'GOONIES'
        };
        expect(followMap(map4)).toBe(expectedResult);    
    });

    it("Should keep direction even in a compact space", ()  => {
        const expectedResult: IPathResult = {
            path: '@B+++B|+-L-+A+++A-+Hx',
            letters: 'BLAH'
        };
        expect(followMap(map5)).toBe(expectedResult);   
    });

    /*************************  INVALID CASES  ********************/
    it("Should trow an error for a map with no start", ()  => {
        expect(() => followMap(map6)).toThrow(Error);
    });

    it("Should trow an error for a map with no end", ()  => {
        expect(() => followMap(map7)).toThrow(Error);
    });

    it("Should trow an error for a map with multiple starts", ()  => {
        expect(() => followMap(map8)).toThrow(Error);
    });

    it("Should trow an error for a map with multiple ends", ()  => {
        expect(() => followMap(map9)).toThrow(Error);
    });

    it("Should trow an error for a map with T forks", ()  => {
        expect(() => followMap(map10)).toThrow(Error);
    });

    it("Should trow an error for a broken path", ()  => {
        expect(() => followMap(map11)).toThrow(Error);
    });

    it("Should trow an error for a multiple starting paths", ()  => {
        expect(() => followMap(map12)).toThrow(Error);
    });

    it("Should trow an error for a fake turn path", ()  => {
        expect(() => followMap(map13)).toThrow(Error);
    });
});