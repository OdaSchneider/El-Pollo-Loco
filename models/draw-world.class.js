class DrawWorld{


    /**
     * calls functions to draw all elements 
     */
       drawWorld() {
        this.clearCanvas();
        this.drawLevel();
        this.drawFixedObjects();
        this.drawEndscreen();
        this.repeatDrawFunction();
    }


    /**
     * clears drawed elements 
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    /**
     * is moving camera and calls functions to draw level components
     */
    drawLevel() {
        this.ctx.translate(this.cameraX, 0);
        this.drawBackground();
        this.drawItems();
        this.drawGameCharacters();
        this.ctx.translate(-this.cameraX, 0);
    }


    /**
     * draws background elements
     */
    drawBackground(){
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }


    /**
     * draws background items
     */
    drawItems(){
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.hearts);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.thrownBottle);
    }


    /**
     * draws background game charecters
     */
    drawGameCharacters(){
        this.addObjectsToMap(this.level.smallEnemies);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.deadEnemies);
        this.addToMap(this.character);
        this.addToMap(this.endboss);
    }


    /**
     * draws background fixed objects
     */
    drawFixedObjects() {
        this.addToMap(this.healthStatus);
        this.addToMap(this.coinStatus);
        this.addToMap(this.bottleStatus);
        this.drawHealthStatusEndboss();
        this.drawCollectedItems();
    }


    /**
     * draws background health status endboss
     */
    drawHealthStatusEndboss() {
        if (this.character.reachedEndboss(this.endboss, 520)) {
            this.addToMap(this.healthStatusEndboss);
        }
    }


    /**
     * draws background endscreen
     */
    drawEndscreen(){
        if(this.character.endGame){
            this.addToMap(this.lost);
        } else if(this.endboss.endGame){
            this.addToMap(this.gameOver);
        }
    }


    /**
     * draws number of collected items
     */
    drawCollectedItems() {
        this.ctx.font = '30px Comic Sans MS';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(this.coinStatus.collectedCoins, 80, 102);
        this.ctx.fillText(this.bottleStatus.collectedBottles, 170, 102);
    }


    /**
     * repeat draw function
     */
    repeatDrawFunction() {
        self = this;
        requestAnimationFrame(function () {
            self.drawWorld();
        });
    }


    /**
     * get single elements from JASON
     * 
     * @param {array} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }


    /**
     * checks if direction is changed and add objects to map
     * 
     * @param {object} object - game element
     */
    addToMap(object) {
        if (object.changeDirection) {
            this.flipImage(object);
        }

        object.draw(this.ctx);

        if (object.changeDirection) {
            this.flipImageBack(object);
        }
    }


    /**
     * flips image if direction is changed
     * 
     * @param {object} object - game element
     */
    flipImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    }


    /**
     * flips image if direction is changed
     * 
     * @param {object} object - game element
     */
    flipImageBack(object) {
        this.ctx.restore();
        object.x = object.x * -1;
    }

}