/* ----------------------------------- Game -----------------------------------*/
let gameEnded = false;
let gameStarted = false;
let scoreboard = document.getElementById("scoreboard");
let score = 0;
let livesCounter = document.getElementById("livesCounter");
let lives = 4;
let finalScore = document.getElementById("finalScore");

document.querySelector("#playButton").addEventListener('click', play);
//Arranca el juego
function play(){
    gameEnded = false;
    gameStarted = true;
    lives = 4;
    score = 0;
    enemies.className = "enemies";
    coin.className = "coin";
    document.getElementById("gameTimer").innerHTML = "Time Left: 3:00";
    document.getElementById("gameTimer").className = "gameTimer";
    document.querySelector("#playButton").className="hidden";
    document.querySelector("#instructionsButton").className="hidden";
    document.getElementById("instructions").className = "hidden";
    document.getElementById("endScreen").className = "hidden";
    document.getElementById("endScreenText").innerHTML = "";
    document.getElementById("playerSelectionDiv").style.display = "none";
    liveCounter();
    scoreCounter();
    backgroundMove();
    coinMovement();
    coinCollision();
    enemyMovement();
    enemyCollision();
    flyingEnemyMovement();
    flyingEnemyCollision();
    gameTimer();

    if (player.className == "playerIdle") {
        playerRun();
    }
    else {
        player2Run();
    }
}

//Le da movimiento al fondo
function backgroundMove() {
    document.getElementById("cloud").style.WebkitAnimationPlayState = "running";
    document.getElementById("background").style.WebkitAnimationPlayState = "running";
    document.getElementById("mountain").style.WebkitAnimationPlayState = "running";
    document.getElementById("plant").style.WebkitAnimationPlayState = "running";
}

//Frena la animacion del fondo
function backgroundStop(){
    document.getElementById("cloud").style.WebkitAnimationPlayState = "paused";
    document.getElementById("background").style.WebkitAnimationPlayState = "paused";
    document.getElementById("mountain").style.WebkitAnimationPlayState = "paused";
    document.getElementById("plant").style.WebkitAnimationPlayState = "paused";
}

//Actualiza el contador de vidas
function liveCounter(){   
    livesCounter.innerHTML = "LIVES: " + lives;
    if (lives <= 0) {
        gameEnded = true;
        player.className = "player1Death";
        setTimeout(endScreen, 1800);
        endGame();   
    }   
}

function lifeLost(int){
    heart.className = "heart";
    document.getElementById("lifeLost").className = "lifeLost";
    document.getElementById("lifeLost").innerHTML = "-"+ int + " LIFE";
    heart.addEventListener("animationend", endLifeLostAnimation);   
}

function endLifeLostAnimation (){
    document.getElementById("heart").className = "hidden";
    document.getElementById("lifeLost").className = "hidden";
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
    document.getElementById("gameLostSound").play();
    gameEnded = true;
    gameStarted = false;
    clearInterval(intervalCoin);
    clearInterval(intervalEnemies);
    clearInterval(intervalFlyingEnemies);
    clearInterval(gameTime);
    backgroundStop();
}

function endScreen(){
    player.className = "playerIdle";
    enemies.className = "hidden";
    coin.className = "hidden";
    livesCounter.innerHTML = "";
    scoreboard.innerHTML = "";
    document.querySelector("#playButton").className="";
    document.querySelector("#instructionsButton").className="";
    document.getElementById("endScreenText").innerHTML = "YOUR FINAL SCORE IS: " + score;
    document.getElementById("playerSelectionDiv").style.display = "flex";
    document.getElementById("gameTimer").className = "hidden";
}

//Cambia el skin del personaje al player 1
document.querySelector("#playerSelectionButton").addEventListener('click', playerSwitch);
function playerSwitch(){
    document.getElementById("playerSelectionButton").style.border = "10px ridge skyblue";
    document.getElementById("player2SelectionButton").style.border = "10px ridge brown";
    player.className = "playerIdle";
    
}

//Cambia el skin del personaje al player 2
document.querySelector("#player2SelectionButton").addEventListener('click', player2Switch);
function player2Switch(){
    document.getElementById("player2SelectionButton").style.border = "10px ridge skyblue";
    document.getElementById("playerSelectionButton").style.border = "10px ridge brown";
    player.className = "player2Idle";
}

/* ----------------------------------- Player -----------------------------------*/

