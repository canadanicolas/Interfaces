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
        context.drawImage(document.querySelector("#cleanBoard"), this.posX, this.posY);

    }

}