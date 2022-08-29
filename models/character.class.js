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

    imagesCharakterJumping = [
        '../img/2_character_pepe/3_jump/J-31.png',
        '../img/2_character_pepe/3_jump/J-32.png',
        '../img/2_character_pepe/3_jump/J-33.png',
        '../img/2_character_pepe/3_jump/J-34.png',
        '../img/2_character_pepe/3_jump/J-35.png',
        '../img/2_character_pepe/3_jump/J-36.png',
        '../img/2_character_pepe/3_jump/J-37.png',
        '../img/2_character_pepe/3_jump/J-38.png',
        '../img/2_character_pepe/3_jump/J-39.png',
    ];


    constructor() {
        super().loadImage(this.imagesCharakterWalking[0]);
        this.loadImages(this.imagesCharakterWalking);
        this.loadImages(this.imagesCharakterJumping);
        this.applyGravity();
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
    walking() {
        setInterval(() => {
            this.walkingSound.pause();
            this.walkingDirection();
            this.world.cameraX = -this.x + 100;
        }, 1000 / 30);


        setInterval(() => {
            if (this.aboveGround()) {
                this.playAnimation(this.imagesCharakterJumping);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.imagesCharakterWalking);
                }
            }
        }, 25);
    }



    /**
     * determines the moving direction by keypress and moves the character
     */
    walkingDirection() {
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

        if (this.world.keyboard.SPACE && !this.aboveGround()){
            this.jump();
        }
    }

}