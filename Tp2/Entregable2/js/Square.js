class Square {

    constructor(x, y, squareWidth, squareHeight, content, context, squareName) {
        this.x = x;
        this.y = y;
        this.squareWidth = squareWidth;
        this.squareHeight = squareHeight;
        this.content = content;
        this.ctx = context;
        this.squareName = squareName;
    }


    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getSquareHeight() {
        return this.squareHeight;
    }

    getSquareWidth() {
        return this.squareWidth;
    }

    getContent() {
        return this.content;
    }



    createSquare() {              //se dibuja casillero
        let name = this.squareName;
        let borderWidth = 3;
        var offset = borderWidth * 2;
        this.ctx.beginPath();
        if(this.y==0){
            this.ctx.fillStyle = 'rgba(10, 70, 5, 0.3)';
            this.ctx.fillRect(this.x - borderWidth, this.y - borderWidth, this.squareWidth + offset, this.squareHeight + offset);
            this.ctx.fillStyle = 'rgba(10, 70, 5, 0.1)';
            this.ctx.fillRect(this.x, this.y, this.squareWidth, this.squareHeight);

        }else{
            this.ctx.fillStyle = "black"
            this.ctx.fillRect(this.x - borderWidth, this.y - borderWidth, this.squareWidth + offset, this.squareHeight + offset);
            this.ctx.fillStyle = "#3C4F3B";
            this.ctx.fillRect(this.x, this.y, this.squareWidth, this.squareHeight);
            this.ctx.fillStyle = "black"
            this.ctx.fillText(name,this.x + this.squareWidth/2,this.y + this.squareHeight/2);
        } 
    }


}