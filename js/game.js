let canvas;
let world;
let soundOn;
let musicOn;
let keyboard = new Keyboard();


function init(){
    canvas = document.getElementById('canvas');
}


function startGame(){
    world = new World(canvas, keyboard, soundOn, musicOn);
    hideElement('startContainer');
}


function settings(){
    hideElementAnimated('controlMenu');
    showElementAnimated('settingsMenu');
}


function control(){
    hideElementAnimated('settingsMenu');
    showElementAnimated('controlMenu');
}


function closeMenu(){
    hideElementAnimated('settingsMenu');
    hideElementAnimated('controlMenu');
}

function doNotClose(event){
    event.stopPropagation();
}


function showElement(element) {
    document.getElementById(`${element}`).classList.remove('d-none');
}


function showElementAnimated(element) {
    document.getElementById(`${element}`).classList.remove('vis-hidden');
    setTimeout(()=>{
        document.getElementById(`${element}`).classList.remove('d-none');
    }, 400)
}


function hideElement(element) {
    document.getElementById(`${element}`).classList.add('d-none');
}


function hideElementAnimated(element) {
    document.getElementById(`${element}`).classList.add('vis-hidden');
    setTimeout(()=>{
        document.getElementById(`${element}`).classList.add('d-none');
    }, 400)
}


function sound(){
    let sound = document.getElementById('soundToggle');
    if(sound){
        soundOn = true;
    }else{
        soundOn = false;
    }
}


function music(){
    let music = document.getElementById('musicToggle');
    if(music){
        musicOn = true;
    }else{
        musicOn = false;
    }
}


function fullscreen(){
    let container = document.getElementById('container');
    container.requestFullscreen();
    document.getElementById('canvas').classList.add('fullscreen');
    document.getElementById('fullscreenButton').setAttribute('onclick', `javascript: closeFullscreen()`);
}


function closeFullscreen(){
    document.exitFullscreen();
    document.getElementById('canvas').classList.remove('fullscreen');
    document.getElementById('fullscreenButton').setAttribute('onclick', `javascript: fullscreen()`);
}


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