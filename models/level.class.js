class Level{
    enemies;
    clouds;
    backgroundObjects;
    levelEnd = 8600;


    constructor(enemies, clouds, backgroundObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}