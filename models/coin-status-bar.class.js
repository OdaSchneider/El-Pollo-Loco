class CoinStatusBar extends DrawableObjects{

    collectedCoins = 0;

    imagesCoin =[
        '../img/8_coin/coin_1.png',
        '../img/8_coin/coin_2.png'
    ]


    constructor(){
        super();
        this.loadImage(this.imagesCoin[0]);
        this.x = 200;
        this.y = -10;
        this.width = 100;
        this.height = 100;
    }

}