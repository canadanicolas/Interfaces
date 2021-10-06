class Player {
    constructor(player, posX,context){
        this.player = player;
        this.playerCoins = [];
        this.posY = 800;
        this.posX = posX;
        this.context = context;
        this.turn = false;
    }

    createCoins(){
        let colour = "false"
        if (this.player == "1"){
            colour = document.querySelector("#selectColour1 option:checked").value;
        } else if (this.player == "2"){
            colour = document.querySelector("#selectColour2 option:checked").value;
        }
        for(let i = 0; i < 25; i++){
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

}