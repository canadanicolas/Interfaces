class Square {
    constructor(id,context, posX, posY, colour) {
        this.context = context;
        this.posX = posX;
        this.posY = posY;
        this.colour = false;
    }

    draw() {
        this.context.beginPath();
        this.context.rect(this.posX, this.posY, 100, 100);
        this.context.stroke();
    }

    addImage() {
        let img = new Image();
        if(this.colour == false){        
            context.drawImage(document.querySelector("#cleanBoard"), this.posX, this.posY);
        }else{
            if(this.colour === "#blackCoin"){
                context.drawImage(document.querySelector("#boardBlackCoin"), this.posX, this.posY);
            }else if (this.colour ==="#blueCoin"){
                context.drawImage(document.querySelector("#boardBlueCoin"), this.posX, this.posY);
            }else if (this.colour ==="#greenCoin"){
                context.drawImage(document.querySelector("#boardGreenCoin"), this.posX, this.posY);
            }else if (this.colour ==="#purpleCoin"){
                context.drawImage(document.querySelector("#boardPurpleCoin"), this.posX, this.posY);
            }else if (this.colour ==="#redCoin"){
                context.drawImage(document.querySelector("#boardRedCoin"), this.posX, this.posY);
            }else if (this.colour ==="#yellowCoin"){
                context.drawImage(document.querySelector("#boardYellowCoin"), this.posX, this.posY);
            }
        }
    }

    /*-------------------------------------------- ------------------ --------------------------------------------*/
    /*-------------------------------------------- Getter and Setters --------------------------------------------*/

    getPosition() {
        return {
            x: this.posX,
            y: this.posY
        };
    }

    getColour(){
        return this.colour;
    }

    setColour(colour){
        this.colour = colour;
    }

}