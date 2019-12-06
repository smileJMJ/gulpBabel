const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
let board = new Board();

// Calculate size of canvas constants
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// Scale blocks
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

function play() {
    board = board.getEmptyBoard();
    let piece = new Piece(ctx);
    piece.draw();
}