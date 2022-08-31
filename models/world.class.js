class World {
    canvas;
    ctx;
    keyboard;
    cameraX = 0;

    character = new Character();
    healthStatus = new HealthStatusBar();
    coinStatus = new CoinStatusBar();
    bottleStatus = new BottleStatusBar();
    throwableObject = [];

    level = level1;

    
    constructor(canvas, keyboard){
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.draw();
        this.setWorld();
        this.run();
    }


    setWorld(){
        this.character.world = this;
    }


    run(){
        setInterval(()=>{
            this.checkThrowObject();
            this.checkCollisionEnemy();
        }, 300)
        setInterval(()=>{
            this.checkCollisionCoin();
        }, 1000/60);
    }


    checkCollisionEnemy(){
        this.level.enemies.forEach((enemy)=>{
            if(this.character.isColliding(enemy)){
                this.character.hit();
                this.healthStatus.setPercentage(this.character.energy);
            }
        });
    }


    checkCollisionCoin(){
        this.level.coins.forEach((coin)=>{
            if(this.character.isColliding(coin)){
                let i = this.level.coins.indexOf(coin);
                this.level.coins.splice(i, 1);
                this.coinStatus.collectedCoins++;
            }
        });
    }


    checkThrowObject(){
        if(this.keyboard.D){
            let bottle = new ThrowableObjects(this.character.x + 100, this.character.y +100);
            this.throwableObject.push(bottle);
        }
    }


    draw(){
        this.clearCanvas();
        this.drawLevel();
        this.drawFixedObjects();
        this.repeatDrawFunction();
    }


    clearCanvas(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    drawLevel(){
        this.ctx.translate(this.cameraX , 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObject);
        this.addToMap(this.character);
        this.ctx.translate(-this.cameraX , 0);
    }


    drawFixedObjects(){
        this.addToMap(this.healthStatus);
        this.addToMap(this.coinStatus);
        this.addToMap(this.bottleStatus);
        this.drawCollectedItems();
    }


    repeatDrawFunction(){
        self = this;
        requestAnimationFrame(function (){
            self.draw();
        });
    }


    drawCollectedItems(){
        this.ctx.font = '30px Comic Sans MS';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(this.coinStatus.collectedCoins,  80, 102);
        this.ctx.fillText(this.bottleStatus.collectedBottles,  170, 102);
    }


    addObjectsToMap(objects){
        objects.forEach(object =>{
            this.addToMap(object);
        });
    }


    addToMap(object){
        if(object.changeDirection){
            this.flipImage(object);
        }

        object.draw(this.ctx);

        if(object.changeDirection){
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