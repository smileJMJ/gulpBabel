const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

let board = new Board(ctx);
let moves = {
    [KEY.LEFT]: p => ({ ...p, x: p.x - 1}),
    [KEY.RIGHT]: p => ({...p, x: p.x + 1}),
    [KEY.DOWN]: p => ({ ...p, y: p.y + 1}),
    [KEY.UP]: p => ({ ...p, y: p.y - 1 }),
    [KEY.SPACE]: p => ({ ...p, y: p.y + 1 })
};

// Calculate size of canvas constants
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// Scale blocks
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

// 회전 버튼 이벤트 - 나중에 지우기
let buttonObj = document.getElementsByClassName('btnRotate');
Object.keys(buttonObj).forEach((v, i) => {
   buttonObj[v].addEventListener('click', (e) => {
       let $btn = e.target;
       let p = board.piece;
       rotate(p, Number($btn.dataset.button));
   });
});

function rotate(p, deg) {
    let multiple = deg / 90;
    //let arr = p.shape;
    let arr = [[0,2,0], [2,2,2], [0,0,0]];
    let rArr = JSON.parse(JSON.stringify(arr));
    let xLng, yLng = arr.length;
console.log('arr', arr)
    arr.forEach((y, i) => {
        xLng = y.length;
        console.log(y);
        y.forEach((x, j) => {
            rArr[j][xLng-i-1] = x;
        });
    })
    console.log(rArr);
}

function play() {
    board.reset();
    let piece = new Piece(ctx);
    piece.draw();
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
            } else {
                if(board.valid(p)) {
                    // If the move is valid, move the piece
                    board.piece.move(p);
                }
            }
            // Clear old position before drawing
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            board.piece.draw();
        }
    });
}