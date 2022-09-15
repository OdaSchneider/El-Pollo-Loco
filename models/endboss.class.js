class Endboss extends MovableObject {
    width = 300;
    height = 350;
    speed = 5;
    x = 8400;
    y = 95;
    startWalking = false;
    animationInterval;

    soundHurt = new Audio('audio/endbossHurt.mp3');
    soundDead = new Audio('audio/endbossDead.mp3');
    soundAttack = new Audio('audio/endbossAttack.mp3');

    offset = {
        top: 100,
        bottom: 15,
        left: 50,
        right: 50
    }

    imagesEndbossAlert = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    imagesEndbossWalking = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ]

    imagesEndbossAttack = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ]

    imagesEndbossHurt = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ]

    imagesEndbossDead = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]


    constructor() {
        super().loadImage(this.imagesEndbossAlert[0]);
        this.loadImages(this.imagesEndbossAlert);
        this.loadImages(this.imagesEndbossWalking);
        this.loadImages(this.imagesEndbossAttack);
        this.loadImages(this.imagesEndbossHurt);
        this.loadImages(this.imagesEndbossDead);
        this.setAnimation();
        this.animateMovement();
    }


    /**
     * determines the direction of movement to left by keypress
     * under certain conditions
     */
    animateMovement() {
        setInterval(() => {
            if (this.startWalking && !this.isDead() && !this.attack && !this.isHurt() && !this.world.character.endGame) {
                this.moveLeft();
            }
        }, 100);
    }


    /**
     * determines interval for animation
     */
    setAnimation() {
        this.animationInterval = setInterval(() => {
            this.animation();
        }, 100);
    }


    /**
     * successively checks different possible states of the endboss 
     * and calls appropriate function for animation
     */
    animation() {
        if (this.isDead()) {
            this.endbossDead();
        } else if (this.isHurt()) {
            this.endbossHurt();
        } else if (this.attack) {
            this.endbossAttack();
        } else if (this.startWalking && !this.world.character.endGame) {
            this.endbossWalk();
        } else {
            this.endbossAlert();
        }
    }


    /**
     * submits array of images for animation,
     * play final sound and end the game after setten time out
     * with animation to remove final boss
     */
    endbossDead() {
        this.world.playSound(this.soundDead, 1);
        this.playAnimation(this.imagesEndbossDead);
        setTimeout(() => {
            clearInterval(this.animationInterval);
            this.speedY = 5;
            this.applyGravity();
            this.endGame = true;
        }, 1500)
    }


    /**
     * submits array of images for animation,
     * set corresponding sound effect and increase movement speed
     */
    endbossHurt() {
        this.playAnimation(this.imagesEndbossHurt);
        this.world.playSound(this.soundHurt, 0.2);
        this.speed++;
    }


    /**
     * submits array of images for animation
     */
    endbossAlert() {
        this.playAnimation(this.imagesEndbossAlert);
    }


    /**
     * submits array of images for animation
     * and set corresponding sound effect
     */
    endbossAttack() {
        this.playAnimation(this.imagesEndbossAttack);
        this.world.playSound(this.soundAttack, 0.2);
    }


    /**
     * submits array of images for animation
     */
    endbossWalk() {
        this.playAnimation(this.imagesEndbossWalking);
    }

}