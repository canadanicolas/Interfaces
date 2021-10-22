
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

