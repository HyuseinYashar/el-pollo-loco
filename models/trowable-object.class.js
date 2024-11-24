class ThrowableObject extends MovableObjects {
    IMAGE_BOTTLE = 'img/6_salsa_bottle/salsa_bottle.png';
    IMAGES_ROTATING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };
    animateRotation;

    constructor(x, y) {
        super();
        this.loadImg(this.IMAGE_BOTTLE);
        this.loadImages(this.IMAGES_ROTATING);
        this.loadImages(this.IMAGE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 100;
        this.animate();
        this.trow();
    }

    animate(){
        this.pauseSounds();
        this.animateRotation = setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATING);
        })
    }

    animateSplash(){
        
    }

    stop() {
        this.speedY = 0;
        this.speed = 0;
        this.acceleration = 0;
        this.playAnimation(this.IMAGE_SPLASH);
      }


}