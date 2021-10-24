/* ----------------------------------- Game -----------------------------------*/
let gameEnded = false;
document.querySelector("#playButton").addEventListener('click', play);

let scoreboard = document.getElementById("scoreboard");
let score = 0;
let livesCounter = document.getElementById("livesCounter");
let lives = 2;
let finalScore = document.getElementById("finalScore");

document.querySelector("#instructionsButton").addEventListener('click', showInstructions);

function play(){
    gameEnded = false;
    lives = 2;
    score = 0;
    enemies.className = "enemies";
    coin.className = "coin";
    document.querySelector("#playButton").className="hidden";
    document.querySelector("#instructionsButton").className="hidden";
    document.getElementById("instructions").className = "hidden";
    playerRun();
    liveCounter();
    scoreCounter();
    backgroundMove();
    enemyMovement();
    enemyCollision();
    coinMovement();
    coinCollision();
}

function backgroundMove() {
    document.getElementById("background").className = "backgroundMove";
}

//Actualiza el contador de vidas
function liveCounter(){   
    if (lives == 0) {
        gameEnded = true;
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

function showInstructions(){
    if (document.getElementById("instructions").className == "hidden"){
        document.getElementById("instructions").className = "instructions";
    }else{
        document.getElementById("instructions").className = "hidden";
    }
    
}

function endGame(){
    gameEnded = true;
    clearInterval(intervalCoin);
    clearInterval(intervalEnemies);
    document.getElementById("background").className = "background";
    player.className = "playerIdle";
    enemies.className = "hidden";
    coin.className = "hidden";
    document.querySelector("#playButton").className="";
    document.querySelector("#instructionsButton").className="";
}

document.querySelector("#resetButton").addEventListener('click', restartGame);
function restartGame(){
    endGame();
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
let enemySpeed = 10;
let enemies = document.getElementById("enemies");
//setea un intervalo de movimiento de los enemigos de tierra, su velocidad de forma random y un spawn time random
function enemyMovement() {
    let value = 1084;
    enemies.className = "enemies";
    intervalEnemies = setInterval(function () {
        if (value < 0) {
            console.log("asd");
            enemies.className = "hidden";
            clearInterval(intervalEnemies);
            setTimeout( () => { 
                enemySpeed =  ((Math.random() * 10) + 5); //random enemy speed in between 5 and 20px
                enemyMovement();
            }, Math.floor(Math.random() * 2000)); //new enemy in between 0 and 2 seconds
        }
        value -= enemySpeed;
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
            }, Math.floor(Math.random() * 2000)); //new enemy  in between 0 and 2 seconds
            lives--;
            liveCounter();
        }
    ;}, 200);
    
}

/* ----------------------------------- Coin -----------------------------------*/

let intervalCoin;
let coin = document.getElementById("coin");
let coinSpeed = 12;
//setea un intervalo de movimiento de las monedas y una velocidad random
function coinMovement() {
    let coinValue = 1024;
    intervalCoin = setInterval(function () {
    coin.className = "coin";
    if (coinValue < 0) {
        coin.className = "hidden";
        clearInterval(intervalCoin);
        setTimeout( () => { 
            coinSpeed =  ((Math.random() * 10) + 5); //random coin speed in between 5 and 20px
            coinMovement();
        }, Math.floor(Math.random() * 2000)); //new coin in between 0 and 2 seconds
    }
        coinValue -= coinSpeed; 
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
                coinSpeed =  ((Math.random() * 15) + 5); //random coin speed in between 5 and 20px 
                coinMovement();
            }, Math.floor(Math.random() * 2000)); //new coin between 0 and 2 seconds
            score += 10;
            scoreCounter();
        }
    ;}, 200); 
}
