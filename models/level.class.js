class Level{
    enemies;
    clouds;
    coins;
    backgroundObjects;
    levelEnd = 8600;


    constructor(enemies, clouds, backgroundObjects, coins){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
    }
}