import AStarFinder from "./AStarFinder";

class BestFirstFinder extends AStarFinder {
    constructor(options?: FinderOptions) {
        super(options);
    }

    get heuristic(): (dx: number, dy: number) => number {
        return (dx: number, dy: number): number => (this.heuristic_internal(dx, dy) * 1000000)
    }
}

export default BestFirstFinder;
