let canvas;
let world;
let soundOn;
let musicOn;
let keyboard;


function init(){
    canvas = document.getElementById('canvas');
}


function startGame(){
    hideElement('startContainer');
    initLevel();
    keyboard = new Keyboard();
    world = new World(canvas, keyboard, soundOn, musicOn);
    setTimeout(()=>{
        document.getElementById('hud').classList.add('d-flex');
    }, 1000);
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
    document.getElementById('container').classList.add('fullscreen');
    document.getElementById('fullscreenButton').setAttribute('onclick', `javascript: closeFullscreen()`);
}


function closeFullscreen(){
    document.exitFullscreen();
    document.getElementById('container').classList.remove('fullscreen');
    document.getElementById('fullscreenButton').setAttribute('onclick', `javascript: fullscreen()`);
}


