/* ----------------------------------- Game -----------------------------------*/
let gameEnded = false;
document.querySelector("#playButton").addEventListener('click', play);

let scoreboard = document.getElementById("scoreboard");
let score = 0;
let livesCounter = document.getElementById("livesCounter");
let lives = 2;
let finalScore = document.getElementById("finalScore");

function play(){
    enemyMovement();
    enemyCollision();
    playerRun();
    coinMovement();
    backgroundMove();
    coinCollision();
    liveCounter();
    scoreCounter();
    document.querySelector("#playButton").className="hidden";
}

function backgroundMove() {
    document.getElementById("background").className = "backgroundMove";
}

//Actualiza el contador de vidas
function liveCounter(){   
    if (lives == 0) {
        endGame();
    }
    livesCounter.innerHTML = "LIVES: " + lives;
}

//actualiza el contador del score y cada 10 coins da 1 vida
function scoreCounter(){
    if (score % 100 == 0) {
        lives++;
        liveCounter();
    }
    scoreboard.innerHTML = "SCORE: " +score;
}

function endGame(){
    gameEnded = true;
    document.getElementById("background").className = "background";
}

/* ----------------------------------- Player -----------------------------------*/

let player = document.getElementById("player");
document.addEventListener('keydown', jump);

//activa la animacion de jump 
function jump(event) {
    var x = event.keyCode;
    if (x == 87) {
        player.className = "playerJump"
        player.addEventListener("animationend", playerRun);
    }
}

//vuelve a activar la animacion de run
function playerRun() {
    player.className = "playerRun"
}

/* ----------------------------------- Enemy -----------------------------------*/
let intervalEnemies;

let enemies = document.getElementById("enemies");
//setea un intervalo de movimiento de los enemigos de tierra y una velocidad random
function enemyMovement() {
    let value = 1084;
    enemies.className = "enemies";
    intervalEnemies = setInterval(function () {
        if (value < 0) {
            value = 1024;
        }
        value -= Math.floor(Math.random() * 6) + 4; //new enemy speed between 4 and 8 px each time
        let enemyMove = value.toString().concat("px");
        enemies.style.left = enemyMove;
        if(gameEnded){
            clearInterval(intervalEnemies);
        }
    }, 1084 / 60);

}

//define si se colisiono o no contra un enemigo de tierra 
function enemyCollision(){
    setInterval(function(){  
        let enemyPosition = enemies.getBoundingClientRect();
        let playerPosition = player.getBoundingClientRect();
        let value2 = playerPosition.right - enemyPosition.right;
        let value3 = playerPosition.top - enemyPosition.top; 
        if((value2>-50 && value2<50) && (value3>-100 && value3<100)){
            enemies.className = "";
            clearInterval(intervalEnemies);
            setTimeout( () => {  
                enemyMovement();
            }, Math.floor(Math.random() * 400) + 300); //new enemy between 4 and 7 seconds
            lives--;
            liveCounter();
        }
    ;}, 200);
  
}

/* ----------------------------------- Coin -----------------------------------*/

let intervalCoin;
let coin = document.getElementById("coin");
//setea un intervalo de movimiento de las monedas y una velocidad random
function coinMovement() {
    let coinValue = 984;
    intervalCoin = setInterval(function () {
    coin.className = "coin";
        if (coinValue < 0) {
            coinValue = 984;
        }
        coinValue -= Math.floor(Math.random() * 8) + 5; //new coin speed between 7 and 12 px each time
        let coinMove = coinValue.toString().concat("px");
        coin.style.left = coinMove;
        if(gameEnded){
            clearInterval(intervalCoin);
        }
        
    }, 1084 / 60);
}

//define si se colisiono o no con una moneda
function coinCollision(){
    setInterval(function(){  
        let coinPosition = coin.getBoundingClientRect();
        let playerPosition = player.getBoundingClientRect();
        let value2 = playerPosition.right - coinPosition.right;
        let value3 = playerPosition.top - coinPosition.top; 
        if((value2>-60 && value2<60) && (value3>-80 && value3<80)){
            coin.className = "";
            clearInterval(intervalCoin);
            setTimeout( () => {  
                coinMovement();
            }, Math.floor(Math.random() * 400) + 300); //new coin between 4 and 7 seconds
            score += 10;
            scoreCounter();
        }
    ;}, 200); 
}
