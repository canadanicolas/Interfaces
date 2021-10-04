let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");

let board = new Board(context);
let player1 = new Player("1", 150, this.context);
let player2 = new Player("2", 1080, this.context);
let img = new Image();

let coinsPlayer1 = player1.getCoins();
let coinsPlayer2 = player2.getCoins();

let isMouseDown = false;
let lastClickedFigure = null;
let oldPosition = 0;
let posicionFichasY = 800;

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
    for (let i = 0; i < coinsPlayer1.length; i++) {
        let coin1 = coinsPlayer1[i];
        let coin2 = coinsPlayer2[i];
        if (coin1 !== null) {
            coin1.drawCoin(player1.getPlayer());
        }
        if (coin2 !== null) {
            coin2.drawCoin(player2.getPlayer());
        }
    }
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "rgba(255,255,255,1)";
    context.fill();
}

canvas.addEventListener('mousedown', function () {              
    isMouseDown = true;
    let clickedFigure = findClickedFigure(event.layerX, event.layerY);
    if (clickedFigure != null) {
        lastClickedFigure = clickedFigure;
        oldPosition = clickedFigure.getPosition();
    }
    canvas.addEventListener('mousemove', function () {              
        if (isMouseDown && lastClickedFigure != null) {
            lastClickedFigure.setPosition(event.layerX, event.layerY);
            drawCanvas();
        }
    })
})

canvas.addEventListener('mouseup', function () {          
    if (lastClickedFigure != null) {
        let outcome = board.resolveMove(lastClickedFigure);
        if (outcome === true) {
            deleteCoin(lastClickedFigure);
        } else {
            lastClickedFigure.setPosition(oldPosition.x, oldPosition.y);
        }
    }
    lastClickedFigure = null;
    clickedFigure = null;
    isMouseDown = false;
    drawCanvas();
})

function findClickedFigure(posX, posY) {
    for (let i = 0; i < coinsPlayer1.length; i++) {
        let coin = coinsPlayer1[i];
        if (coin !== null) {
            if (coin.isPointInside(posX, posY)) {
                return coin;
            }
        } 
    }
}

function deleteCoin(lastClickedFigure) {
    for (let i = 0; i < coinsPlayer1.length; i++) {
        let coin = coinsPlayer1[i];
        if (coin === lastClickedFigure) {
            coinsPlayer1[i] = null;
            lastClickedFigure.setPosition(0, 0);
        }
    }
    for (let j = 0; j < coinsPlayer2.length; j++) {
        let coin = coinsPlayer2[j];
        if (coin === lastClickedFigure) {
            coinsPlayer2[j] = null;
            lastClickedFigure.setPosition(0, 0);
        }
    }
}


