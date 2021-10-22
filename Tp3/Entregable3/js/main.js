document.querySelector("#playButton").addEventListener("click", function () {
    let sky = document.getElementById("sky").style.WebkitAnimationPlayState = "running";
    //let player = document.getElementById("player").style.WebkitAnimationPlayState = "running";
    //game();
});

function game(){

}

let player = document.getElementById("player");
document.addEventListener('keydown', keyCode);

function keyCode(event) {
    var x = event.keyCode;
    if (x == 87) {
        player.className = "playerJump";
        player.addEventListener("animationend", playerJump());
    }
}

function playerJump(){
    player.className = "playerJump";
}