class DrawableObject{
    x = 120;
    y = 175;
    height = 250;
    width = 125;

    img;
    imageCache = {};
    currentImage = 0;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    
    /**
     * Loads the start image
     * 
     * @param {string} path - Image path 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Loads array of images and moves images to another array
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
     * Draws all canvas elements
     * 
     * @param {canvas 2D context} ctx - provides context for the drawing surface of a canvas element
     */
    draw(ctx){
        try{        
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch(e){
            console.warn('Error loading Image', e);
            console.log('Could not load Image', this.img.src);
        }

    }
}