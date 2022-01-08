import { NEW_LINE } from "../types/Constants";
import PathSpecialChar from "../types/PathSpecialChar";

function getNoOfOccurences(searchText: string, searchPattern: string): number{
    const parts = searchText.split(searchPattern);
    return parts.length - 1;
}

function validateCharUniquenes(text: string, char: string): void
{
    const noOfChars = getNoOfOccurences(text, char);
    if(noOfChars == 0)
        throw new Error(`Missing char: ${char}`);
    if(noOfChars > 1)
        throw new Error(`To many char: ${char}`);
}

function convertToMatrix(text: string): Array<Array<string>>
{
    return text.trim().split(NEW_LINE).map(x => x.split(''));
}

function extractLetters(value: string): string
{
    return value.replace(/[\W\d_]/g, '').replace(PathSpecialChar.End, ''); 
}

function isEmpty(text: string): boolean
{
    return text.replace(/\s/g,"") === "";
}

export {
    getNoOfOccurences,
    validateCharUniquenes,
    convertToMatrix,
    extractLetters,
    isEmpty
}