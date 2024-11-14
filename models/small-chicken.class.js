class SmallChicken extends MovableObjects {
    x = 200 + Math.random() * 500;
    y = 375;
    dead = false;


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
        this.speed = 0.15 + Math.random() * 0.21;
        this.animate();
        this.move();
    }

    move() {
  
        setInterval(() => {
            if(this.x < 10 && !this.dead) {
                this.moveRight();
                this.otherDirection = true;
            } else if(this.x > 1400 && !this.dead){
                this.moveLeft();
            } else{
                this.moveLeft();
            }
        }, 1000 / 60);
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 120);
    }

    moveRight() {   
        setInterval(() => {
            this.x += this.speed;        
        }, 1000/60);     
   }

   moveLeft() {
        this.x -= this.speed;
   }
}