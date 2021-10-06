class Player {
    constructor(player,context){
        this.player = player;
        this.playerCoins = [];
        this.posY = 800;
        this.posX = 0;
        this.context = context;
        this.turn = false;
        this.name = "";
    }

    createCoins(cantEnLinea){
        let colour = "false"
        if (this.player == "1"){
            colour = document.querySelector("#selectColour1 option:checked").value;
        } else if (this.player == "2"){
            colour = document.querySelector("#selectColour2 option:checked").value;
        }
        for(let i = 0; i < 25; i++){
            if (cantEnLinea == 3) {
                if (this.player == 1){
                    player1.setPosX(180);
                } else if (this.player == 2){
                    player2.setPosX(1140)
                }  
            } else if (cantEnLinea == 4){
                if (this.player == 1){
                    player1.setPosX(160);
                } else if (this.player == 2){
                    player2.setPosX(1160)
                } 
            } else if (cantEnLinea == 5){
                if (this.player == 1){
                    player1.setPosX(140);
                } else if (this.player == 2){
                    player2.setPosX(1180)
                } 
            }
            let coin = new Coin(i, this.context, this.posX, this.posY, this.player, colour);
            this.posY = this.posY - 30;
            coin.drawCoin(this.player);
            this.playerCoins[i] = coin;
        }
        this.posY = 800;
    }

    getCoins(){
        return this.playerCoins;
    }

    getPlayer(){
        return this.player;
    }

    getTurn(){
        return this.turn;
    }
    
    setTurn(turn){
        this.turn = turn;
    }

    setPosX(x){
        this.posX = x;
    }

    setName(name){
        this.name = name;
    }

    getName(){
        return this.name;
    }

}