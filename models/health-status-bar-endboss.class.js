class HealthStatusBarEndboss extends DrawableObject{
    
    lifeInPercent = 100;
    x = 480;
    y = 0;

    imagesHealth =[
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ]


    constructor(){
        super();
        this.loadImages(this.imagesHealth);
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }


    /**
     * Sets healthbar image corresponding to life points in percent
     * 
     * @param {number} percentage - life points in percent
     */
    setPercentage(percentage){
        this.lifeInPercent = percentage;
        let path = this.imagesHealth[this.setSatusbar()];
        this.img = this.imageCache[path];
    }


    /**
     * Returns index of corresponding image for upper function
     * 
     * @returns {number}
     */
    setSatusbar(){
        if(this.lifeInPercent == 100)
            return 5;
        else if (this.lifeInPercent > 80)
            return 4;
        else if (this.lifeInPercent > 60)
            return 3;
        else if (this.lifeInPercent > 40)
            return 2;
        else if (this.lifeInPercent > 20)
            return 1;
        else
            return 0;
    }
}