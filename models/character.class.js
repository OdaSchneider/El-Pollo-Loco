class Character extends MovableObject {
    world;
    speed = 15;

    animationInterval;

    soundJump = new Audio('audio/jump.mp3');
    soundHurt = new Audio('audio/hurt.mp3');
    soundDead = new Audio('audio/charakterDead.mp3');

    offset = {
        top: 100,
        bottom: 15,
        left: 20,
        right: 20
    }


    imagesCharakterWalking = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    imagesCharakterJumping = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    imagesHurt = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    imagesDead = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    imagesIdle = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
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
    * calls functions to determine the walking direction and
    * moves the camera in certain Interval
    */
    walking() {
        setInterval(() => {
            this.walkingDirectionRight();
            this.walkingDirectionLeft();
            this.world.cameraX = -this.x + 100;
        }, 1000 / 30);
    }


    /**
     * determines the direction of movement to right by keypress and 
     * call function to move the character
     */
    walkingDirectionRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.levelEnd && !this.world.endboss.endGame) {
            this.moveRight();
            this.changeDirection = false;
        }
    }


    /**
     * determines the direction of movement to left by keypress and 
     * call function to move the character
     */
    walkingDirectionLeft() {
        if (this.world.keyboard.LEFT && this.x > 0 && !this.world.endboss.endGame) {
            this.moveLeft();
            this.changeDirection = true;
        }
    }


    /**
     * determines movement to up by pressing a button and
     * sets speed for movement
     */
    jumping() {
        setInterval(() => {
            if (this.world.keyboard.SPACE && !this.aboveGround() && !this.world.endboss.endGame) {
                this.jump(20);
            }
        }, 1000 / 60);
    }


    /**
     * determines interval for animation
     */
    setAnimation() {
        this.animationInterval = setInterval(() => {
            this.animation();
        }, 100)
    }


    /**
     * successively checks different possible states of the character 
     * and calls appropriate function for animation
     */
    animation() {
        if (this.isDead()) {
            this.charakterDead();
        } else if (this.isHurt() && !this.world.endboss.endGame) {
            this.charakterHurt()
        } else if (this.aboveGround() && !this.world.endboss.endGame) {
            this.charakterJump();
        } else if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.world.endboss.endGame) {
            this.playAnimation(this.imagesCharakterWalking);
        } else {
            this.playAnimation(this.imagesIdle);
        }
    }


    /**
     * submits array of images for animation,
     * play final sound and end the game after setten time out
     */
    charakterDead() {
        this.playAnimation(this.imagesDead);
        this.world.playSound(this.soundDead, 1);
        setTimeout(()=>{
            clearInterval(this.animationInterval);
            this.endGame = true;
        }, 1000);
    }


    /**
     * submits array of images for animation
     * and set corresponding sound effect
     */
    charakterHurt() {
        this.playAnimation(this.imagesHurt);
        this.world.playSound(this.soundHurt, 0.5);
    }


    /**
     * submits array of images for animation
     * and set corresponding sound effect for the moment of jump
     */
    charakterJump() {
        this.playAnimation(this.imagesCharakterJumping);
        if (this.speedY > 0) {
            this.world.playSound(this.soundJump, 0.2);
        }
    }
}
