class Endboss extends MovableObject{
    width = 300;
    height = 350;
    y = 95;

    imagesEndboss = [
        '../img/4_enemie_boss_chicken/2_alert/G5.png',
        '../img/4_enemie_boss_chicken/2_alert/G6.png',
        '../img/4_enemie_boss_chicken/2_alert/G7.png',
        '../img/4_enemie_boss_chicken/2_alert/G8.png',
        '../img/4_enemie_boss_chicken/2_alert/G9.png',
        '../img/4_enemie_boss_chicken/2_alert/G10.png',
        '../img/4_enemie_boss_chicken/2_alert/G11.png',
        '../img/4_enemie_boss_chicken/2_alert/G12.png',
    ];


    constructor(){
        super().loadImage(this.imagesEndboss[0]);
        this.loadImages(this.imagesEndboss);
        this.x = 8600;

        this.animate();
    }


    animate(){

        setInterval(() => {
            this.playAnimation(this.imagesEndboss);
        }, 400);
    }
}