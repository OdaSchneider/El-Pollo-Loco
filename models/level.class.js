class Level{
    smallEnemies;
    enemies;
    clouds;
    coins;
    bottles;
    hearts;
    backgroundObjects;


    constructor(smallEnemies, enemies, clouds, backgroundObjects, coins, botttles, hearts){
        this.smallEnemies = smallEnemies;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = botttles;
        this.hearts = hearts;
    }
}