let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");

let board = new Board(context);
let player1 = new Player("1", 150, this.context);
let player2 = new Player("2", 1080, this.context);
let img = new Image();

let coinsPlayer1 = player1.getCoins();
let coinsPlayer2 = player2.getCoins();

clearCanvas();

document.querySelector("#buttonStart").addEventListener("click", start);
function start() {
    board.createBoard();
    player1.createCoins();
    player2.createCoins(); 
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
