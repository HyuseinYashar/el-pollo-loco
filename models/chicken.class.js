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
    top: 5,
    bottom: 10,
    left: 5,
    right: 5,
  };

  /**
   * Initializes the Chicken object by loading images for various states and
   * starting its animations and movement.
   * 
   * Loads the initial walking image and preloads images for walking and dead
   * states. Begins the Chicken walking left and animating.
   */
  constructor() {
    super().loadImg("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImg(this.IMAGES_DEATH);
    this.speed = 0.15 + Math.random() * 0.21;
    this.animate();
    this.move();
    this.dead = false;
  }

/**
 * Animates the chicken's movements.
 * 
 * This method sets up a continuous interval that checks the chicken's state
 * every 120 milliseconds. If the chicken is not dead, it plays the walking animation.
 * If the chicken is dead, it loads the dead image.
 */
  animate() {
    setInterval(() => {
      if (!this.isDead()) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.loadImg(this.IMAGES_DEATH);
      }
    }, 120);
  }

  /**
   * Kill the chicken.
   * 
   * This method will stop the chicken's movement and set the chicken's
   * dead flag to true.
   * 
   * @author Johannes Konert
   */
  kill() {
    this.speed = 0;
    this.dead = true;
  }

  /**
   * Checks if the chicken is dead.
   *
   * Returns true if the chicken is dead and false otherwise.
   *
   * @returns {Boolean} True if the chicken is dead, false otherwise.
   *
   * @author Johannes Konert
   */
  isDead() {
    return this.dead;
  }
}
