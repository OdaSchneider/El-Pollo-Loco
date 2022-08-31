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
        '../img/2_character_pepe/2_walk/W-26.png'
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
        '../img/2_character_pepe/3_jump/J-39.png'
    ];

    imagesHurt = [
        '../img/2_character_pepe/4_hurt/H-41.png',
        '../img/2_character_pepe/4_hurt/H-42.png',
        '../img/2_character_pepe/4_hurt/H-43.png'
    ];

    imagesDead = [
        '../img/2_character_pepe/5_dead/D-51.png',
        '../img/2_character_pepe/5_dead/D-52.png',
        '../img/2_character_pepe/5_dead/D-53.png',
        '../img/2_character_pepe/5_dead/D-54.png',
        '../img/2_character_pepe/5_dead/D-55.png',
        '../img/2_character_pepe/5_dead/D-56.png',
        '../img/2_character_pepe/5_dead/D-57.png'
    ];

    imagesIdle = [
        '../img/2_character_pepe/1_idle/idle/I-1.png',
        '../img/2_character_pepe/1_idle/idle/I-2.png',
        '../img/2_character_pepe/1_idle/idle/I-3.png',
        '../img/2_character_pepe/1_idle/idle/I-4.png',
        '../img/2_character_pepe/1_idle/idle/I-5.png',
        '../img/2_character_pepe/1_idle/idle/I-6.png',
        '../img/2_character_pepe/1_idle/idle/I-7.png',
        '../img/2_character_pepe/1_idle/idle/I-8.png',
        '../img/2_character_pepe/1_idle/idle/I-9.png',
        '../img/2_character_pepe/1_idle/idle/I-10.png'
    ];


    constructor() {
        super().loadImage(this.imagesCharakterWalking[0]);
        this.loadImages(this.imagesCharakterWalking);
        this.loadImages(this.imagesCharakterJumping);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);
        this.loadImages(this.imagesIdle);
        this.applyGravity();
        this.animateMovement();
        this.setAnimation();
    }


    /**
    * calls functions to animate the Character
    */
    animateMovement() {
        this.walking();
        this.jumping();
    }


    /**
    * calls function for the walking direction
    * changes the images for walking animation and moves the camera
    */
    walking() {
        setInterval(() => {
            this.walkingSound.pause();
            this.walkingDirectionRight();
            this.walkingDirectionLeft();
            this.world.cameraX = -this.x + 100;
        }, 1000 / 30);
    }


    /**
     * determines the moving direction by keypress and moves the character
     */
    walkingDirectionRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEnd) {
            this.moveRight();
            this.changeDirection = false;
            this.walkingSound.play();
        }
    }


    walkingDirectionLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.changeDirection = true;
            this.walkingSound.play();
        }
    }


    jumping() {
        setInterval(() => {
            if (this.world.keyboard.SPACE && !this.aboveGround()) {
                this.jump(20);
            }
        }, 1000 / 60);
    }


    setAnimation() {
        setInterval(() => {
            if (this.isDead()) {
               this.playAnimation(this.imagesDead);
            } else if (this.isHurt()) {
                this.playAnimation(this.imagesHurt);
            } else if (this.aboveGround()) {
                this.playAnimation(this.imagesCharakterJumping);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.imagesCharakterWalking);
            } else {
                this.playAnimation(this.imagesIdle);
            }
        }, 100);
    }



}
