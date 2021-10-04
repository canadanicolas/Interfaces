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
        for(let i = 0; i < 25; i++){
            let coin = new Coin(i, this.context, this.posX, this.posY, this.player);
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

}