class Coin {
    constructor(id, context, posX, posY, player, colour) {
        this.id = id;
        this.context = context;
        this.posX = posX;
        this.posY = posY;
        this.player = player;
        this.colour = colour;
    }

    drawCoin(player) {
        let imgSize = 100;
        context.beginPath();
        let img = new Image();
        if (player === "1") {
            context.drawImage(document.querySelector(document.querySelector("#selectColour1 option:checked").value), this.posX - (imgSize / 2), this.posY - (imgSize / 2), imgSize, imgSize);
        } else {
            if (player === "2")
            context.drawImage(document.querySelector(document.querySelector("#selectColour2 option:checked").value), this.posX - (imgSize / 2), this.posY - (imgSize / 2), imgSize, imgSize);
        }
        context.stroke();
        context.closePath();
    }

    isPointInside(posX, posY) {
        let x = this.posX - posX;
        let y = this.posY - posY;
        return Math.sqrt(x * x + y * y) < 35;
    }

    /*-------------------------------------------- ------------------ --------------------------------------------*/
    /*-------------------------------------------- Getter and Setters --------------------------------------------*/

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
    
    getColour(){
        return this.colour;
    }

}