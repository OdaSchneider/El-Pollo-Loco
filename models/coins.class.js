class Coin extends MovableObject{
    
    imagesCoin = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor(x, y) {
        super().loadImage(this.imagesCoin[0]);
        this.loadImages(this.imagesCoin);
        this.x = x;
        this.y = y;
        this.width = 110;
        this.height =110;
        this.animate();
    }


    animate() {
        setInterval(() => {
            let i = this.currentImage % this.imagesCoin.length;
            let path = this.imagesCoin[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        },300);
    }

}