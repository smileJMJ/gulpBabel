class Board {
    constructor(grid) {
        this.grid = grid;
    }

    // Reset the board when we start a new game.
    reset() {
        this.grid = this.getEmptyBoard();
    }

    // Get matrix fileed with zeros.
    getEmptyBoard() {
        return Array.from({length: ROWS}, () => Array(COLS).fill(0));
    }
}