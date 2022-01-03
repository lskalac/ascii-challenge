import { map1 } from "./maps";
import { NEW_LINE } from "./types/Constants";
import PathDirection from "./types/PathDirection";
import IPathResult from "./types/PathResult";
import PathSpecialChar from "./types/PathSpecialChar";

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
    return map.trim().split(NEW_LINE).map(x => x.split(''));
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

function getNextPosition(coordinate: ICoordinate, direction: PathDirection): ICoordinate
{
    let x = coordinate.x, y = coordinate.y;
    switch(direction)
    {
        case PathDirection.Left:
            x = x - 1;
            break;
        case PathDirection.Right:
            x = x + 1;
            break;
        case PathDirection.Up:
            y = y - 1;
            break;
        case PathDirection.Down:
            y = y + 1;
            break;
    }

    return {
        x,
        y
    };
}

function getNextDirection(matrix: Array<string[]>, directionFrom: PathDirection, charPosition: ICoordinate): PathDirection
{
    const {x, y} = charPosition;
    if(directionFrom === PathDirection.Left || directionFrom === PathDirection.Right)
    {
        const above = matrix[x][y-1];
        if(above)
            return PathDirection.Up;

        const below = matrix[x][y+1];
        if(below)
            return PathDirection.Down;
    }
    else
    {
        const left = matrix[x-1][y];
        if(left)
            return PathDirection.Left;

        const right = matrix[x+1][y];
        if(right)
            return PathDirection.Right;
    }
}

function goToNext(matrix: Array<string[]>,  path: ICharInfo[]): void
{
    const current = path[path.length - 1];
    const { x, y } = getNextPosition(current.coordinate, current.direction);

    const char = matrix[x][y];

    let direction  = PathDirection.None;

    switch(char)
    {
        case PathSpecialChar.End:
        case PathSpecialChar.Horizontal:
        case PathSpecialChar.Vertical:
            break;
        default: 
                const currentD = current.direction;
                direction = getNextDirection(matrix, currentD, {x, y});
            break;
    }

    path.push({
        char,
        coordinate: {
            x, y
        },
        direction
    });
}

function extractLettersFromString(value: string): string
{
    return value.replace(/[\W\d_]/g, ''); 
}

function folowMap(map: string): IPathResult 
{
    validateCharUniquenes(map, PathSpecialChar.Start);
    validateCharUniquenes(map, PathSpecialChar.End);

    let pathChars: ICharInfo[] = [];

    const matrix = preparMapArray(map);

    const startPosition = findStart(matrix);

    console.log('start pos', startPosition);

    pathChars.push(startPosition);

    while(pathChars[pathChars.length - 1].char != PathSpecialChar.End)
    {
        goToNext(matrix, pathChars);
    }

    const path = pathChars.map(x => x.char).join('');
    const letters = extractLettersFromString(path);

    return {
        letters,
        path
    };
}

folowMap(map1);