class SmallChicken extends MovableObjects {
  x = 200 + Math.random() * 2000;
  y = 375;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  /**
   * Class constructor
   * @description Sets up the object with the appropriate images,
   * height, speed and starts the animation and movement.
   * @author Johannes Konert
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_WALKING);
    this.loadImg(this.IMAGES_DEAD);
    this.height = 50;
    this.speed = 0.15 + Math.random() * 0.21;
    this.animate();
    this.move();
    this.dead = false;
  }

  /**
   * Animation method for the chicken
   * @description This method is used to animate the chicken.
   * It will play the walking animation if the chicken is not dead,
   * otherwise it will load the dead image.
   * @author Johannes Konert
   */
  animate() {
    setInterval(() => {
      if (!this.isDead()) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.loadImg(this.IMAGES_DEAD);
      }
    }, 120);
  }
  isDead() {
    return this.dead;
  }
}
