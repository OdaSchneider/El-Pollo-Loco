class World extends DrawWorld {
    canvas;
    ctx;
    keyboard;
    cameraX = 0;
    slowInterval;
    fastInterval;


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

    soundCollectCoin = new Audio('audio/coinCollect.mp3');
    soundCollectBottle = new Audio('audio/bottelCollect.mp3');
    soundCollectHeart = new Audio('audio/heartCollect.mp3');
    soundBrokenBottle = new Audio('audio/brokenBottle.mp3');
    soundDeadChicken = new Audio('audio/chickenDeath.mp3');
    soundDeadBabyChicken = new Audio('audio/babyChickenDeath.mp3');
    soundEndboss = new Audio('audio/endboss.mp3');
    soundWon = new Audio('audio/win.mp3');
    soundLost = new Audio('audio/youLost.mp3');
    music = new Audio('audio/music.mp3');

    gameOver = new Endscreen('img/9_intro_outro_screens/game_over/game over!.png', this.character.x - 120);
    lost = new Endscreen('img/9_intro_outro_screens/game_over/oh no you lost!.png', this.character.x - 120);


    constructor(canvas, keyboard) {
        super();
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        super.drawWorld();
        this.setWorld();
        this.run();
        this.playMusic();
    }


    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }


    /**
     * defines two diffrent Intervals for calling functions
     */
    run() {
        this.slowInterval = setInterval(() => {
            this.slowIntervalAction();
        }, 300);
        this.fastInterval = setInterval(() => {
            this.fastIntervalAction();
        }, 1000 / 60);
    }


    /**
     * calls functions for slower Interval
     */
    slowIntervalAction(){
        this.checkThrowObject();
        this.checkCollisionEnemy();
        this.checkCollisionEndboss();
        this.setLevelEnd();
    }


    /**
     * calls functions for faster Interval
     */
    fastIntervalAction(){
        this.checkCollisionItems();
        this.checkJumpOnEnemy();
        this.checkJumpOnSmallEnemy();
        this.fightEndboss();
        this.endOfGame();
    }


    /**
     * sets end of level on x-axis
     */
    setLevelEnd(){
        this.levelEnd = this.endboss.x;
    }


    /**
     * checks if sound is on or not
     * 
     * @param {object} sound - audio file
     * @param {number} volume 
     */
    playSound(sound, volume){
        if(soundOn()){
            sound.play();
            sound.volume = volume;
        }else{
            this.pauseSound(sound);
        }
    }


    /**
     * pauses sound
     * 
     * @param {object} sound - audio file
     */
    pauseSound(sound){
        sound.pause();
        sound.volume = 0;
    }


    /**
     * checks if sound is on or not
     */
    playMusic() {
        if(musicOn()){
            this.music.play();
            this.music.volume = 0.2;
        }else{
            this.pauseMusic();
        }
    }


    /**
     * pauses sound
     */
    pauseMusic(){
        this.music.pause();
        this.music.volume = 0;
    }


    /**
     * gets all enemies to check if they are colliding
     */
    checkCollisionEnemy() {
        this.level.enemies.forEach((enemy) => {
            this.collision(enemy, 5);
        });
        this.level.smallEnemies.forEach((enemy) => {
            this.collision(enemy, 2);
        });
    }


    /**
     * checks collision and sets the damage
     * 
     * @param {object} enemy - enemy that collides
     * @param {number} damage - damage that costs collision
     */
    collision(enemy, damage){
        if (this.character.isColliding(enemy) && !this.endboss.endGame) {
            this.character.hit(damage);
            this.healthStatus.setPercentage(this.character.energy);
        }
    }


    /**
     * checks collision with endboss and sets the damage
     * starts attack animation endboss
     */
    checkCollisionEndboss(){
        if (this.character.reachedEndboss(this.endboss, 50) && !this.endboss.isDead()) {
            this.endboss.attack = true;
            this.character.hit(10);
            this.healthStatus.setPercentage(this.character.energy);
        } else{
            this.endboss.attack = false;
        }
    }


    /**
     * gets all enemies to check if character is colliding threw jumping
     */
     checkJumpOnEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.aboveGround() && this.character.speedY < 0) {
                this.deadEnemy(enemy);
            }
        });
    }


    /**
     * gets all enemies to check if character is colliding threw jumping
     */
    checkJumpOnSmallEnemy() {
        this.level.smallEnemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.aboveGround() && this.character.speedY < 0) {
                this.deadSmallEnemy(enemy);
            }
        });
    }


    /**
     * animats dead enemy
     * 
     * @param {object} enemy - enemy that dies
     */
    deadEnemy(enemy) {
        let deadChicken = new DeadChicken(enemy.x, enemy.y);
        this.deadEnemies.push(deadChicken);
        this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
        this.playSound(this.soundDeadChicken, 0.2);
        setTimeout(() => {
            this.deadEnemies.splice(deadChicken);
        }, 1000);
    }


    /**
     * animats dead enemy
     * 
     * @param {object} enemy - enemy that dies
     */
    deadSmallEnemy(enemy) {
        let deadBabyChicken = new DeadBabyChicken(enemy.x, enemy.y);
        this.deadEnemies.push(deadBabyChicken);
        this.level.smallEnemies.splice(this.level.smallEnemies.indexOf(enemy), 1);
        this.playSound(this.soundDeadBabyChicken, 1);
        setTimeout(() => {
            this.deadEnemies.splice(deadBabyChicken);
        }, 1000);
    }


    /**
     * successively checks different possible states for fight
     * and sets sound effects
     */
    fightEndboss() {
        if(this.endboss.isDead()){
            this.pauseSound(this.soundEndboss);
        } else if (this.character.reachedEndboss(this.endboss, 520) && !this.character.isDead()) {
            this.playSound(this.soundEndboss, 0.8);
            this.music.pause();
            this.checkStartWalkingEndboss();
        } else{
            this.pauseSound(this.soundEndboss);
            this.playMusic();
        }
    }


    /**
     * activates endboss movement if is reached
     */
    checkStartWalkingEndboss(){
        if (this.character.reachedEndboss(this.endboss, 480)){
            this.endboss.startWalking = true;
        }
    }


    /**
     * calls functions for every collectable item
     */
    checkCollisionItems() {
        this.checkCollisionCoin();
        this.checkCollectBottle();
        this.checkCollisionHeart();
        this.checkCollisionThrownBottle();
    }


    /**
     * animates coin collection and adds them in the statusbar
     */
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


    /**
     * animates bottle collection and adds them in the statusbar
     */
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


    /**
     * animates heart collection and sets life points
     */
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


    /**
     * calls function for bottle collision
     */
    checkCollisionThrownBottle() {
        this.bottleCollisionSmallEnemy();
        this.bottleCollisionEnemy();
        this.bottleCollisionEndboss();
    }


    /**
     * animats bottle collision with enemy
     */
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


    /**
     * animats bottle collision with enemy
     */
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


    /**
     * animats bottle collision with endboss and set damage
     */
    bottleCollisionEndboss() {
        this.throwableObject.forEach((bottle) => {
            if (this.endboss.isColliding(bottle) && !this.endboss.isDead()) {
                this.splashedBottle(bottle);
                this.endboss.hit(10);
                this.healthStatusEndboss.setPercentage(this.endboss.energy);
            }
        });
    }


    /**
     * animates bottle hit
     * 
     * @param {object} bottle - bottle that hits
     */
    splashedBottle(bottle) {
        let splashedBottle = new BottleSplash(bottle.x, bottle.y);
        this.thrownBottle.push(splashedBottle);
        this.playSound(this.soundBrokenBottle, 1);
        this.throwableObject = [];
        setTimeout(() => {
            this.thrownBottle.splice(splashedBottle);
        }, 500);
    }


    /**
     * checks condition for throwing bottle and 
     * starts bottle throw
     */
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


    /**
     * checks for win or lose at end of game
     */
    endOfGame(){
        if(this.character.endGame){
            let sound = this.soundLost
            this.playEndSound(sound);
        } else if(this.endboss.endGame){
            let sound = this.soundWon;
            this.playEndSound(sound);
        }
    }


    /**
     * play end of game sound calls reset function
     * 
     * @param {object} sound - audio that will play at the end
     */
    playEndSound(sound){
        this.playSound(sound, 1); 
        this.pauseMusic();
        this.resetGame(sound);
    }


    /**
     * stop intervals and calls restart function
     */
    resetGame(sound){      
        clearInterval(this.slowInterval);
        clearInterval(this.fastInterval);
        setTimeout(()=>{
            this.restartGame(); 
            this.pauseMusic(sound)
        }, 4000)
    }


    /**reload page */
    restartGame(){
        window.location = window.location;
    }
}