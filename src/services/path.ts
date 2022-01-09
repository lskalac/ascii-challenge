import IPathResult from "../types/PathResult";
import PathSpecialChar from "../types/PathSpecialChar";
import IPointInfo from "../types/PointInfo";
import { findStart, goToNext } from "../utils/path";
import { convertToMatrix, extractLetters, validateCharUniquenes } from "../utils/string";

function getLetters(points: IPointInfo[]): string
{
    let distinctPoints: IPointInfo[] = [];
    points.forEach(point => {
        if(!distinctPoints.find(x => x.coordinate.x === point.coordinate.x && x.coordinate.y === point.coordinate.y))
            distinctPoints.push(point)
    });

    return extractLetters(distinctPoints.map(x => x.char).join());
}

function followMap(map: string): IPathResult 
{
    validateCharUniquenes(map, PathSpecialChar.Start);
    validateCharUniquenes(map, PathSpecialChar.End);

    let pathChars: IPointInfo[] = [];

    const matrix = convertToMatrix(map);

    const startPosition = findStart(matrix);

    pathChars.push(startPosition);

    while(pathChars[pathChars.length - 1].char != PathSpecialChar.End)
    {
        goToNext(matrix, pathChars);
    }

    const path = pathChars.map(x => x.char).join('');
    const letters = getLetters(pathChars);

    return {
        letters,
        path
    };
}

export {
    followMap
}

