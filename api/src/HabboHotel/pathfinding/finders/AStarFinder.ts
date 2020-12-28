import Grid from "../Grid";
import { backtrace } from "../utils/functions";
import heuristic from "../utils/heuristic";
import Point from "../utils/Point";

class AStarFinder {
    private _allow_diagonal: boolean;
    private dont_cross_corners: boolean;
    private weight: number;

    constructor(private options?: FinderOptions) {
        this._allow_diagonal = options?.allow_diagonal ?? true;
        this.dont_cross_corners = options?.dont_cross_corners ?? true;
        this.weight = options?.weight ?? 1;
    }

    private get diagonal_movement(): DiagonalMovement {
        if (this.options && this.options.diagonal_movement) {
            return this.options.diagonal_movement;
        } else if (this._allow_diagonal) {
            return 'NEVER';
        } else if (this.dont_cross_corners) {
            return 'ONLY_WHEN_NO_OBSTACLES';
        } else {
            return 'IF_AT_MOST_ONE_OBSTACLE';
        }
    }

    protected get heuristic_internal(): (dx: number, dy: number) => number {
        if (this.options && this.options.heuristic) {
            return this.options.heuristic;
        } else if (this.diagonal_movement === 'NEVER') {
            return heuristic.manhattan;
        } else {
            return heuristic.octile;
        }
    }

    get heuristic(): (dx: number, dy: number) => number {
        return this.heuristic_internal;
    }

    set allow_diagonal(allow_diagonal: boolean) {
        this._allow_diagonal = allow_diagonal;
    }

    findPath(startX: number, startY: number, endX: number, endY: number, grid: Grid): Path {
        const [startPoint, endPoint] = [grid.getPointAt(startX, startY), grid.getPointAt(endX, endY)];
        const openList: Point[] = [];

        openList.push(startPoint);
        startPoint.opened = true;

        while (openList.length > 0) {
            openList.sort((a, b) => a.f - b.f);

            const currentPoint = openList.pop();
            currentPoint.closed = true;

            if (currentPoint === endPoint) {
                return backtrace(endPoint);
            }

            const neighbors = grid.getNeighbors(currentPoint, this.diagonal_movement);
            for (let i = 0; i < neighbors.length; ++i) {
                const neighbor = neighbors[i];

                if (neighbor.closed) {
                    continue;
                }

                const [x, y] = neighbor.toArray();
                const ng = currentPoint.g + ((x - currentPoint.getX() === 0 || y - currentPoint.getY() === 0) ? 1 : Math.SQRT2);

                if (!neighbor.opened || ng < neighbor.g) {
                    neighbor.g = ng;
                    neighbor.h = neighbor.h || this.weight * this.heuristic(Math.abs(x - endX), Math.abs(y - endY));
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.parent = currentPoint;

                    if (!neighbor.opened) {
                        openList.push(neighbor);
                        neighbor.opened = true;
                    } else {
                        openList.sort((a, b) => a.f - b.f);
                    }
                }
            }
        }

        return [];
    }
}

export default AStarFinder;
