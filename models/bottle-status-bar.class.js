class BottleStatusBar extends DrawableObjects{


    imagesBottle =[
        '../img/6_salsa_bottle/salsa_bottle.png'
    ]


    constructor(){
        super();
        this.loadImage(this.imagesBottle[0]);
        this.x = 120;
        this.y = 50;
        this.width = 65;
        this.height = 55;
    }



}