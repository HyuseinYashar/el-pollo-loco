class ThrowableObject extends MovableObjects {
    IMAGE_BOTTLE = 'img/6_salsa_bottle/salsa_bottle.png';
    IMAGES_ROTATING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];


    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };
    
    constructor(x, y) {
        super();
        this.loadImg(this.IMAGE_BOTTLE);
        this.loadImages(this.IMAGES_ROTATING);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 100;
        this.animate();
        this.trow();
    }

    animate(){
        this.pauseSounds();
        setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATING);
        })
    }


}