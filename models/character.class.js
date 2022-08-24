class Character extends MovableObject {
    world;
    speed = 15;

    walkingSound = new Audio('audio/runningInSand.mp3');

    imagesCharakterWalking = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png',
    ];


    constructor() {
        super().loadImage(this.imagesCharakterWalking[0]);
        this.loadImages(this.imagesCharakterWalking)

        this.animate();
    }
    

    /**
    * calls functions to animate the Character
    */
    animate() {
        this.walking();
    }


    /**
    * calls function for the walking direction
    * changes the images for walking animation and moves the camera
    */
    walking(){
        setInterval(() => {
            this.walkingSound.pause();
            this.walkingDirection();
            this.world.cameraX = -this.x +100;
        }, 1000 / 30);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.imagesCharakterWalking);
            }
        }, 25);
    }


    /**
     * determines the moving direction by keypress and moves the character
     */
    walkingDirection(){
        if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEnd) {
            this.moveRight();
            this.changeDirection = false;
            this.walkingSound.play();
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.changeDirection = true;
            this.walkingSound.play();
        }
    }


    jump() {

    }
}