class MovableObject extends DrawableObjects {

    speed = 0.15;
    changeDirection = false;

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



}