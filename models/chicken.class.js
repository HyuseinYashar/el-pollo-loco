class Chicken extends MovableObjects {
    x = 200 + Math.random() * 500;
    y = 370;
    height = 80
    width = 50;

    constructor() {
        super().loadImg('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

    }
}