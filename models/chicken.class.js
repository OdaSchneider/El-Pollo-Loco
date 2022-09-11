class Chicken extends MovableObject {
    width = 65;
    height = 85;
    y = 340;

    offset = {
        top: 20,
        bottom: 30,
        left: 20,
        right: 20
    }


    imagesChickenWalking = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];


    constructor(x) {
        super().loadImage(this.imagesChickenWalking[0]);
        this.loadImages(this.imagesChickenWalking);
        this.x = x + Math.random() * 500;
        this.speed = 0.3 + Math.random() * 0.25;

        this.animate();
    }


    /**
    * calls functions to animate the Chicken
    */
    animate() {
        this.walking();
    }


    /**
    * changes the x coordinates by the certain value speed and the images for walking animation
    */
    walking() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 30);

        setInterval(() => {
            this.playAnimation(this.imagesChickenWalking);
        }, 100);
    }

}
