class healthStatusBar extends DrawableObjects{
    lifeInPercent = 100;

    imagesHealth =[
        '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ]


    constructor(){
        super();
        this.loadImages(this.imagesHealth);
        this.x = 50;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }


    setPercentage(percentage){
        this.lifeInPercent = percentage;
        let path = this.imagesHealth[this.setSatusbar()];
        this.img = this.imageCache[path];
    }


    setSatusbar(){
        if(this.lifeInPercent == 100){
            return 5;
        }else if (this.lifeInPercent > 80){
            return 4;
        }else if (this.lifeInPercent > 60){
            return 3;
        }else if (this.lifeInPercent > 40){
            return 2;
        }else if (this.lifeInPercent > 20){
            return 1;
        }else{
            return 0;
        }
    }
}