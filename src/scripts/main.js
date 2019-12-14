const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const canvasNext = document.getElementById('next');
const ctxNext = canvasNext.getContext('2d');

let board = new Board(ctx, ctxNext);
let moves = {
    [KEY.LEFT]: p => ({ ...p, x: p.x - 1}),
    [KEY.RIGHT]: p => ({...p, x: p.x + 1}),
    [KEY.DOWN]: p => ({ ...p, y: p.y + 1}),
    [KEY.UP]: p => ({ ...p, shape: rotate(p) }),
    [KEY.SPACE]: p => ({ ...p, y: p.y + 1 })
};

function rotate(p) {
    let arr = p.shape;
    let rArr = JSON.parse(JSON.stringify(arr));
    let xLng, yLng = arr.length;

    arr.forEach((y, i) => {
        xLng = y.length;
        y.forEach((x, j) => {
            /*switch(multiple) {
                case 1:
                    rArr[j][xLng-i-1] = x;
                    break;
                case 2:
                    rArr[yLng-i-1][xLng-j-1] = x;
                    break;
                case 3:
                    rArr[yLng-j-1][i] = x;
                    break;
                default:
                    rArr[i][j] = x;
                    break;
            }*/
            rArr[j][xLng-i-1] = x;
        });
    });
    return rArr;
}

function play() {
    board.reset();
    let piece = new Piece(ctx);
    board.draw();
    keyEvent();
}

function keyEvent() {
    let p;

    document.addEventListener('keydown', event => {
        if(moves[event.keyCode]) {
            // Stop the event from bubbling
            event.preventDefault();

            // Get new state of piece
            p = moves[event.keyCode](board.piece);

            if(event.keyCode === KEY.SPACE) { // hard Drop
                while(board.valid(p)) {
                    board.piece.move(p);
                    p = moves[KEY.DOWN](board.piece);
                }
            } else if(event.keyCode === KEY.UP) {
                board.piece.rotate(p);
            } else {
                if(board.valid(p)) {
                    // If the move is valid, move the piece
                    board.piece.move(p);
                }
            }
            // Clear old position before drawing
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            board.draw();
        }
    });
}