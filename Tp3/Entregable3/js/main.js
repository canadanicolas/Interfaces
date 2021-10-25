/* ----------------------------------- Game -----------------------------------*/
let gameEnded = false;
let gameStarted = false;
let scoreboard = document.getElementById("scoreboard");
let score = 0;
let livesCounter = document.getElementById("livesCounter");
let lives = 20;
let finalScore = document.getElementById("finalScore");

document.querySelector("#playButton").addEventListener('click', play);
//Arranca el juego
function play(){
    gameEnded = false;
    gameStarted = true;
    lives = 20;
    score = 0;
    enemies.className = "enemies";
    coin.className = "coin";
    document.querySelector("#playButton").className="hidden";
    document.querySelector("#instructionsButton").className="hidden";
    document.getElementById("instructions").className = "hidden";
    document.getElementById("endScreen").className = "hidden";
    document.getElementById("endScreenText").innerHTML = "";
    document.getElementById("playerSelectionDiv").style.display = "none";
    liveCounter();
    scoreCounter();
    backgroundMove();
    enemyMovement();
    enemyCollision();
    coinMovement();
    coinCollision();
    flyingEnemyMovement();
    flyingEnemyCollision();

    if (player.className == "playerIdle") {
        playerRun();
    }
    else {
        player2Run();
    }
}

//Le da movimiento al fondo
function backgroundMove() {
    document.getElementById("background").className = "backgroundMove";
}

//Actualiza el contador de vidas
function liveCounter(){   
    livesCounter.innerHTML = "LIVES: " + lives;
    if (lives == 0) {
        gameEnded = true;
        endGame();
    }
    
}

//actualiza el contador del score y cada 10 coins da 1 vida
function scoreCounter(){
    if (score % 100 == 0) {
        lives++;
        liveCounter();
    }
    scoreboard.innerHTML = "SCORE: " +score;
}

document.querySelector("#instructionsButton").addEventListener('click', showInstructions);
//Togglea las instrucciones
function showInstructions(){
    if (document.getElementById("instructions").className == "hidden"){
        document.getElementById("instructions").className = "instructions";
    }else{
        document.getElementById("instructions").className = "hidden";
    }
    
}

//Termina el juego
function endGame(){
    gameEnded = true;
    gameStarted = false;
    clearInterval(intervalCoin);
    clearInterval(intervalEnemies);
    clearInterval(intervalFlyingEnemies);
    document.getElementById("background").className = "background";
    player.className = "playerIdle";
    enemies.className = "hidden";
    coin.className = "hidden";
    livesCounter.innerHTML = "";
    scoreboard.innerHTML = "";
    document.querySelector("#playButton").className="";
    document.querySelector("#instructionsButton").className="";
    document.getElementById("endScreenText").innerHTML = "YOUR FINAL SCORE IS: " + score;
    document.getElementById("playerSelectionDiv").style.display = "flex";
}

document.querySelector("#playerSelectionButton").addEventListener('click', playerSwitch);
function playerSwitch(){
    player.className = "playerIdle";
}

document.querySelector("#player2SelectionButton").addEventListener('click', player2Switch);
function player2Switch(){
    player.className = "player2Idle";
}

/* ----------------------------------- Player -----------------------------------*/

let player = document.getElementById("player");
document.addEventListener('keydown', jump);

//activa la animacion de jump 
function jump(event) {
    var x = event.keyCode;
    if (x == 87 && gameStarted == true) {
        if (player.className == "playerRun" || player.className == "playerJump"){
            player.className = "playerJump"
            player.addEventListener("animationend", playerRun);
        }
        else {
            player.className = "player2Jump"
            player.addEventListener("animationend", player2Run);
        }
    }
}

//vuelve a activar la animacion de run
function playerRun() {
    player.className = "playerRun"
}

function player2Run() {
    player.className = "player2Run"
}

/* ----------------------------------- Enemy -----------------------------------*/
let intervalEnemies;
let enemySpeed = 9;
let enemies = document.getElementById("enemies");

//setea un intervalo de movimiento de los enemigos de tierra, su velocidad de forma random y un spawn time random
function enemyMovement() {
    let enemyValue = 1024;
    enemies.className = "enemies";
    intervalEnemies = setInterval(function () {
        if (enemyValue < 0) {
            enemies.className = "hidden";
            clearInterval(intervalEnemies);
                enemySpeed =  ((Math.random() * 8) + 4); //random enemy speed in between 4 and 8px
                enemyMovement();
        }
        enemyValue -= enemySpeed;
        let enemyMove = enemyValue.toString().concat("px");
        enemies.style.left = enemyMove;
        if(gameEnded){
            clearInterval(intervalEnemies);
        }
    }, 1024 / 60);
}

//define si se colisiono o no contra un enemigo de tierra 
function enemyCollision(){
    setInterval(function(){  
        let enemyPosition = enemies.getBoundingClientRect();
        let playerPosition = player.getBoundingClientRect();
        let value2 = playerPosition.right - enemyPosition.right;
        let value3 = playerPosition.top - enemyPosition.top; 
        if((value2>-40 && value2<40) && (value3>-80 && value3<80)){
            enemies.className = "hidden";
            lives--;
            liveCounter();
        }
    ;}, 50);
    
}

let intervalFlyingEnemies;
let flyingEnemySpeed = 7;
let flyingEnemies = document.getElementById("flyingEnemies");

//setea un intervalo de movimiento de los enemigos de tierra, su velocidad de forma random y un spawn time random
function flyingEnemyMovement() {
    let flyingEnemyValue = 1024;
    flyingEnemies.className = "flyingEnemies";
    intervalFlyingEnemies = setInterval(function () {
        if (flyingEnemyValue < 0) {
            flyingEnemies.className = "hidden";
            clearInterval(intervalFlyingEnemies);
                flyingEnemySpeed =  ((Math.random() * 8) + 4); //random enemy speed in between 4 and 12px
                flyingEnemyMovement();
        }
        flyingEnemyValue -= flyingEnemySpeed;
        let flyingEnemyMove = flyingEnemyValue.toString().concat("px");
        flyingEnemies.style.left = flyingEnemyMove;
        if(gameEnded){
            clearInterval(intervalFlyingEnemies);
        }
    }, 1024 / 60);
}

//define si se colisiono o no contra un enemigo de tierra 
function flyingEnemyCollision(){
    setInterval(function(){  
        let enemyPosition = flyingEnemies.getBoundingClientRect();
        let playerPosition = player.getBoundingClientRect();
        let value2 = playerPosition.right - enemyPosition.right;
        let value3 = playerPosition.top - enemyPosition.top; 
        if((value2>-50 && value2<50) && (value3>-90 && value3<90)){
            flyingEnemies.className = "hidden";
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
        
    }, 1024 / 60);
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
                coinSpeed =  ((Math.random() * 10) + 5); //random coin speed in between 5 and 20px 
                coinMovement();
            }, Math.floor(Math.random() * 2000)); //new coin between 0 and 2 seconds
            score += 10;
            scoreCounter();
        }
    ;}, 200); 
}

/*
-Accion al agarrar moneda
-Parallax
*/