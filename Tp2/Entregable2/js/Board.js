class Board {
    constructor(context) {
        this.context = context;
        this.board = [];
        this.insertsPoints = [];
        this.cantTableroX = 0;
        this.cantTableroY = 0;
        this.cantEnLinea = 0;
    }

    /* recibe la cantidad en linea que selecciono el player, lo setea a la clase board y con eso determina
    el tamaño del tablero que se va a utilizar.
    se crea una matriz board la cual va a guardar si hay fichas o no a futuro.
    va dibujando los casilleros a medida que se va creando la matriz
    al final crea los puntos de insercion en x e y por los cuales el jugador va a poner las fichas
    */
    createBoard(cantEnLinea) {
        this.cantEnLinea = parseInt(cantEnLinea);
        this.cantTableroX = parseInt(cantEnLinea) + parseInt(3);
        this.cantTableroY = parseInt(cantEnLinea) + parseInt(2);
        let square;
        let id = 0;
        for (let x = 0; x < this.cantTableroX; x++) {
            this.board[x] = [];
            for (let y = 0; y < this.cantTableroY; y++) {
                let posX = 0;
                if (this.cantEnLinea == 3) {
                    posX = (x * 100) + 360;
                } else if (this.cantEnLinea == 4) {
                    posX = (x * 100) + 310;
                } else if (this.cantEnLinea == 5) {
                    posX = (x * 100) + 260;
                }
                let posY = (y * 100) + 90;
                square = new Square(id, this.context, posX, posY, false);
                square.addImage(posX, posY);
                this.board[x][y] = square;
                id = id + 1;
            }
            square = this.board[x][0];
            let pointToInsert = square.getPosition();
            pointToInsert.x = pointToInsert.x + 50;
            pointToInsert.y = pointToInsert.y - 30;
            this.insertsPoints[x] = pointToInsert;
        }
    }

    /*dibuja el tablero casillero por casillero*/
    drawBoard() {
        let square;
        for (let x = 0; x < this.cantTableroX; x++) {
            for (let y = 0; y < this.cantTableroY; y++) {
                square = this.board[x][y];
                square.addImage();
            }
        }
    }

    getInsertsPoints() {
        return this.insertsPoints;
    }

    getInsertPosition(coin) {
        for (let i = 0; i < this.insertsPoints.length; i++) {
            let position = this.insertsPoints[i];
            if (coin.isPointInside(position.x, position.y)) {
                return i;
            }
        }
        return null;
    }

    /* checkea si la posicion de la ficha coincide con una insert position
    si es asi inserta la coin en esa columna
    */ 
    resolveMove(coin) {
        let position = this.getInsertPosition(coin);
        if (position === null) {
            return false;
        } else {
            this.insertInBoard(position, coin);
            return true;                                 
        }
    }

    /*
    */
    insertInBoard(x, coin) {                
        let square = new Square();
        for (let y = 0; y < this.cantTableroY; y++) {
            square = this.board[x][y];
            if (square.getColour() !== false) {
                if (y - 1 < 0) {
                    return
                } else {
                    square = this.board[x][y - 1];
                    square.setColour(coin.getColour());
                    return;
                }
            } else {
                if (y === this.cantTableroY - 1) {
                    square = this.board[x][y];
                    square.setColour(coin.getColour());
                    return;
                }
            }
        }
    }

    checkPlay(colour) {
        let square = new Square();
        for (let x = this.cantTableroX - 1; x > -1; x--) {
            for (let y = 0; y < this.cantTableroY; y++) {
                let counter = 0;
                square = this.board[x][y];
                if (square.getColour() === colour) {
                    counter = this.checkUp(colour, x, y);
                    if (counter === this.cantEnLinea) {
                        return true;
                    }
                    counter = this.checkLeft(colour, x, y);
                    
                    if (counter === this.cantEnLinea) {
                        return true;
                    }
                    counter = this.checkRight(colour, x, y);
                    
                    if (counter === this.cantEnLinea) {
                        return true;
                    }
                    counter = this.checkLeftDiagonal(colour, x, y);
                    
                    if (counter === this.cantEnLinea) {
                        return true;
                    }
                    counter = this.checkRigthDiagonal(colour, x, y);
                    
                    if (counter === this.cantEnLinea) {
                        return true;
                    }
                }
            }
        }
    }

    checkUp(colour, x, y) {
        let counter = 0;
        while (counter <= this.cantEnLinea && y >= 0) {
            let square = this.board[x][y];
            if (square.getColour() === colour) {
                counter++;
                y--;
            } else {
                return 0;
            }
            if (counter === this.cantEnLinea) {
                return counter;
            }
        }
    }

    checkLeft(colour, x, y) {
        let counter = 0;
        while (counter <= this.cantEnLinea && x >= 0) {
            let square = this.board[x][y];
            if (square.getColour() === colour) {
                counter++;
                x--;
            } else {
                return 0;
            }
            if (counter === this.cantEnLinea) {
                return counter;
            }
        }
        
    }

    checkRight(colour, x, y) {
        let counter = 0;
        while (counter <= this.cantEnLinea && x < this.i) {
            let square = this.board[x][y];
            if (square.getColour() === colour) {
                counter++;
                x++;
            } else {
                return 0;
            }
            if (counter === this.cantEnLinea) {
                return counter;
            }
        }
        
    }



    checkLeftDiagonal(colour, x, y) {
        let counter = 0;
        while (counter <= this.cantEnLinea && x > -1 && y >= 0) {
            let square = this.board[x][y];
            if (square.getColour() === colour) {
                counter++;
                x--;
                y--;
            } else {
                return 0;
            }
            if (counter === this.cantEnLinea) {
                return counter;
            }
        }
        
    }


    checkRigthDiagonal(colour, x, y) {
        let counter = 0;
        while (counter <= this.cantEnLinea && x < this.cantTablero && y >= 0) {

            let square = this.board[x][y];
            if (square.getColour() === colour) {
                counter++;
                x++;
                y--;
            } else {
                return 0;
            }
            if (counter === this.cantEnLinea) {
                return counter;
            }
        }
        
    }
}




