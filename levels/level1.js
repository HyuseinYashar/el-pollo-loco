let level1;
initLevel();



/**
 * Initializes the level by creating a new Level object with enemies, clouds, background objects, coins, and bottles.
 *
 * The Level object is created with the following parameters:
 * - enemies: An array of 16 enemies, including 12 chickens, 3 small chickens, and 1 end boss.
 * - clouds: An array of 2 clouds.
 * - backgroundObjects: An array of 12 background objects, including 4 layers of background objects.
 * - coins: An array of 10 coins positioned at various locations on the screen.
 * - bottles: An array of 10 bottles positioned at various locations on the screen.
 *
 * The level is initialized by calling this function once at the beginning of the game.
 */
function initLevel() {
   level1 = new Level(
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new SmallChicken(),
      new SmallChicken(),
      new Chicken(),
      new Chicken(),
      new SmallChicken(),
      new SmallChicken(),
      new Chicken(),
      new Chicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new Endboss(),
    ],
    [
      new Cloud("img/5_background/layers/4_clouds/1.png"),
      new Cloud("img/5_background/layers/4_clouds/2.png"),
    ],
    [
      new BackgroundObject("img/5_background/layers/air.png", -719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        -719
      ),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),
      new BackgroundObject("img/5_background/layers/air.png", 0),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/air.png", 719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/air.png", 2 * 719),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        2 * 719
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        2 * 719
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        2 * 719
      ),
      new BackgroundObject("img/5_background/layers/air.png", 3 * 719),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        3 * 719
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        3 * 719
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        3 * 719
      ),
    ],
    [
      new Coin(400, 280),
      new Coin(500, 230),
      new Coin(600, 280),
      new Coin(900, 180),
      new Coin(1000, 130),
      new Coin(1100, 180),
      new Coin(1500, 310),
      new Coin(1600, 260),
      new Coin(1700, 220),
      new Coin(1800, 180),
    ],
    [
      new Bottle(300, 350),
      new Bottle(350, 360),
      new Bottle(500, 355),
      new Bottle(767, 350),
      new Bottle(800, 370),
      new Bottle(940, 350),
      new Bottle(1130, 365),
      new Bottle(1200, 365),
      new Bottle(2000, 360),
      new Bottle(1900, 370),
    ]
  );
}
