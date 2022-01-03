import { getNoOfOccurences } from "../src/utils/string";

describe("Get number of occurences", () => {
    it("Should return 0 for empty string", ()  => {
        expect(getNoOfOccurences('', 't')).toBe(0);
    });

    it("Should return 2 for string with two characted occurences", () => {
        expect(getNoOfOccurences('test@aaa@aa', '@')).toBe(2);
    });
});