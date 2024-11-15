class Chicken extends MovableObjects {
    x = 200 + Math.random() * 500;
    y = 350;
    height = 80
    width = 50;
    leftId;
    rightId;

    dead = false;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEATH = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

    constructor() {
        super().loadImg('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImg(this.IMAGES_DEATH);
        this.speed = 0.15 + Math.random() * 0.21;
        this.animate();
        this.move();
        this.showDead();
    }

    move() {
        setInterval(() =>{
            if(this.x < 200 ){
                // this.moveRight();
                this.otherDirection = true;
            } 
            if(!this.otherDirection){
                this.moveLeft();
            } else {
                this.moveRight();
                this.otherDirection = true;
            }
            if(this.x > 1400){
                this.otherDirection = false;
            }

        },1000 / 60)    
   
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 120);
    }
    showDead(){
        if(this.dead){

            setInterval(() => {
                this.loadImg(this.IMAGES_DEATH);
            }, 120);
        }
    }

    moveRight() {
        this.x += this.speed;    
    }

    moveLeft() {
        this.x -= this.speed;
    }
}