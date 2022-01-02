import { NEW_LINE } from "./types/Constants";
import PathDirection from "./types/PathDirection";
import IPathResult from "./types/PathResult";
import PathSpecialChar from "./types/PathSpecialChar";

console.log('hello world!');

interface ICoordinate
{
    x: number;
    y: number;
}

interface ICharInfo
{
    char: string,
    coordinate: ICoordinate,
    direction: PathDirection
}

function getNoOfOccurences(searchText: string, searchPattern: string): number{
    const parts = searchText.split(searchPattern);
    return parts.length - 1;
}

function validateCharUniquenes(map: string, char: PathSpecialChar)
{
    const noOfChars = getNoOfOccurences(map, char);
    if(noOfChars == 0)
        throw new Error(`Missing char: ${char}`);
    if(noOfChars > 1)
        throw new Error(`To many char: ${char}`);
}

function preparMapArray(map: string): Array<string[]>
{
    return map.split(NEW_LINE).map(x => x.split(''));
}

function findStart(matrix: Array<string[]>): ICharInfo
{
    for(var i = 0; i < matrix.length; i++)
    {
        const row = matrix[i];
        const y = row.findIndex(x => x === PathSpecialChar.Start);
        if(y >= 0)
        {
            if(row[y-1] && row[y+1])
                throw new Error('Multiple Staring paths');
            
            const direction = row[y-1] ? PathDirection.Left : PathDirection.Right;

            return {
                char: PathSpecialChar.Start,
                coordinate: {
                    x: i,
                    y: y
                },
                direction: direction
            };

        }
    }

    throw new Error(`Missing char: ${PathSpecialChar.Start}`)
}

function goToNext(matrix: Array<string[]>, current: ICharInfo, path: ICharInfo[]): void
{

}

function extractLettersFromString(value: string): string
{
    return value.replace(/[\W\d_]/g, ''); 
}

function foolowMap(map: string): IPathResult 
{
    validateCharUniquenes(map, PathSpecialChar.Start);
    validateCharUniquenes(map, PathSpecialChar.End);

    let pathChars: ICharInfo[] = [];

    const matrix = preparMapArray(map);

    const startPosition = findStart(matrix);

    while(pathChars[pathChars.length - 1].char != PathSpecialChar.End)
    {
    }

    const path = pathChars.map(x => x.char).join('');
    const letters = extractLettersFromString(path);

    return {
        letters,
        path
    };
}