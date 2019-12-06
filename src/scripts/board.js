class Board {
    constructor(ctx) {
        this.ctx = ctx;
        this.piece = new Piece(this.ctx);
    }

    reset() { // Reset the board when we start a new game.
        this.grid = this.getEmptyBoard();
    }
    valid(p) {
        return p.shape.every((row, dy) => {
            return row.every((value, dx) => {
                let x = p.x + dx;
                let y = p.y + dy;
                return (value === 0 || (this.insideWalls(x) && this.aboveFloor(y) && this.notOccupied(x, y)))
            })
        })
    }
    getEmptyBoard() { // Get matrix filed with zeros.
        return Array.from({length: ROWS}, () => Array(COLS).fill(0));
    }
    insideWalls(x) {
        return (x >= 0) && (x < COLS);
    }
    aboveFloor(y) {
        return y <= ROWS;
    }
    notOccupied(x, y) {
        return this.grid[y] && this.grid[y][x] === 0;
    }
}