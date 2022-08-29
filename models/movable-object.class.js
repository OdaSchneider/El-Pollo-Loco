class MovableObject extends DrawableObjects {

    speed = 0.15;
    speedY = 0;
    acceleration = 1;
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


    applyGravity() {
        setInterval(() => {
            if (this.aboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    aboveGround(){
        return this.y < 175;
    }


    jump(){
        this.speedY = 15;
    }


    drawFrame(ctx){
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }

}