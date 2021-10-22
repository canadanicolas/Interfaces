
let player = document.getElementById("player");
document.addEventListener('keydown', jump);

function jump(event) {
    var x = event.keyCode;
    if (x == 87) {
        player.className = "playerJump"
        player.addEventListener("animationend", playerRun);
    }
}

function playerRun(){
    console.log(player.className);
    player.className = "player";
}

let enemies = document.getElementById("enemies");
document.querySelector("#playButton").addEventListener('click', enemyMovement);

function enemyMovement(){
    let value = 255;
  let intervalo = setInterval(function(){
    if(value < -45){
        value = 255;
    }
    value -= 2;
    let enemyMove = value.toString().concat("px");
    enemies.style.left = enemyMove;
  }, 255/15);


}