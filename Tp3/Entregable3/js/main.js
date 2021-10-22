/* ----------------------------------- Game -----------------------------------*/
let gameEnded = false;
document.querySelector("#playButton").addEventListener('click', play);

function play(){
    enemyMovement();
    enemyCollision();
    playerRun();
    coinMovement();
    backgroundMove();
    coinCollision();
}

function backgroundMove() {
    document.getElementById("background").className = "backgroundMove";
}

/* ----------------------------------- Player -----------------------------------*/

let player = document.getElementById("player");
document.addEventListener('keydown', jump);

function jump(event) {
    var x = event.keyCode;
    if (x == 87) {
        player.className = "playerJump"
        player.addEventListener("animationend", playerRun);
    }
}

function playerRun() {
    console.log(player.className);
    player.className = "playerRun";
}

/* ----------------------------------- Enemy -----------------------------------*/

let enemies = document.getElementById("enemies");
function enemyMovement() {
    enemies.className = "enemies";
    let value = 1084;
    let intervalEnemies = setInterval(function () {
        if (value < -60) {
            value = 1024;
        }
        value -= 8;
        let enemyMove = value.toString().concat("px");
        enemies.style.left = enemyMove;
        if(gameEnded){
            clearInterval(intervalEnemies);
        }
    }, 1084 / 60);

}

function enemyCollision(){
    setInterval(function(){  
        let enemyPosition = enemies.getBoundingClientRect();
        let playerPosition = player.getBoundingClientRect();
        let value2 = playerPosition.right - enemyPosition.right;
        let value3 = playerPosition.top - enemyPosition.top; 
        if((value2>-64 && value2<64) && (value3>-128 && value3<128)){
            console.log("lose");
            //endGame();
        }
    ;}, 200);
  
}

/* ----------------------------------- Coin -----------------------------------*/

let coin = document.getElementById("coin");
function coinMovement() {
    coin.className = "coin";
    let value = 1084;
    let intervalCoin = setInterval(function () {
        if (value < -60) {
            value = 1024;
        }
        value -= 11;
        let coinMove = value.toString().concat("px");
        coin.style.left = coinMove;
        if(gameEnded){
            clearInterval(intervalCoin);
        }
    }, 1084 / 60);
}

function coinCollision(){
    setInterval(function(){  
        let coinPosition = coin.getBoundingClientRect();
        let playerPosition = player.getBoundingClientRect();
        let value2 = playerPosition.right - coinPosition.right;
        let value3 = playerPosition.top - coinPosition.top; 
        if((value2>-40 && value2<40) && (value3>-60 && value3<60)){
            console.log("coin");
        }
    ;}, 200); 
}

function endGame(){
    gameEnded = true;
    document.getElementById("background").className = "background";
}