class SmallChicken extends MovableObjects {
    x = 200 + Math.random() * 500;
    y = 375;


    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';

    constructor(){
        super();
        this.loadImages(this.IMAGES_WALKING);
        this.loadImg(this.IMAGE_DEAD);
        this.height = 50;
        this.animate();
        this.speed = 0.15 + Math.random() * 0.21;
    }

    animate() {
        setInterval(() => {
           this.moveLeft();
            // if(this.x < 1) {
            //     this.moveRight();
            //     this.otherDirection = true;
            // }
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 120);
    }
}