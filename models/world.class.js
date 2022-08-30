class World {
    canvas;
    ctx;
    keyboard;
    cameraX = 0;

    character = new Character();
    healthStatus = new healthStatusBar();

    level = level1;

    
    constructor(canvas, keyboard){
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }


    setWorld(){
        this.character.world = this;
    }


    checkCollisions(){
        setInterval(()=>{
            this.level.enemies.forEach((enemy)=>{
                if(this.character.isColliding(enemy)){
                    this.character.hit();
                    this.healthStatus.setPercentage(this.character.energy);
                }
            });
        }, 1000)
    }


    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX , 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);

        this.ctx.translate(-this.cameraX , 0);
        //space for fixed objects
        this.addToMap(this.healthStatus );
        this.ctx.translate(this.cameraX , 0);

        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.cameraX , 0);

        self = this;
        requestAnimationFrame(function (){
            self.draw();
        });
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
        object.drawFrame(this.ctx);


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