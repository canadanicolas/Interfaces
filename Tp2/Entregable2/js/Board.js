class Board {
    constructor(context) {
        this.i = 7;
        this.j = 7;
        this.context = context;
        this.board = [];
    }

    createBoard() {
        let square;
        let id = 0;
        for (let x = 0; x < this.i; x++) {
            this.board[x] = [];
            for (let y = 0; y < this.j; y++) {
                let posX = (x * 100) + 270;
                let posY = (y * 100) + 90;
                square = new Square(id, this.context, posX, posY,false);
                square.addImage(posX, posY);
                this.board[x][y] = square;
                id = id + 1;
            }
            square = this.board[x][0];
        }
    }

    resetBoard() {
        for (let x = 0; x < this.i; x++) {
            for (let y = 0; y < this.j; y++) {
                let square = this.board[x][y];
                square.setStatus = "false";
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

}



