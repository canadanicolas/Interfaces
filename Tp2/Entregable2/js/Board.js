class Board {

    constructor(widthBoard, heightBoard, cantY, cantX, context) {
        this.widthBoard = widthBoard;
        this.heightBoard = heightBoard;
        this.cantY = cantY;
        this.cantX = cantX;
        this.ctx = context;
        this.columns = [];
        this.columnsCollection = [];
    }

    getcantX() {
        return this.cantX;
    }

    getCantY() {
        return this.cantY;
    }

    getWidthBoard() {
        return this.widthBoard;
    }

    getHeightBoard() {
        return this.heightBoard;
    }




    initializeBoard() {
        let nextX = 0;    //Devuelve ubicación del proximo casillero en X
        let nextY = 0;    //Devuelve ubicación del proximo casillero en Y
        let proportions = this.proportions();    //Llama a medidas proporcionales
        let squareName;     //declaro nombre de casillero
        for (let x = 0; x < this.cantX; x++) {
            for (let y = 0; y < this.cantY; y++) {
                squareName = "" + x + (y-1);              //almaceno nombre de casillero

                var addSquare = new Square(nextX, nextY,
                    proportions.width, proportions.height, "vacio", this.ctx,
                    squareName); //se instancia casillero

                addSquare.createSquare();         //se dibuja el casillero
                nextY += addSquare.getHeight();   //deslizamos punto dibujo de columna
                
                let column = this.columns.push(addSquare); //se almacenan en columna
           
                if(y==this.cantY-1){                   //la columna almacenada, se
                    this.columnsCollection.push(column); //almacena en coleccion
                }
            }
            nextY = 0;                           //deslizamos columna a posicion 0
            nextX += addSquare.getWidth();        //deslizamos el punto de dibujo fila 
            this.columns.splice(0,this.columns.length); //reseteamos columna
        }
    }

    proportions() {                    //retorna medidas proporcionales para casilleros
        return {
            width: (this.widthBoard / this.cantX),
            height: (this.heightBoard / this.cantY)
        };
    }



}