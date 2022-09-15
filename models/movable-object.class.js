class MovableObject extends DrawableObject {

    speed = 0.15;
    speedY = 0;
    acceleration = 1;
    changeDirection = false;
    energy = 100;
    lastHit = 0;
    attack = false;
    endGame = false;


    /**
     * Function sets one image after another to animate movement
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
     * Increases the x coordinate and moves objects to the right
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * Decreases the x coordinate and moves objects to the left
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * Sets gravity on elements that move on y-axis (jump)
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
     * Returns object back to the ground
     * or lets them fall out of game
     * 
     * @returns {boolean}
     */
    aboveGround() {
        if (this instanceof ThrowableObjects || this.isDead())
            return true;
        else
            return this.y < 175;
    }


    /**
     * Moves character on y-axis to animate jump
     * 
     * @param {number} speed - speed to move on y-axis
     */
    jump(speed) {
        this.speedY = speed;
    }


    /**
     * Determines coordinates of two objects and if they are colliding
     * offset value adjust object size
     * 
     * @param {object} object - game character
     * @returns {boolean}
     */
    isColliding(object) {
        return  this.rightBorder() > this.leftObjectBorder(object) &&
            this.bottomBorder() >  this.topObjectBorder(object) &&
            this.leftBorder() < this.rightObjectBorder(object) &&
            this.topBorder() < this.bottomObjectBorder(object);
    }


    rightBorder(){
        return this.x + this.width - this.offset.right;
    }


    leftBorder(){
        return this.x + this.offset.left
    }


    topBorder(){
        return this.y + this.offset.top;
    }


    bottomBorder(){
        return this.y + this.height - this.offset.bottom;
    }


    rightObjectBorder(object){
        return object.x + object.width - object.offset.right;
    }


    leftObjectBorder(object){
        return object.x + object.offset.left;
    }


    topObjectBorder(object){
        return object.y + object.offset.top;
    }


    bottomObjectBorder(object){
        return object.y + object.height - object.offset.bottom;
    }


    /**
     * Subtracts damage from energy and takes current time
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
     * Adds value of energy
     * 
     * @param {number} life 
     */
    heal(life){
        this.energy += life;
        if (this.energy > 100)
            this.energy = 100;
    }


    /**
     * Takes the time span from the last hit 
     * to the current time and sets a time limit
     * 
     * @returns {boolean}
     */
    isHurt() {
        let timeSinceLastHit = new Date().getTime() - this.lastHit;
        return timeSinceLastHit < 500;
    }


    /**
     * Verifies if character is dead or not
     * 
     * @returns {boolean}
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * Determines coordinates of two objects 
     * and if they are in the given distance
     * offset value adjust object size
     * 
     * @param {object} object - game character
     * @param {number} distance 
     * @returns {boolean}
     */
    reachedEndboss(object, distance){
        return this.rightBorder() + distance > this.leftObjectBorder(object);
    }
}