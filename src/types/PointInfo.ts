import ICoordinate from "./Coordinate";
import PathDirection from "./PathDirection";

export default interface IPointInfo
{
    char: string,
    coordinate: ICoordinate,
    direction: PathDirection
}