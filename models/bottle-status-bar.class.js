class BottleStatusBar extends DrawableObjects{

    collectedBottles = 0;

    imagesBottle =[
        '../img/6_salsa_bottle/salsa_bottle.png'
    ]


    constructor(){
        super();
        this.loadImage(this.imagesBottle[0]);
        this.x = 115;
        this.y = 62;
        this.width = 60;
        this.height = 50;
    }



}