class Square {
    constructor(id,context, posX, posY, status) {
        this.context = context;
        this.posX = posX;
        this.posY = posY;
        this.id = id;
        this.status = false;
    }

    draw() {
        this.context.beginPath();
        this.context.rect(this.posX, this.posY, 100, 100);
        this.context.stroke();
    }

    addImage() {
        let img = new Image();
        if(this.status == false){        
            context.drawImage(document.querySelector("#cleanBoard"), this.posX, this.posY);
        }else{
            if(this.status === "1"){
                context.drawImage(document.querySelector("#coinP1"), this.posX, this.posY);
            }else{
                if(this.status ==="2"){
                    context.drawImage(document.querySelector("#coinP2"), this.posX, this.posY);
                }
            }
        }
    }

    getPosition() {
        return {
            x: this.posX,
            y: this.posY
        };
    }

    getStatus(){
        return this.status;
    }

    setStatus(status){
        this.status = status;
    }

}