class Bottle extends MovableObjects {
  BOTTLE_IMAGE = "img/6_salsa_bottle/1_salsa_bottle_on_ground.png";
  IMAGE_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];
  height = 80;
  width = 100;

  offset = {
    top: 5,
    bottom: 5,
    left: 5,
    right: 5,
  };

  /**
   * Create a new bottle instance.
   * @param {number} x - The initial x position of the bottle.
   * @param {number} y - The initial y position of the bottle, which is ignored
   *                     and set to 0.
   */
  constructor(x, y) {
    super();
    this.x = x;
    this.y = 0;
    this.loadImg(this.BOTTLE_IMAGE);
    this.applyGravity();
  }
}
