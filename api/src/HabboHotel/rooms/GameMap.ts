import BestFirstFinder from "@HabboHotel/pathfinding/finders/BestFirstFinder";
import Grid from "@HabboHotel/pathfinding/Grid";
import HabboRoom from "./HabboRoom";

class GameMap {
    private tiles: (0 | 1)[][];
    private tilesZ: number[][];

    private pathfinding: BestFirstFinder;

    constructor(private room: HabboRoom) {
        this.tiles = [];
        this.tilesZ = [];

        this.pathfinding = new BestFirstFinder();

        this.generateMap();
    }

    generateMap() {
        const { floor } = this.room.getRoom().model;

        const columns = floor.split('\n');
        for (let y = 0; y < columns.length; y++) {
            const rows = columns[y].split('');

            this.tiles[y] = [];
            this.tilesZ[y] = [];

            if (y !== 0 && rows.length !== columns[y - 1].length) {
                throw new Error('Invalid tilesmap.');
            }

            for (let x = 0; x < rows.length; x++) {
                const tile = columns[y][x];

                if (tile === 'x') {
                    this.tiles[y][x] = 0;
                    this.tilesZ[y][x] = -1;
                } else if (!isNaN(Number(tile))) {
                    this.tiles[y][x] = 1;
                    this.tilesZ[y][x] = Number(tile);
                } else {
                    throw new Error(`Invalid tile: ${tile}.`);
                }
            }
        }
    }

    getGrid(): Grid {
        return new Grid(this.tiles);
    }

    getPathfinding(): BestFirstFinder {
        return this.pathfinding;
    }

    get sizeX(): number {
        return this.tiles[0].length;
    }

    get sizeY(): number {
        return this.tiles.length;
    }

    isValidTile(x: number, y: number): boolean {
        return x >= 0 && x < this.sizeX && y >= 0 && y < this.sizeY;
    }

    tileHasUser(x: number, y: number): boolean {
        return this.room.getUsersManager().getHabbos().find((habbo) => habbo.getCoords().x === x && habbo.getCoords().y === y) != null;
    }

    getTileHeight(x: number, y: number): number {
        return this.tilesZ[y][x];
    }
}

export default GameMap;
