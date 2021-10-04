class Coin {
    constructor(id, context, posX, posY, player) {
        this.id = id;
        this.context = context;
        this.posX = posX;
        this.posY = posY;
        this.player = player;
    }

    drawCoin(player) {
        let imgSize = 100;
        context.beginPath();
        let img = new Image();
        if (player === "1") {
            context.drawImage(document.querySelector("#coinP1"), this.posX - (imgSize / 2), this.posY - (imgSize / 2), imgSize, imgSize);
        } else {
            if (player === "2")
            context.drawImage(document.querySelector("#coinP2"), this.posX - (imgSize / 2), this.posY - (imgSize / 2), imgSize, imgSize);
        }
        context.stroke();
        context.closePath();
    }

}