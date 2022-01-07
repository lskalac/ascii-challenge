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

function getNextDirection(matrix: Array<Array<string>>, directionFrom: PathDirection, charPosition: ICoordinate): PathDirection
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

    throw new Error('Broken path');
}

function goToNext(matrix: Array<Array<string>>, path: IPointInfo[]): void
{
    const current = path[path.length - 1];
    const { x, y } = getNextPosition(current.coordinate, current.direction);

    const char = matrix[x][y];
    if(!char)
        throw new Error('Broken path')

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

export {
    getNextPosition,
    getNextDirection,
    findStart,
    goToNext
}