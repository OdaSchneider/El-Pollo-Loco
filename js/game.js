let canvas;
let world;
let keyboard;

/**
 * definies canvas element
 */
function init(){
    canvas = document.getElementById('canvas');
}


/**
 * load level1, creates classes keybord and world 
 * and start the game by hiding startscreen and loading class world
 */
function startGame(){
    initLevel();
    keyboard = new Keyboard();
    world = new World(canvas, keyboard);
    setTimeout(()=>{
        addMenuButtons();
        document.getElementById('hud').classList.add('d-flex');
    }, 1000);
}


/**
 * hide buttons from startscreen or 
 * assigns a new style to them for use inside the game
 */
function addMenuButtons(){
   hideElement('startContainer');
   document.getElementById('menuButtonLine').classList.add('gameMenuButtonLine');
}


/**
 * shows menu settings
 */
function settings(){
    hideElementAnimated('controlMenu');
    showElementAnimated('settingsMenu');
}


/**
 * shows menu control
 */
function control(){
    hideElementAnimated('settingsMenu');
    showElementAnimated('controlMenu');
}


/**
 * close menu
 */
function closeMenu(){
    hideElementAnimated('settingsMenu');
    hideElementAnimated('controlMenu');
}


/**
 * prevents menu close onclick
 */
function doNotClose(event){
    event.stopPropagation();
}


/**
 * displays element
 * 
 * @param {string} id - ID of an element
 */
function showElement(element) {
    document.getElementById(`${element}`).classList.remove('d-none');
}


/**
 * displays element with transition of opacity
 * 
 * @param {string} id - ID of an element
 */
function showElementAnimated(element) {
    document.getElementById(`${element}`).classList.remove('vis-hidden');
    setTimeout(()=>{
        document.getElementById(`${element}`).classList.remove('d-none');
    }, 400)
}


/**
 * hides element
 * 
 * @param {string} id - ID of an element
 */
function hideElement(element) {
    document.getElementById(`${element}`).classList.add('d-none');
}


/**
 * hides element with transition of opacity
 * 
 * @param {string} id - ID of an element
 */
function hideElementAnimated(element) {
    document.getElementById(`${element}`).classList.add('vis-hidden');
    setTimeout(()=>{
        document.getElementById(`${element}`).classList.add('d-none');
    }, 400)
}


/**
 * checks if sound is turned on
 * 
 * @returns {boolean}
 */
function soundOn(){
    return document.getElementById('soundToggle').checked;
}


/**
 * checks if music is turned on
 * 
 * @returns {boolean}
 */
function musicOn(){
    return document.getElementById('musicToggle').checked;
}


/**
 * opens full screen mode and gives appropriate style to elements and
 * toggles button function from open to close fullscreen
 */
function fullscreen(){
    let container = document.getElementById('container');
    container.requestFullscreen();
    document.getElementById('container').classList.add('fullscreen');
    document.getElementById('canvas').classList.add('canvasFullscreen');
    document.getElementById('fullscreenButton').setAttribute('onclick', `javascript: closeFullscreen()`);
    closeMenu();
}


/**
 * closes fullscreen
 */
function closeFullscreen(){
    document.exitFullscreen();
    document.getElementById('container').classList.remove('fullscreen');
    document.getElementById('fullscreenButton').setAttribute('onclick', `javascript: fullscreen()`);
}


