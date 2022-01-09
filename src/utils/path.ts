import ICoordinate from "../types/Coordinate";
import PathDirection from "../types/PathDirection";
import PathSpecialChar from "../types/PathSpecialChar";
import IPointInfo from "../types/PointInfo";
import { isEmpty } from "./string";

function findStart(matrix: Array<Array<string>>): IPointInfo
{
    for(var i = 0; i < matrix.length; i++)
    {
        const row = matrix[i];
        const y = row.findIndex(x => x === PathSpecialChar.Start);
        if(y >= 0)
        {
            let nextToChars = [];
            if(i + 1 < matrix.length)
                nextToChars.push({char: matrix[i+1][y], direction: PathDirection.Down});
            if(i - 1 >= 0)
                nextToChars.push({char: matrix[i-1][y], direction: PathDirection.Up});
            if(y + 1 < row.length)
                nextToChars.push({char: matrix[i][y+1], direction: PathDirection.Right});
            if(y - 1 >= 0)
                nextToChars.push({char: matrix[i][y-1], direction: PathDirection.Left});
            
            const nonEmptyChars = nextToChars.filter(x => !isEmpty(x.char));

            if(!nonEmptyChars.length)
                throw new Error('Broken path');

            if(nonEmptyChars.length > 1)
                throw new Error('Multiple starting paths');

            const direction = nonEmptyChars[0].direction;

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
            y = y - 1;
            break;
        case PathDirection.Right:
            y = y + 1;
            break;
        case PathDirection.Up:
            x = x - 1;
            break;
        case PathDirection.Down:
            x = x + 1;
            break;
    }

    return {
        x,
        y
    };
}

function charExists(matrix: Array<Array<string>>, coordinate: ICoordinate): boolean
{
    const {x, y} = coordinate;

    if(matrix[x] && (matrix[x][y]) && !isEmpty(matrix[x][y]))
        return true;

    return false;
}

function getNextDirection(matrix: Array<Array<string>>, directionFrom: PathDirection, charPosition: ICoordinate, char: string, path: IPointInfo[]): PathDirection
{
    const {x, y} = charPosition;

    if(char != PathSpecialChar.DirectionChange)
    {
        const nextPosition = getNextPosition(charPosition, directionFrom);
        if(matrix[nextPosition.x] && matrix[nextPosition.x][nextPosition.y])
            return directionFrom;
    }

    if(directionFrom === PathDirection.Left || directionFrom === PathDirection.Right)
    {
        if(charExists(matrix, {x: x-1, y}))
            return PathDirection.Up;

        if(charExists(matrix, {x: x+1, y}))
            return PathDirection.Down;
    }
    else
    {
        if(charExists(matrix, {x, y: y-1}))
            return PathDirection.Left;

        if(charExists(matrix, {x, y: y+1}))
            return PathDirection.Right;
    }

    throw new Error('Broken path');
}

function goToNext(matrix: Array<Array<string>>, path: IPointInfo[]): void
{
    const current = path[path.length - 1];
    const { x, y } = getNextPosition(current.coordinate, current.direction);

    const char = matrix[x][y];
    if(isEmpty(char))
        throw new Error('Broken path')

    let point: IPointInfo = {
        char,
        coordinate: {
            x,
            y
        },
        direction: PathDirection.None
    };

    switch(char)
    {
        case PathSpecialChar.End:
            break;
        case PathSpecialChar.Horizontal:
        case PathSpecialChar.Vertical:
            point.direction = current.direction;
            break;
        default: 
            point.direction = getNextDirection(matrix, current.direction, {x, y}, char, path);
            break;
    }

    path.push(point);
}

export {
    getNextPosition,
    getNextDirection,
    findStart,
    goToNext
}