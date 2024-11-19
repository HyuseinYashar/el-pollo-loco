class Character extends MovableObjects {
    y = 100;
    height = 200;
    width = 120;
    world;
    speed = 5;
    lastMove = new Date().getTime();
    amountOfCoins = 0;
    amountOfBottles = 0;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };




    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ]

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]

    constructor() {
        super().loadImg("img/2_character_pepe/1_idle/idle/I-1.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.move();
        this.animate();
    }

    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
        // this.walking_sound.play();
    }

    move() {
        setInterval(() => {
            let timepassed = new Date().getTime() - this.lastMove;
            timepassed = timepassed / 1000;
            if ((timepassed) > 8.0 && !this.isDead()) {
                this.longIdle();
            } else {
                this.idle();
            }
        }, 150)
    }
    idle() {
        this.playAnimation(this.IMAGES_IDLE);
    }

    longIdle() {
        this.playAnimation(this.IMAGES_LONG_IDLE);
    }
    animate() {
        setInterval(() => {

            this.pauseSounds();

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.lastMove = new Date().getTime();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.lastMove = new Date().getTime();

            }

            if (this.world.keyboard.UP && !this.isAboveGround(this.y)) {
                this.jump();
                this.lastMove = new Date().getTime();

            }
            this.world.camera_x = -this.x + 30;
        }, 1000 / 30);

        setInterval(() => {
            if (this.isHurt(this)) {
                this.hurting();
            } else if (this.isDead()) {
                this.dead();
            } else if (this.isAboveGround(this.y)) {
                this.jumping();
            } else {
                // this.playAnimation(this.IMAGES_IDLE);
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.walking();
                    this.lastMove = new Date().getTime();
                }
            }
        }, 150);

    }

    hurting() {
        let intervalId = setInterval(this.pauseMoving(), 10);
        clearInterval(intervalId);
        this.playAnimation(this.IMAGES_HURT);
        this.speed = 5;
    }

    dead() {
        this.playAnimation(this.IMAGES_DEAD);
    }

    jumping() {
        this.playAnimation(this.IMAGES_JUMPING);
    }

    walking() {
        this.playAnimation(this.IMAGES_WALKING);
    }

    pauseMoving() {
        this.speed = 0;
    }

    collectCoin() {
        this.amountOfCoins += 10;
        if (this.amountOfCoins > 100) {
            this.amountOfCoins = 100;
        }
    }

    collectBottle() {
        this.amountOfBottles += 10;
        if (this.amountOfBottles > 100) {
            this.amountOfBottles = 100;
        }
    }
}
