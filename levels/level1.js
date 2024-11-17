const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new Endboss()
    ],
    [
        new Cloud('img/5_background/layers/4_clouds/1.png'),
        new Cloud('img/5_background/layers/4_clouds/2.png'),
    ],
    [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/air.png', 2 * 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 2 * 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 2 * 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 2 * 719)

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
        new Bottle( 200, 350),
        new Bottle( 210, 360),
        new Bottle( 130, 355),
        new Bottle( 190, 350),
        new Bottle( 270, 370),
        new Bottle( 590, 350),
        new Bottle( 630, 365),
        new Bottle( 710, 365),
        new Bottle( 840, 360),
        new Bottle( 950, 370),

      ]
)