export function Manhattan(dx: number, dy: number): number {
    return dx + dy;
}

export function Euclidean(dx: number, dy: number): number {
    return Math.sqrt(dx * dx + dy * dy);
}

export function Octile(dx: number, dy: number): number {
    const F = Math.SQRT2 - 1;
    return (dx < dy) ? F * dx + dy : F * dy + dx;
}

export function Chebyshev(dx: number, dy: number): number {
    return Math.max(dx, dy);
}

export default {
    manhattan: Manhattan,
    euclidean: Euclidean,
    octile: Octile,
    chebyshev: Chebyshev,
};
