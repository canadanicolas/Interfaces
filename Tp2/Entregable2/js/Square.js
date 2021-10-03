class Square {
    constructor(id,context, posX, posY) {
        this.context = context;
        this.posX = posX;
        this.posY = posY;
        this.id = id;
    }

    draw() {
        this.context.beginPath();
        this.context.rect(this.posX, this.posY, 100, 100);
        this.context.stroke();
    }

    addImage() {
        let img = new Image();      
        context.drawImage(document.querySelector("#tableroVacio"), this.posX, this.posY);

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

}