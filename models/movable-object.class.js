class MovableObject extends DrawableObjects {

    speed = 0.15;
    speedY = 0;
    acceleration = 1;
    changeDirection = false;
    energy = 100;
    lastHit = 0;
    attack = false;
    endGame = false;


    /**
     * function sets one image after another to animate movement
     * 
     * @param {Array} images - array of Images used for animation
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * increases the x coordinate and moves objects to the right
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * decreases the x coordinate and moves objects to the left
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * sets gravity on elements that move on y-axis (jump)
     */
    applyGravity() {
        setInterval(() => {
            if (this.aboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }


    /**
     * returns character after jump back to the ground
     * or lets them fall out of game
     * 
     * @returns {boolean}
     */
    aboveGround() {
        if (this instanceof ThrowableObjects || this.isDead()) { //trowable objects dont stop to fall
            return true;
        }
        else {
            return this.y < 175;
        }
    }


    /**
     * moves character on y-axis to animate jump
     * 
     * @param {number} speed - speed to move on y-axis
     */
    jump(speed) {
        this.speedY = speed;
    }


    /**
     * determines coordinates of two objects and if they are colliding
     * offset value adjust object size
     * 
     * @param {object} object - game character
     * @returns {boolean}
     */
    isColliding(object) {
        return this.x + this.width - this.offset.right > object.x + object.offset.left &&
            this.y + this.height - this.offset.bottom > object.y + object.offset.top &&
            this.x + this.offset.left < object.x + object.width - object.offset.right &&
            this.y + this.offset.top < object.y + object.height - object.offset.bottom;
    }


    /**
     * subtracts damage from energy and
     * takes current time
     * 
     * @param {number} damage 
     */
    hit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * adds value of energy
     * 
     * @param {number} life 
     */
    heal(life){
        this.energy += life;
        if (this.energy > 100) {
            this.energy = 100;
        }
    }


    /**
     * takes the time span from the last hit 
     * to the current time and sets a time limit
     * 
     * @returns {boolean}
     */
    isHurt() {
        let timeSinceLastHit = new Date().getTime() - this.lastHit;
        return timeSinceLastHit < 500;
    }


    /**
     * verifies if character is dead or not
     * 
     * @returns {boolean}
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * determines coordinates of two objects 
     * and if they are in the given distance
     * offset value adjust object size
     * 
     * @param {object} object - game character
     * @param {number} distance 
     * @returns {boolean}
     */
    reachedEndboss(object, distance){
        return this.x + this.width + distance -this.offset.right > object.x + object.offset.left
    }
}