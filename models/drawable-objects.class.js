class DrawableObjects{
    x = 120;
    y = 175;
    height = 250;
    width = 125;

    img;
    imageCache = {};
    currentImage = 0;

    /**
     * loads the start image
     * 
     * @param {string} path - Image path 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * loads array of images and moves images to another array
     * 
     * @param {Array} arr - array of Images used for animation
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }


    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof BabyChicken) {
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }








}