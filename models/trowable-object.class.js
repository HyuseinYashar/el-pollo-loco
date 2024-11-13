class ThrowableObject extends MovableObjects {
    IMAGE_BOTTLE = 'img/6_salsa_bottle/salsa_bottle.png';
    IMAGES_ROTATING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x, y) {
        super();
        this.loadImg(this.IMAGE_BOTTLE);
        this.loadImages(this.IMAGES_ROTATING);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 30;
        this.trow();
    }

    trow() {
        this.speedY = 15;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}