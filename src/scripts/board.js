class Board {
    constructor(ctx, ctxNext) {
        this.ctx = ctx;
        this.ctxNext = ctxNext;
        this.init();
        this.initNext();
    }
    init() {
        // Calculate size of canvas constants
        this.ctx.canvas.width = COLS * BLOCK_SIZE;
        this.ctx.canvas.height = ROWS * BLOCK_SIZE;

        // Scale blocks
        this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
    }
    initNext() {
        this.ctxNext.width = 4 * BLOCK_SIZE;
        this.ctxNext.height = 4 * BLOCK_SIZE;
        this.ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);
    }
    reset() { // Reset the board when we start a new game.
        this.grid = this.getEmptyGrid();
        this.piece = new Piece(this.ctx);
        this.getNewPiece();
    }
    draw() {
        this.piece.draw();
        this.drawBoard();
    }
    drawBoard() {
        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if(value > 0) {
                    this.ctx.fillStyle = COLORS[value];
                    this.ctx.fillRect(x, y, 1, 1);
                }
            })
        });
    }
    getNewPiece() {
        this.next = new Piece(this.ctxNext);
        this.ctxNext.clearRect(0, 0, this.ctxNext.width, this.ctxNext.height);
        this.next.draw();
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
    getEmptyGrid() { // Get matrix filed with zeros.
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