import { map14 } from "../src/data/maps";
import { convertToMatrix, extractLetters, getNoOfOccurences, validateCharUniquenes } from "../src/utils/string";

describe("Get number of occurences", () => {
    it("Should return 0 for empty string", ()  => {
        expect(getNoOfOccurences('', 't')).toBe(0);
    });

    it("Should return 2 for string with two characted occurences", () => {
        expect(getNoOfOccurences('test@aaa@aa', '@')).toBe(2);
    });

    it("Should return 1 if string begings with given character", () => {
        expect(getNoOfOccurences('@aaa', '@')).toBe(1);
    });
});

describe("Validate char uniquenes", () => {
    it("Should not throw error if string contains one char", ()  => {
        expect(() => validateCharUniquenes('t@test', '@')).not.toThrow(Error);
    });

    it("Should not throw error if string begins with char", ()  => {
        expect(() => validateCharUniquenes('@test', '@')).not.toThrow(Error);
    });

    it("Should throw error if string doesn't contain char", ()  => {
        expect(() => validateCharUniquenes('test', '@')).toThrow(Error);
    });

    it("Should throw error if string contain multiple chars", ()  => {
        expect(() => validateCharUniquenes('@test@test', '@')).toThrow(Error);
    });
});

describe("Convert to matrix", () => {
    it("Should convert empty string to empty array", () => {
        expect(convertToMatrix('')).toStrictEqual([[]]);
    });

    it("Should return correct array for sam map", () => {
        expect(convertToMatrix(map14)).toStrictEqual([['@', '-', '-', 'A'], [' ',' ',' ', '|'], [' ',' ',' ','x']])
    });
});

describe("Extract letters", () => {
    it("Should return string with letters only", ()  => {
        expect(extractLetters('sa2291!8_Ab')).toBe("saAb");
    });

    it("Empty string should return empty string", ()  => {
        expect(extractLetters("")).toBe("");
    });

    it("String with no letters should return empty string", ()  => {
        expect(extractLetters("98232!!_#")).toBe("");
    });
});