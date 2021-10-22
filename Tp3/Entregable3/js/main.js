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
    player.className = "player";
}

/* ----------------------------------- Enemy -----------------------------------*/

let enemies = document.getElementById("enemies");
document.querySelector("#playButton").addEventListener('click', enemyMovement);
function enemyMovement() {
    enemies.className = "enemies";
    let value = 1084;
    let intervalo = setInterval(function () {
        if (value < -60) {
            value = 1024;
        }
        value -= 8;
        let enemyMove = value.toString().concat("px");
        enemies.style.left = enemyMove;
    }, 1084 / 60);

}

document.querySelector("#playButton").addEventListener('click', enemyCollision);
function enemyCollision(){
    setInterval(function(){  
        let enemyPosition = enemies.getBoundingClientRect();
        let playerPosition = player.getBoundingClientRect();
        let value2 = playerPosition.right - enemyPosition.right;
        let value3 = playerPosition.top - enemyPosition.top; 
        if((value2>-64 && value2<64) && (value3>-128 && value3<128)){
            console.log("lose");
        }
    ;}, 100);
  
}

/* ----------------------------------- Coin -----------------------------------*/

let coin = document.getElementById("coin");
document.querySelector("#playButton").addEventListener('click', coinMovement);
function coinMovement() {
    coin.className = "coin";
    let value = 1084;
    let intervalo = setInterval(function () {
        if (value < -60) {
            value = 1024;
        }
        value -= 11;
        let coinMove = value.toString().concat("px");
        coin.style.left = coinMove;
    }, 1084 / 60);

}