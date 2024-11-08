class Chicken extends MovableObjects {
    x = 200 + Math.random() * 500;
    y = 350;
    height = 80
    width = 50;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEATH = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

    constructor() {
        super().loadImg('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
        this.speed = 0.15 + Math.random()*0.24;
    }

    animate(){
        setInterval(() => {
            if(this.x)
            this.moveLeft();
        }, 1000/60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);
      }
}