let player = document.getElementById("player");
document.addEventListener('keydown', jump);
let jumpingSound = document.getElementById("jumpSound");
//activa la animacion de jump 
function jump(event) {
    var x = event.keyCode;
    let jumping = false;
    if (x == 87 && gameStarted == true) {
        if (player.className == "playerRun" && jumping == false){
            jumping = true;
            jumpingSound.currentTime=0;
            jumpingSound.play();
            player.className = "playerJump"
            player.addEventListener("animationend", playerRun);
            jumping = false;
        }
        else if (player.className == "player2Run" && jumping == false) {
            jumping = true;
            jumpingSound.currentTime=0;
            jumpingSound.play();
            player.className = "player2Jump"
            player.addEventListener("animationend", player2Run);
            jumping = false;
        }
    }
    if (x == 69 && gameStarted == true) {
        if (player.className == "playerRun" && jumping == false){
            jumping = true;
            jumpingSound.currentTime=0;
            jumpingSound.play();
            player.className = "playerLongJump"
            player.addEventListener("animationend", playerRun);
            jumping = false;
        }
        else if (player.className == "player2Run" && jumping == false){
            jumping = true;
            jumpingSound.currentTime=0;
            jumpingSound.play();
            player.className = "player2LongJump"
            player.addEventListener("animationend", player2Run);
            jumping = false;
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
let enemySpeed = 6;
let enemies = document.getElementById("enemies");

//setea un intervalo de movimiento de los enemigos de tierra, su velocidad de forma random y un spawn time random
function enemyMovement() {
    let enemyValue = 1024;
    enemies.className = "enemies";
    intervalEnemies = setInterval(function () {
        if (enemyValue < 0) {
            enemies.className = "hidden";
            clearInterval(intervalEnemies);
                enemySpeed =  ((Math.random() * 5) + 4); //random enemy speed in between 4 and 9px
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
        let value2 = playerPosition.right - enemyPosition.left;
        let value3 = playerPosition.bottom - enemyPosition.top; 
        if((value2>0 && value2<108) && (value3>0 && value3<58)){
            enemies.className = "hidden";
            lives = (lives - 1);
            lifeLost(1);
            liveCounter();
        }
    ;}, 50);
    
}

let intervalFlyingEnemies;
let flyingEnemySpeed = 9;
let flyingEnemies = document.getElementById("flyingEnemies");

//setea un intervalo de movimiento de los enemigos de tierra, su velocidad de forma random y un spawn time random
function flyingEnemyMovement() {
    let flyingEnemyValue = 1024;
    flyingEnemies.className = "flyingEnemies";
    intervalFlyingEnemies = setInterval(function () {
        if (flyingEnemyValue < 0) {
            flyingEnemies.className = "hidden";
            clearInterval(intervalFlyingEnemies);
                flyingEnemySpeed =  ((Math.random() * 4) + 8); //random enemy speed in between 8 and 12px
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

//define si se colisiono o no contra un enemigo de aire 
function flyingEnemyCollision(){
    setInterval(function(){  
        let flyingEnemyPosition = flyingEnemies.getBoundingClientRect();
        let playerPosition = player.getBoundingClientRect();
        let value2 = playerPosition.right - flyingEnemyPosition.left;
        let value3 = playerPosition.top - flyingEnemyPosition.bottom; 
        if((value2>0 && value2<108) && (value3>-175 && value3<0)){
            flyingEnemies.className = "hidden";
            lives = (lives - 0.5);
            lifeLost(0.5);
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
            coinSpeed =  ((Math.random() * 10) + 5); //random coin speed in between 5 and 15px
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

//define si se colisiono o no con una moneda y de haberlo hecho suma 10 puntos y hace sonido
function coinCollision(){
    setInterval(function(){  
        let coinPosition = coin.getBoundingClientRect();
        let playerPosition = player.getBoundingClientRect();
        let value2 = playerPosition.right - coinPosition.left;
        let value3 = playerPosition.top - coinPosition.bottom; 
        if((value2>-20 && value2<104) && (value3>-184 && value3<0)){
            document.getElementById("coinSound").play();
            coin.className = "";
            clearInterval(intervalCoin);
            setTimeout( () => { 
                coinSpeed =  ((Math.random() * 10) + 5); //random coin speed in between 5 and 15px 
                coinMovement();
            }, Math.floor(Math.random() * 1000 + 1000)); //new coin between 1 and 2 seconds
            score += 10;
            scoreCounter();
        }
    ;}, 200); 
}

/*--------------------------------------- Game Timer ---------------------------------------*/

let gameTime;
//Setea y muestra el tiempo faltante para terminar el juego.
function gameTimer() {
    let s = 0;
    let m = 3;
    gameTime = setInterval(function() {
        if ((s <= 0) && (m <= 0)) {
            endGame();
        } else {
            if (s <= 0){
                s = 59;
                m--;
            }
            if (s < 10 ){
                document.querySelector("#gameTimer").innerHTML = "Time Left: " + m + ":0" + s;
            }else{
                document.querySelector("#gameTimer").innerHTML = "Time Left: " + m + ":" + s;
            }
          s--;
        }
    }, 1000);
}