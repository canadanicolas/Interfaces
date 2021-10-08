let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");

let board = new Board(context);
let player1 = new Player("1", this.context);
let player2 = new Player("2", this.context);
let img = new Image();

let coinsPlayer1 = player1.getCoins();
let coinsPlayer2 = player2.getCoins();

let isMouseDown = false;
let lastClickedFigure = null;
let oldPosition = 0;
let posicionFichasY = 800;

let turn = player2;

let gameStarted = false;

let cantEnLinea = 0;

let playerTime = 0;
let gameTime = 0;

let colourP1 = 0;
let colourP2 = 0;

clearCanvas();

/*---------------------------------------------- ------------- ----------------------------------------------*/
/*---------------------------------------------- Start y Reset ----------------------------------------------*/

document.querySelector("#buttonStart").addEventListener("click", start);
function start() {
    let coloursSelected = areColoursDuplicated();

    if (coloursSelected == false){
        gameStarted = true;

        cantEnLinea = document.querySelector("#selectXenLinea option:checked").value;

        player1.setName(document.querySelector("#nameP1").value);
        player2.setName(document.querySelector("#nameP2").value);

        board.createBoard(cantEnLinea);

        player1.createCoins(cantEnLinea);
        player2.createCoins(cantEnLinea); 

        document.querySelector("#hideInGame").className = "hidden";
        document.querySelector("#buttonStart").className = "hidden";  
        document.querySelector("#buttonRestart").className = "btn btn-dark";
        document.querySelector("#turnPlayer1").className = "";
        document.querySelector("#turnPlayer1").innerHTML = "Turno de " + player1.getName();
        document.querySelector("#turnPlayer2").className = "hidden";
        document.querySelector("#turnPlayer2").innerHTML = "Turno de " + player2.getName();
        document.querySelector("#playerTimer").className = "";

        changeTurn();
        gameTimer();
    }
}

function areColoursDuplicated(){
    colourP1 = document.querySelector("#selectColour1 option:checked").value;
    colourP2 = document.querySelector("#selectColour2 option:checked").value;
    if (colourP1 == colourP2) {
        document.querySelector("#errorColoresSeleccionados").className = "";
        return true;
    }
    else 
    document.querySelector("#errorColoresSeleccionados").className = "hidden";
    return false;
}

document.querySelector("#buttonRestart").addEventListener("click", restart);
function restart() {
    gameStarted = false;
    clearInterval(gameTime);
    clearInterval(playerTime);
    clearCanvas();

    document.querySelector("#buttonStart").className = "btn btn-dark";
    document.querySelector("#buttonRestart").className = "hidden";
    document.querySelector("#hideInGame").className = "";
    document.querySelector("#turnPlayer1").className = "hidden";
    document.querySelector("#turnPlayer2").className = "hidden";
    document.querySelector("#playerTimer").className = "hidden";
    document.querySelector("#canvas").className = "canva";
    document.querySelector("#playerWinMessageContainer").className = "hidden";
}

