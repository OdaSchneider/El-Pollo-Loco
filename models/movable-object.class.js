class MovableObject extends DrawableObjects {

    speed = 0.15;
    speedY = 0;
    acceleration = 1;
    changeDirection = false;
    energy = 100;
    lastHit = 0;


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
        }, 1000 / 25);
    }


    aboveGround() {
        return this.y < 175;
    }


    jump() {
        this.speedY = 15;
    }


    isColliding(object) {
        return this.x + this.width > object.x &&
            this.y + this.height > object.y &&
            this.x < object.x &&
            this.y < object.y + object.height;
    }


    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isHurt() {
        let timeSinceLastHit = new Date().getTime() - this.lastHit;
        return timeSinceLastHit < 500;
    }


    isDead() {
        return this.energy == 0;
    }

}