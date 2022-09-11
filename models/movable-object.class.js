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
     * set one image after another to animate movement
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


    applyGravity() {
        setInterval(() => {
            if (this.aboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }


    aboveGround() {
        if (this instanceof ThrowableObjects || this.isDead()) { //trowable objects dont stop to fall
            return true;
        }
        else {
            return this.y < 175;
        }
    }


    jump(speed) {
        this.speedY = speed;
    }


    isColliding(object) {
        return this.x + this.width - this.offset.right > object.x + object.offset.left &&
            this.y + this.height - this.offset.bottom > object.y + object.offset.top &&
            this.x + this.offset.left < object.x + object.width - object.offset.right &&
            this.y + this.offset.top < object.y + object.height - object.offset.bottom;
    }


    hit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    heal(life){
        this.energy += life;
        if (this.energy > 100) {
            this.energy = 100;
        }
    }


    isHurt() {
        let timeSinceLastHit = new Date().getTime() - this.lastHit;
        return timeSinceLastHit < 500;
    }


    isDead() {
        return this.energy == 0;
    }


    reachedEndboss(object, distance){
        return this.x + this.width + distance -this.offset.right > object.x + object.offset.left &&
        this.x + this.offset.left - distance < object.x + object.width - object.offset.right &&
        this.y + this.offset.top < object.y + object.height - object.offset.bottom;
    }

}