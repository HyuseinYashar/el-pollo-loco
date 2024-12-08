class Coin extends MovableObjects{
    height = 100;
    width = 100;
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };


/**
 * Initializes a Coin object with the specified position.
 * 
 * @param {number} x - The x-coordinate of the coin's position.
 * @param {number} y - The y-coordinate of the coin's position.
 * 
 * This constructor sets the initial image for the coin, its position,
 * loads the coin's animation images, and starts the animation.
 */
    constructor(x,y){
        super().loadImg("img/8_coin/coin_1.png");
        this.x = x;
        this.y = y;
        this.loadImages(this.IMAGES_COIN);
        this.animate();
    }

    

    /**
     * Starts the coin's animation.
     * 
     * This method is called automatically by the constructor.
     * The animation is done by calling the `playAnimation` method and passing the
     * `IMAGES_COIN` array to it. The animation is played every 400 milliseconds.
     * The interval ID returned by `setInterval` is not stored anywhere.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 400);
    }
}