class World {
    canvas;
    ctx;
    keyboard;
    cameraX = 0;

    character = new Character();

    level = level1;

    
    constructor(canvas, keyboard){
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.draw();
        this.setWorld();
    }


    setWorld(){
        this.character.world = this;
    }


    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX , 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
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
            object.flipImage(this.ctx);
        }

        object.draw(this.ctx);
        object.drawFrame(this.ctx);



        if(object.changeDirection){
            object.flipImageBack(this.ctx);
        }
    }



}