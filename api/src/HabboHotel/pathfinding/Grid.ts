import Point from "./utils/Point";

class Grid {
    private width: number;
    private height: number;

    private points: Point[][];

    constructor(private matrix: (0 | 1)[][], fromPoints?: Point[][]) {
        this.width = fromPoints ? fromPoints[0].length : this.matrix[0].length;
        this.height = fromPoints?.length ?? this.matrix.length;

        this.points = fromPoints ?? this._buildPoints();
    }

    private _buildPoints(): Point[][] {
        const points: Point[][] = [];

        for (let y = 0; y < this.height; y++) {
            points[y] = [];

            for (let x = 0; x < this.width; x++) {
                points[y][x] = new Point(x, y, this.matrix[y][x] === 1);
            }
        }

        return points;
    }

    getPointAt(x: number, y: number): Point {
        return this.points[y][x];
    }

    isValidPoint(x: number, y: number): boolean {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    getNeighbors(point: Point, diagonal_movement: DiagonalMovement) {
        const [x, y] = point.toArray();
        const neighbors: Point[] = [];
        let [s0, d0, s1, d1, s2, d2, s3, d3] = Array.from({ length: 8 }).map(() => false);

        // ↑
        if (this.isValidPoint(x, y - 1) && this.getPointAt(x, y - 1).isWalkable()) {
            neighbors.push(this.getPointAt(x, y - 1));
            s0 = true;
        }

        // →
        if (this.isValidPoint(x + 1, y) && this.getPointAt(x + 1, y).isWalkable()) {
            neighbors.push(this.getPointAt(x + 1, y));
            s1 = true;
        }

        // ↓
        if (this.isValidPoint(x, y + 1) && this.getPointAt(x, y + 1).isWalkable()) {
            neighbors.push(this.getPointAt(x, y + 1));
            s2 = true;
        }

        // ←
        if (this.isValidPoint(x - 1, y) && this.getPointAt(x - 1, y).isWalkable()) {
            neighbors.push(this.getPointAt(x - 1, y));
            s3 = true;
        }

        if (diagonal_movement === 'NEVER') {
            return neighbors;
        }

        if (diagonal_movement === 'ONLY_WHEN_NO_OBSTACLES') {
            d0 = s3 && s0;
            d1 = s0 && s1;
            d2 = s1 && s2;
            d3 = s2 && s3;
        } else if (diagonal_movement === 'IF_AT_MOST_ONE_OBSTACLE') {
            d0 = s3 || s0;
            d1 = s0 || s1;
            d2 = s1 || s2;
            d3 = s2 || s3;
        } else {
            d0 = true;
            d1 = true;
            d2 = true;
            d3 = true;
        }

        // ↖
        if (d0 && this.isValidPoint(x - 1, y - 1) && this.getPointAt(x - 1, y - 1).isWalkable()) {
            neighbors.push(this.getPointAt(x - 1, y - 1));
        }

        // ↗
        if (d1 && this.isValidPoint(x + 1, y - 1) && this.getPointAt(x + 1, y - 1).isWalkable()) {
            neighbors.push(this.getPointAt(x + 1, y - 1));
        }

        // ↘
        if (d2 && this.isValidPoint(x + 1, y + 1) && this.getPointAt(x + 1, y + 1).isWalkable()) {
            neighbors.push(this.getPointAt(x + 1, y + 1));
        }

        // ↙
        if (d3 && this.isValidPoint(x - 1, y + 1) && this.getPointAt(x - 1, y + 1).isWalkable()) {
            neighbors.push(this.getPointAt(x - 1, y + 1));
        }

        return neighbors;
    }

    clone(): Grid {
        return new Grid([], this.points);
    }
}

export default Grid;
