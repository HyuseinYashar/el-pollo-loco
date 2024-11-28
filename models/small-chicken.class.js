class SmallChicken extends MovableObjects {
    x = 200 + Math.random() * 500;
    y = 375;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png']

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }
    alive;
    energy = 20;
    constructor() {
        super();
        this.loadImages(this.IMAGES_WALKING);
        this.loadImg(this.IMAGES_DEAD);
        this.height = 50;
        this.speed = 0.15 + Math.random() * 0.21;
        this.animate();
        this.move();
    }

    move() {
        setInterval(() => {
            if (this.x < 200) {
                // this.moveRight();
                this.otherDirection = true;
            }
            if (!this.otherDirection) {
                this.moveLeft();
            } else {
                this.moveRight();
                this.otherDirection = true;
            }
            if (this.x > 1400) {
                this.otherDirection = false;
            }

        }, 1000 / 60)

    }

    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.loadImg(this.IMAGES_DEAD);
            }
        }, 120);
    }
    kill() {
        this.speed = 0;
        this.energy = 0;
    }

    isDead(){
        return this.energy == 0;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }


}