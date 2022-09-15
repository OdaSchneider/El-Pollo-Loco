class Keyboard{
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

    constructor(){
        this.keyPressEvents();
        this.touchEvents();
    }


    /**
     * calls functions for different keypress Events
     * movement navigation for keyboard
     */
    keyPressEvents(){
        this.keydownEvent();
        this.keyupEvent();
    }


    /**
     * determines keydown events and activates corresponding variables
     */
    keydownEvent(){
        window.addEventListener("keydown" , (event) => {
            if(event.keyCode == 32){
                keyboard.SPACE = true;
            }
            if(event.keyCode == 37){
                keyboard.LEFT = true;
            }
            if(event.keyCode == 38){
                keyboard.UP = true;
            }
            if(event.keyCode == 39){
                keyboard.RIGHT = true;
            }
            if(event.keyCode == 40){
                keyboard.DOWN = true;
            }
            if(event.keyCode == 68){
                keyboard.D = true;
            }
        });
    }


    /**
     * determines keyup events and inactivates corresponding variables
     */
    keyupEvent(){
        window.addEventListener("keyup" , (event) => {
            if(event.keyCode == 32){
                keyboard.SPACE = false;
            }
            if(event.keyCode == 37){
                keyboard.LEFT = false;
            }
            if(event.keyCode == 38){
                keyboard.UP = false;
            }
            if(event.keyCode == 39){
                keyboard.RIGHT = false;
            }
            if(event.keyCode == 40){
                keyboard.DOWN = false;
            }
            if(event.keyCode == 68){
                keyboard.D = false;
            }
        });
    }


    /**
     * calls functions for different touch Events
     * movement navigation for smartphone
     */
    touchEvents(){
        this.moveLeftTouch();
        this.moveRightTouch();
        this.jumpTouch();
        this.throwBottleTouch();
    }


    /**
     * determines touch events on certain Button 
     * and activates/inactivates corresponding variables to move left
     */
    moveLeftTouch(){
        document.getElementById('btnLeft').addEventListener('touchstart', (e) =>{
            e.preventDefault();
            this.LEFT= true;
            document.getElementById('btnLeft').classList.add('buttonOnTouch');
        });

        document.getElementById('btnLeft').addEventListener('touchend', (e) =>{
            e.preventDefault();
            this.LEFT= false;
            document.getElementById('btnLeft').classList.remove('buttonOnTouch');
        });
    }


    /**
     * determines touch events on certain Button 
     * and activates/inactivates corresponding variables to move right
     */
    moveRightTouch(){
        document.getElementById('btnRight').addEventListener('touchstart', (e) =>{
            e.preventDefault();
            this.RIGHT= true;
            document.getElementById('btnRight').classList.add('buttonOnTouch');
        });

        document.getElementById('btnRight').addEventListener('touchend', (e) =>{
            e.preventDefault();
            this.RIGHT= false;
            document.getElementById('btnRight').classList.remove('buttonOnTouch');
        });
    }


    /**
     * determines touch events on certain Button 
     * and activates/inactivates corresponding variables to jump
     */
    jumpTouch(){
        document.getElementById('btnJump').addEventListener('touchstart', (e) =>{
            e.preventDefault();
            this.SPACE= true;
            document.getElementById('btnJump').classList.add('buttonOnTouch');
        });

        document.getElementById('btnJump').addEventListener('touchend', (e) =>{
            e.preventDefault();
            this.SPACE= false;
            document.getElementById('btnJump').classList.remove('buttonOnTouch');
        });
    }


    /**
     * determines touch events on certain Button 
     * and activates/inactivates corresponding variables to thorw bottle
     */
    throwBottleTouch(){
        document.getElementById('btnThrow').addEventListener('touchstart', (e) =>{
            e.preventDefault();
            this.D= true;
            document.getElementById('btnThrow').classList.add('buttonOnTouch');
        });

        document.getElementById('btnThrow').addEventListener('touchend', (e) =>{
            e.preventDefault();
            this.D= false;
            document.getElementById('btnThrow').classList.remove('buttonOnTouch');
        });
    }
}