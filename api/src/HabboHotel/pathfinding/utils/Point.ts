class Point {
    public parent: Point | null;

    public f: number;
    public g: number;
    public h: number;

    public opened: boolean;
    public closed: boolean;

    constructor(
        private readonly x: number,
        private readonly y: number,
        private walkable: boolean = true,
    ) {
        this.parent = null;

        this.f = 0;
        this.g = 0;
        this.h = 0;

        this.opened = false;
        this.closed = false;
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    toArray(): [number, number] {
        return [this.x, this.y];
    }

    isWalkable(): boolean {
        return this.walkable;
    }

    setWalkable(walkable: boolean): void {
        this.walkable = walkable;
    }
}

export default Point;
