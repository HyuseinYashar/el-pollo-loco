class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 2450;

    /**
     * 
     * @param {Array<Enemy>} enemies - An array of enemy objects 
     * @param {Array<Cloud>} clouds - An array of cloud objects 
     * @param {Array<BackgroundObject>} backgroundObjects - An array of backgroundObject objects 
     * @param {Array<Coin>} coins - An array of coin objects 
     * @param {Array<Bottle>} bottles - An array of bottle objects 
     */
    constructor(enemies, clouds, backgroundObjects,coins,bottles){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}