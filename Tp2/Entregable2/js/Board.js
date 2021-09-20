class Board {

    constructor(widthBoard, heightBoard, cantColumns, cantRows, context) {
        this.widthBoard = widthBoard;
        this.heightBoard = heightBoard;
        this.cantColumns = cantColumns;
        this.cantRows = cantRows;
        this.ctx = context;
        this.columns = [];
        this.columnsCollection = [];
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
        for (let x = 0; x < this.cantRows; x++) {
            for (let y = 0; y < this.cantColumns; y++) {
                squareName = "" + x + (y-1);              //almaceno nombre de casillero

                var addSquare = new Square(nextX, nextY,
                    proportions.width, proportions.height, "vacio", this.ctx,
                    squareName); //se instancia casillero

                addSquare.createSquare();         //se dibuja el casillero
                nextY += addSquare.getSquareHeight();   //deslizamos punto dibujo de columna
                
                let column = this.columns.push(addSquare); //se almacenan en columna
           
                if(y==this.cantColumns-1){                   //la columna almacenada, se
                    this.columnsCollection.push(column); //almacena en coleccion
                }
            }
            nextY = 0;                           //deslizamos columna a posicion 0
            nextX += addSquare.getSquareWidth();        //deslizamos el punto de dibujo fila 
            this.columns.splice(0,this.columns.length); //reseteamos columna
        }
    }

    proportions() {                    //retorna medidas proporcionales para casilleros
        return {
            width: (this.widthBoard / this.cantRows),
            height: (this.heightBoard / this.cantColumns)
        };
    }

    

}