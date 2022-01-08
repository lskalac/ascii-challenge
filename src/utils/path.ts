import ICoordinate from "../types/Coordinate";
import PathDirection from "../types/PathDirection";
import PathSpecialChar from "../types/PathSpecialChar";
import IPointInfo from "../types/PointInfo";

function findStart(matrix: Array<Array<string>>): IPointInfo
{
    for(var i = 0; i < matrix.length; i++)
    {
        const row = matrix[i];
        const y = row.findIndex(x => x === PathSpecialChar.Start);
        if(y >= 0)
        {
            if(row[y-1] && row[y+1])
                throw new Error('Multiple staring paths');
            
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

function existAndNotUsed(matrix: Array<Array<string>>, coordinate: ICoordinate, char: string, path: IPointInfo[])
{
    const {x, y} = coordinate;

    if(matrix[x] && matrix[x][y])
        return !path.find(point => point.char === char && point.coordinate.x === x && point.coordinate.y === point.coordinate.y );

    return false;
}

function getNextDirection(matrix: Array<Array<string>>, directionFrom: PathDirection, charPosition: ICoordinate, char: string, path: IPointInfo[]): PathDirection
{
    const {x, y} = charPosition;
    if(directionFrom === PathDirection.Left || directionFrom === PathDirection.Right)
    {
        if(existAndNotUsed(matrix, {x: x-1, y}, char, path))
            return PathDirection.Up;

        if(existAndNotUsed(matrix, {x: x+1, y}, char, path))
            return PathDirection.Down;
    }
    else
    {
        if(existAndNotUsed(matrix, {x: x-1, y}, char, path))
            return PathDirection.Left;

        if(existAndNotUsed(matrix, {x: x+1, y}, char, path))
            return PathDirection.Right;
    }

    throw new Error('Broken path');
}

function goToNext(matrix: Array<Array<string>>, path: IPointInfo[]): void
{
    const current = path[path.length - 1];
    const { x, y } = getNextPosition(current.coordinate, current.direction);

    const char = matrix[x][y];
    if(!char)
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
                const currentD = current.direction;
                point.direction = getNextDirection(matrix, currentD, {x, y}, char, path);
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