function drawCanvas() { //va mostrando y dibujando el tablero ingame
    if (gameStarted == true) {
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
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "rgba(255,255,255,1)";
    context.fill();
}

/*---------------------------------------------- ------------- ----------------------------------------------*/
/*---------------------------------------------- Drag and Drop ----------------------------------------------*/

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

canvas.addEventListener('mouseout', function () {
    if (lastClickedFigure != null) {
        lastClickedFigure.setPosition(oldPosition.x, oldPosition.y);
        lastClickedFigure = null;
        clickedFigure = null;
        isMouseDown = false;
        drawCanvas();
    }
    
})  

canvas.addEventListener('mouseup', function () {          
    if (lastClickedFigure != null) {
        let outcome = board.resolveMove(lastClickedFigure);
        if (outcome === true) {
            deleteCoin(lastClickedFigure);
            changeTurn("clicked");
            let play = board.checkPlay(lastClickedFigure.getColour());
            if (play === true) {
                document.querySelector("#canvas").className = "hidden";
                document.querySelector("#turnPlayer1").className = "hidden";
                document.querySelector("#turnPlayer2").className = "hidden";
                document.querySelector("#playerWinMessageContainer").className = "";
                document.querySelector("#playerTimer").className = "hidden";
                clearInterval(gameTime);
                clearInterval(playerTime);
                if (lastClickedFigure.getPlayer() === "1") {
                    colourP1 = playerColourToColourString(colourP1);
                    document.querySelector("#playerWinMessage").innerHTML = player1.getName() + " Won " +
                    " with the colour " + colourP1;
                    document.querySelector("#playerWinMessage").style.color= colourP1; 
                } else {
                    colourP2 = playerColourToColourString(colourP2);
                    document.querySelector("#playerWinMessage").innerHTML = player2.getName() + " Won " +
                    " with the colour " + colourP2;
                    document.querySelector("#playerWinMessage").style.color= colourP2;  
                }
            }
        } else {
            console.log("ASDa");
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
        if (turn === player1) {
            let coin = coinsPlayer1[i];
            if (coin !== null) {
                if (coin.isPointInside(posX, posY)) {
                    return coin;
                }
            }
        } else {
            if (turn === player2) {
                let coin = coinsPlayer2[i];
                if (coin !== null) {
                    if (coin.isPointInside(posX, posY)) {
                        return coin;
                    }
                }
            }
        }
    }
}

/*---------------------------------------------- ------------ ----------------------------------------------*/
/*---------------------------------------------- Funcionality ----------------------------------------------*/

function deleteCoin(lastClickedFigure) {
    if (turn === player1) {
        for (let i = 0; i < coinsPlayer1.length; i++) {
            let coin = coinsPlayer1[i];
            if (coin === lastClickedFigure) {
                coinsPlayer1[i] = null;
                lastClickedFigure.setPosition(0, 0);
            }
        }
    } else {
        for (let i = 0; i < coinsPlayer2.length; i++) {
            let coin = coinsPlayer2[i];
            if (coin === lastClickedFigure) {
                coinsPlayer2[i] = null;
                lastClickedFigure.setPosition(0, 0);
            }
        }
    }
}

function changeTurn(action) {
    if (turn === player1) {
        turn = player2;
        document.querySelector("#turnPlayer1").className = "hidden";
        document.querySelector("#turnPlayer2").className = "";
    } else {
        turn = player1;
        document.querySelector("#turnPlayer1").className = "";
        document.querySelector("#turnPlayer2").className = "hidden";
    }
    if (action == "clicked"){
        clearInterval(playerTime);
    }
    playerTimer(turn);
}


function playerColourToColourString(s){
    let string = s;
    string = Array.from(string);
    let colourLength = string.length - 4;
    for (let i = 0; i < string.length; i++){
        if (i == 0) {
            string.shift();
        }
        if (i >= colourLength -1) {
            string.splice(i, 1);
            i--;
        }
    }
    string = string.toString();
    string = string.replace(/,/g, "");
    return string
}

/*---------------------------------------------- ------ ----------------------------------------------*/
/*---------------------------------------------- Timers ----------------------------------------------*/

function playerTimer(player){
    let s = 10;
    document.querySelector("#playerTimer").innerHTML = "Time left for " +
             player.getName() + " - " + (s) + " seconds";
    document.querySelector("#playerTimer").style.color="#000000";
    playerTime = setInterval(function() {
        if (s > 0) {
            document.querySelector("#playerTimer").innerHTML = "Time left for " +
             player.getName() + " - " + (s-1) + " seconds";
             if (s >= 5) {
                document.querySelector("#playerTimer").style.color="#000000";
            }
            if (s < 5) {
                document.querySelector("#playerTimer").style.color="#FF0000";
            }
        s--;
        } else {
            clearInterval(playerTime);
            changeTurn();
        }
    }, 1000);
}

function gameTimer() {
    let s = 0;
    let m = 0;
    gameTime = setInterval(function() {
        if ((s <= 40) || (m < 3)) {
            if (s > 59){
                s = 0;
                m++;
            }
            document.querySelector("#gameTimer").innerHTML = "Game Timer: " + m + ":" + s;
          s++;
        } else {
            gameTimerEnded();
        }
    }, 1000);
}

function gameTimerEnded() {
    clearInterval(playerTime);
    document.querySelector("#canvas").className = "hidden";
    document.querySelector("#playerWinMessageContainer").className = "";
    document.querySelector("#playerWinMessage").innerHTML = "Se termino el tiempo, hubo un empate";
    document.querySelector("#turnPlayer1").className = "hidden";
    document.querySelector("#turnPlayer2").className = "hidden"; 
}

/*----------------------------------------------  ----------------------------------------------*/
/*----------------------------------------------  ----------------------------------------------*/
