class Square {

    constructor(x, y, width, height, content, context, name) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.content = content;
        this.ctx = context;
        this.name = name;
    }


    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getHeight() {
        return this.height;
    }

    getWidth() {
        return this.width;
    }

    getContent() {
        return this.content;
    }



    createSquare() {              //se dibuja casillero
        let name = this.name;
        let borderWidth = 3;
        var offset = borderWidth * 2;
        this.ctx.beginPath();
        if(this.y==0){
            this.ctx.fillStyle = 'rgba(10, 70, 5, 0.3)';
            this.ctx.fillRect(this.x - borderWidth, this.y - borderWidth, this.width + offset, this.height + offset);
            this.ctx.fillStyle = 'rgba(10, 70, 5, 0.1)';
            this.ctx.fillRect(this.x, this.y, this.width, this.height);

        }else{
            this.ctx.fillStyle = "black"
            this.ctx.fillRect(this.x - borderWidth, this.y - borderWidth, this.width + offset, this.height + offset);
            this.ctx.fillStyle = "#3C4F3B";
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
            this.ctx.fillStyle = "black"
            this.ctx.fillText(name,this.x + this.width/2,this.y + this.height/2);
        } 
    }


}