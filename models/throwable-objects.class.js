class ThrowableObjects extends MovableObject{


    imagesBottleRotation = [
        '../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    
    constructor(x, y){
        super().loadImage('../img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.imagesBottleRotation);
        this.x = x;
        this.y = y;
        this.width = 70;
        this.height = 80;
        this.throw();
    }

    throw(){
        this.speedY = 20;
        this.applyGravity();


        setInterval(() =>{
            this.x += 12;
        }, 25);

        setInterval(() =>{
            this.playAnimation(this.imagesBottleRotation);
        }, 50);
    }


    checkThrowDirection(){
        if(!this.changeDirection){
            this.x += 12;
        } else{
            this.x -= 12;
        }
    }
}