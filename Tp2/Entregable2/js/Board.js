class Board {
    constructor(context) {
        this.i = 7;
        this.j = 7;
        this.context = context;
        this.board = [];
        this.insertsPoints = [];
    }

    createBoard() {
        let square;
        let id = 0;
        for (let x = 0; x < this.i; x++) {
            this.board[x] = [];
            for (let y = 0; y < this.j; y++) {
                let posX = (x * 100) + 270;
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

    resetBoard() {
        for (let x = 0; x < this.i; x++) {
            for (let y = 0; y < this.j; y++) {
                let square = this.board[x][y];
                this.board[x][y] = square;
            }
        }
    }

    drawBoard() {
        let square;
        for (let x = 0; x < this.i; x++) {
            for (let y = 0; y < this.j; y++) {
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

    insertInBoard(x, coin) {                
        let square = new Square();
        for (let y = 0; y < this.j; y++) {
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
                if (y === this.j - 1) {
                    square = this.board[x][y];
                    square.setColour(coin.getColour());
                    return;
                }
            }
        }
    }

    resolveMove(coin) {
        let position = this.getInsertPosition(coin);
        if (position === null) {
            return false;
        } else {
            this.insertInBoard(position, coin);
            return true;                                 
        }
    }

}



