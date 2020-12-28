interface FinderOptions {
    allow_diagonal?: boolean;
    dont_cross_corners?: boolean;
    diagonal_movement?: DiagonalMovement;
    heuristic?: (dx: number, dy: number) => number;
    weight?: number;
}
