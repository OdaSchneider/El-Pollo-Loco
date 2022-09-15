class BabyChicken extends MovableObject {
    width = 40;
    height = 50;
    y = 370;

    offset = {
        top: 10,
        bottom: 10,
        left: 20,
        right: 20
    }


    imagesChickenWalking = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];


    constructor(x) {
        super().loadImage(this.imagesChickenWalking[0]);
        this.loadImages(this.imagesChickenWalking)

        this.x = x + Math.random() * 500;
        this.speed = 0.3 + Math.random() * 0.25;

        this.walking();
    }


    /**
    * calls a function to move chicken and 
    * submits array of images for walking animation
    */
    walking() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 80);

        setInterval(() => {
            this.playAnimation(this.imagesChickenWalking);
        }, 100);
    }
}