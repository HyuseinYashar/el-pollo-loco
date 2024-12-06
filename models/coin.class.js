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


    constructor(x,y){
        super().loadImg("img/8_coin/coin_1.png");
        this.x = x;
        this.y = y;
        this.loadImages(this.IMAGES_COIN);
        this.animate();
    }

    

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 400);
    }
}