class DrawableObjects {
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

    /**
     * set one image after another to animate movement
     * 
     * @param {Array} images - array of Images used for animation
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    flipImage(ctx){
        ctx.save();
        ctx.translate(this.width, 0);
        ctx.scale(-1 , 1);
        this.x = this.x * -1;
    }


    flipImageBack(ctx){
        ctx.restore();
        this.x = this.x * -1;
    }
}