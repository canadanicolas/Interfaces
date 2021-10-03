let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");
let board = new Board(context);

let img = new Image();

clearCanvas();
document.querySelector("#buttonStart").addEventListener("click", start);
function start() {
    board.createBoard(); 
    document.querySelector("#buttonStart").className = "Hidden";
    document.querySelector("#buttonRestart").className = "Button";
}

function drawCanvas() {
    clearCanvas();
    board.drawBoard();
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "rgba(255,255,255,1)";
    context.fill();
}
