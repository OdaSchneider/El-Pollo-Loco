class World {
    canvas;
    ctx;
    keyboard;
    cameraX = 0;
    music = new Audio('../audio/music.mp3');

    character = new Character();
    endboss = new Endboss();
    healthStatus = new HealthStatusBar();
    healthStatusEndboss = new HealthStatusBarEndboss();
    coinStatus = new CoinStatusBar();
    bottleStatus = new BottleStatusBar();
    throwableObject = [];
    thrownBottle = [];
    deadEnemies = [];

    level = level1;
    levelEnd;

    soundOn = true;
    musicOn = false;
    soundCollectCoin = new Audio('../audio/coinCollect.mp3');
    soundCollectBottle = new Audio('../audio/bottelCollect.mp3');
    soundCollectHeart = new Audio('../audio/heartCollect.mp3');
    soundBrokenBottle = new Audio('../audio/brokenBottle.mp3');
    soundDeadChicken = new Audio('../audio/chickenDeath.mp3');
    soundDeadBabyChicken = new Audio('../audio/babyChickenDeath.mp3');
    soundEndboss = new Audio('../audio/endboss.mp3');
    soundWon = new Audio('../audio/win.mp3');
    soundLost = new Audio('../audio/youLost.mp3');

    gameOver = new Endscreen('../img/9_intro_outro_screens/game_over/game over!.png', this.character.x - 120);
    lost = new Endscreen('../img/9_intro_outro_screens/game_over/oh no you lost!.png', this.character.x - 120);


    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.draw();
        this.setWorld();
        this.run();
        this.playMusic();
    }


    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }


    run() {
        setInterval(() => {
            this.checkThrowObject();
            this.checkCollisionEnemy();
            this.checkCollisionSmallEnemy();
            this.checkCollisionEndboss();
            this.setLevelEnd();
        }, 200)
        setInterval(() => {
            this.checkCollisionItems();
            this.checkJumpOnEnemy();
            this.checkJumpOnSmallEnemy();
            this.fightEndboss();
            this.endOfGame();
        }, 1000 / 60);
    }


    setLevelEnd(){
        this.levelEnd = this.endboss.x;
    }


    playSound(sound, volume){
        if(this.soundOn){
            sound.play();
            sound.volume = volume;
        }else{
            this.pauseSound(sound);
        }
    }


    pauseSound(sound){
        sound.pause();
        sound.volume = 0;
    }


    playMusic() {
        if(this.musicOn){
            this.music.play();
            this.music.volume = 0.2;
        }else{
            this.music.pause();
        }
    }


    checkCollisionEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.endboss.endGame) {
                this.character.hit(5);
                this.healthStatus.setPercentage(this.character.energy);
            }
        });
    }


    checkCollisionSmallEnemy() {
        this.level.smallEnemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.endboss.endGame) {
                this.character.hit(2);
                this.healthStatus.setPercentage(this.character.energy);
            }
        });
    }


    checkCollisionEndboss(){
        if (this.character.reachedEndboss(this.endboss, 50) && !this.endboss.isDead()) {
            this.endboss.attack = true;
            this.character.hit(10);
            this.healthStatus.setPercentage(this.character.energy);
        } else{
            this.endboss.attack = false;
        }
    }


    checkJumpOnEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.aboveGround() && this.character.speedY < 0) {
                this.deadEnemy(enemy);
            }
        });
    }


    checkJumpOnSmallEnemy() {
        this.level.smallEnemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.aboveGround() && this.character.speedY < 0) {
                this.deadSmallEnemy(enemy);
            }
        });
    }


    fightEndboss() {
        if(this.endboss.isDead()){
            this.pauseSound(this.soundEndboss);
        } else if (this.character.reachedEndboss(this.endboss, 520)) {
            this.playSound(this.soundEndboss, 0.2);
            this.music.pause();
            this.checkStartWalkingEndboss();
        } else {
            this.pauseSound(this.soundEndboss);
            // this.music.play();
        }
    }


    checkStartWalkingEndboss(){
        if (this.character.reachedEndboss(this.endboss, 480)){
            this.endboss.startWalking = true;
        }
    }


    checkCollisionItems() {
        this.checkCollisionCoin();
        this.checkCollectBottle();
        this.checkCollisionHeart();
        this.checkCollisionThrownBottle();
    }


    checkCollisionCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                let i = this.level.coins.indexOf(coin);
                this.level.coins.splice(i, 1);
                this.coinStatus.collectedCoins++;
                this.playSound(this.soundCollectCoin, 1);
            }
        });
    }


    checkCollectBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                let i = this.level.bottles.indexOf(bottle);
                this.level.bottles.splice(i, 1);
                this.bottleStatus.collectedBottles++;
                this.bottleStatus.bottleDepot.push(bottle);
                this.playSound(this.soundCollectBottle, 0.2);
            }
        });
    }


    checkCollisionHeart() {
        this.level.hearts.forEach((heart) => {
            if (this.character.isColliding(heart)) {
                let i = this.level.hearts.indexOf(heart);
                this.level.hearts.splice(i, 1);
                this.character.heal(10);
                this.healthStatus.setPercentage(this.character.energy);
                this.playSound(this.soundCollectHeart, 0.5);
            }
        });
    }


    checkCollisionThrownBottle() {
        this.bottleCollisionSmallEnemy();
        this.bottleCollisionEnemy();
        this.bottleCollisionEndboss();
    }


    bottleCollisionSmallEnemy() {
        this.throwableObject.forEach((bottle) => {
            this.level.smallEnemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    this.splashedBottle(bottle);
                    this.deadSmallEnemy(enemy);
                }
            })
        });
    }


    bottleCollisionEnemy() {
        this.throwableObject.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    this.splashedBottle(bottle);
                    this.deadEnemy(enemy);
                }
            })
        });
    }


    bottleCollisionEndboss() {
        this.throwableObject.forEach((bottle) => {
            if (this.endboss.isColliding(bottle) && !this.endboss.isDead()) {
                this.splashedBottle(bottle);
                this.endboss.hit(10);
                this.healthStatusEndboss.setPercentage(this.endboss.energy);
            }
        });
    }


    deadEnemy(enemy) {
        let deadChicken = new DeadChicken(enemy.x, enemy.y);
        this.deadEnemies.push(deadChicken);
        this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
        this.playSound(this.soundDeadChicken, 0.2);
        setTimeout(() => {
            this.deadEnemies.splice(deadChicken);
        }, 1000);
    }


    deadSmallEnemy(enemy) {
        let deadBabyChicken = new DeadBabyChicken(enemy.x, enemy.y);
        this.deadEnemies.push(deadBabyChicken);
        this.level.smallEnemies.splice(this.level.smallEnemies.indexOf(enemy), 1);
        this.playSound(this.soundDeadBabyChicken, 1);
        setTimeout(() => {
            this.deadEnemies.splice(deadBabyChicken);
        }, 1000);
    }


    splashedBottle(bottle) {
        let splashedBottle = new BottleSplash(bottle.x, bottle.y);
        this.thrownBottle.push(splashedBottle);
        this.playSound(this.soundBrokenBottle, 1);
        this.throwableObject = [];
        setTimeout(() => {
            this.thrownBottle.splice(splashedBottle);
        }, 500);
    }


    checkThrowObject() {
        if (this.keyboard.D) {
            if (!this.character.changeDirection && this.bottleStatus.collectedBottles > 0 && !this.endboss.endGame) {
                let bottle = new ThrowableObjects(this.character.x + 100, this.character.y + 100);
                this.throwableObject.push(bottle);
                this.bottleStatus.collectedBottles--;
                this.bottleStatus.bottleDepot.splice(0, 1);
            }
        }
    }


    endOfGame(){
        if(this.character.endGame){
            let sound = this.soundLost
            this.playSoundEndOfGame(sound);
        } else if(this.endboss.endGame){
            let sound = this.soundWon;
            this.playSoundEndOfGame(sound);
        }
    }
    

    playSoundEndOfGame(sound){
        this.playSound(sound, 1);       
        setTimeout(()=>{
            this.soundOn = false;
            this.restartGame(); 
        }, 4000);
    }


    restartGame(){
        location.reload();
    }


    draw() {
        this.clearCanvas();
        this.drawLevel();
        this.drawFixedObjects();
        this.drawEndscreen();
        this.repeatDrawFunction();
    }


    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    drawLevel() {
        this.ctx.translate(this.cameraX, 0);
        this.drawBackground();
        this.drawItems();
        this.drawGameCharacters();
        this.ctx.translate(-this.cameraX, 0);
    }


    drawBackground(){
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }


    drawItems(){
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.hearts);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.thrownBottle);
    }


    drawGameCharacters(){
        this.addObjectsToMap(this.level.smallEnemies);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.deadEnemies);
        this.addToMap(this.character);
        this.addToMap(this.endboss);
    }


    drawFixedObjects() {
        this.addToMap(this.healthStatus);
        this.addToMap(this.coinStatus);
        this.addToMap(this.bottleStatus);
        this.drawHealthStatusEndboss();
        this.drawCollectedItems();
    }


    drawHealthStatusEndboss() {
        if (this.character.reachedEndboss(this.endboss, 520)) {
            this.addToMap(this.healthStatusEndboss);
        }
    }


    drawEndscreen(){
        if(this.character.endGame){
            this.addToMap(this.lost);
        } else if(this.endboss.endGame){
            this.addToMap(this.gameOver);
        }
    }


    repeatDrawFunction() {
        self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    drawCollectedItems() {
        this.ctx.font = '30px Comic Sans MS';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(this.coinStatus.collectedCoins, 80, 102);
        this.ctx.fillText(this.bottleStatus.collectedBottles, 170, 102);
    }


    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }


    addToMap(object) {
        if (object.changeDirection) {
            this.flipImage(object);
        }

        object.draw(this.ctx);

        if (object.changeDirection) {
            this.flipImageBack(object);
        }
    }


    flipImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    }


    flipImageBack(object) {
        this.ctx.restore();
        object.x = object.x * -1;
    }


}