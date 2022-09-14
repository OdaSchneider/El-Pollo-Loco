let canvas;
let world;
let keyboard;


function init(){
    canvas = document.getElementById('canvas');
}


function startGame(){
    initLevel();
    keyboard = new Keyboard();
    world = new World(canvas, keyboard);
    setTimeout(()=>{
        addMenuButtons();
        document.getElementById('hud').classList.add('d-flex');
    }, 1000);
}


function addMenuButtons(){
   hideElement('startContainer');
   document.getElementById('menuButtonLine').classList.add('gameMenuButtonLine');
   hideElement('fullscreenButton');
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


function soundOn(){
    return document.getElementById('soundToggle').checked;
}


function musicOn(){
    return document.getElementById('musicToggle').checked;
}


function fullscreen(){
    let container = document.getElementById('container');
    container.requestFullscreen();
    document.getElementById('container').classList.add('fullscreen');
    document.getElementById('canvas').classList.add('canvasFullscreen');
    document.getElementById('fullscreenButton').setAttribute('onclick', `javascript: closeFullscreen()`);
}


function closeFullscreen(){
    document.exitFullscreen();
    document.getElementById('container').classList.remove('fullscreen');
    document.getElementById('fullscreenButton').setAttribute('onclick', `javascript: fullscreen()`);
}


