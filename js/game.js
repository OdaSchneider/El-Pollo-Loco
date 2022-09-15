let canvas;
let world;
let keyboard;


function init(){
    canvas = document.getElementById('canvas');
}


/**
 * Load level1, creates classes keybord and world 
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
 * Hide buttons from startscreen or 
 * assigns a new style to them for use inside the game
 */
function addMenuButtons(){
   hideElement('startContainer');
   document.getElementById('menuButtonLine').classList.add('gameMenuButtonLine');
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


/**
 * @param {string} id - ID of an HTML-Element
 */
function showElement(element) {
    document.getElementById(`${element}`).classList.remove('d-none');
}


/**
 * Displays element with transition of opacity
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
 * @param {string} id - ID of an element
 */
function hideElement(element) {
    document.getElementById(`${element}`).classList.add('d-none');
}


/**
 * Hides element with transition of opacity
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
 * Checks if sound is turned on
 * 
 * @returns {boolean}
 */
function soundOn(){
    return document.getElementById('soundToggle').checked;
}


/**
 * Checks if music is turned on
 * 
 * @returns {boolean}
 */
function musicOn(){
    return document.getElementById('musicToggle').checked;
}


/**
 * Opens full screen mode and gives appropriate style to elements and
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


function closeFullscreen(){
    document.exitFullscreen();
    document.getElementById('container').classList.remove('fullscreen');
    document.getElementById('fullscreenButton').setAttribute('onclick', `javascript: fullscreen()`);
}


