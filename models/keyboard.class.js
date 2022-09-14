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

    keyPressEvents(){
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


    touchEvents(){
        document.getElementById('btnLeft').addEventListener('touchstart', (e) =>{
            e.preventDefault();
            this.LEFT= true;
        });

        document.getElementById('btnLeft').addEventListener('touchend', (e) =>{
            e.preventDefault();
            this.LEFT= false;
        });

        document.getElementById('btnRight').addEventListener('touchstart', (e) =>{
            e.preventDefault();
            this.RIGHT= true;
        });

        document.getElementById('btnRight').addEventListener('touchend', (e) =>{
            e.preventDefault();
            this.RIGHT= false;
        });

        document.getElementById('btnJump').addEventListener('touchstart', (e) =>{
            e.preventDefault();
            this.SPACE= true;
        });

        document.getElementById('btnJump').addEventListener('touchend', (e) =>{
            e.preventDefault();
            this.SPACE= false;
        });

        document.getElementById('btnThrow').addEventListener('touchstart', (e) =>{
            e.preventDefault();
            this.D= true;
        });

        document.getElementById('btnThrow').addEventListener('touchend', (e) =>{
            e.preventDefault();
            this.D= false;
        });
    }
}