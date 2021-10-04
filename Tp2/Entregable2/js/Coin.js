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

    isPointInside(posX, posY) {
        let x = this.posX - posX;
        let y = this.posY - posY;
        return Math.sqrt(x * x + y * y) < 35;
    }

    setPosition(x, y) {
        this.posX = x;
        this.posY = y;
    }

    getPosition() {
        return {
            x: this.posX,
            y: this.posY
        };
    }

    getPlayer(){
        return this.player;
    }

}