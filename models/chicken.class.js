class Chicken extends MovableObjects {
  x = 200 + Math.random() * 2000;
  y = 350;
  height = 80;
  width = 50;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  
  IMAGES_DEATH = "img/3_enemies_chicken/chicken_normal/2_dead/dead.png";

  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  constructor() {
    super().loadImg("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImg(this.IMAGES_DEATH);
    this.speed = 0.15 + Math.random() * 0.21;
    this.animate();
    this.move();
    this.dead = false;
  }

  animate() {
    setInterval(() => {
      if (!this.isDead()) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.loadImg(this.IMAGES_DEATH);
      }
    }, 120);
  }

  isDead() {
    return this.dead;
  }
}
