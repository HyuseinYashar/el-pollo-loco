class ThrowableObject extends MovableObjects {
  IMAGE_BOTTLE = "img/6_salsa_bottle/salsa_bottle.png";

  IMAGES_ROTATING = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGE_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  offset = {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  };

  animateRotation;
  damaging;
  bottle_drop = new Audio("audio/bottle_drop.mp3");

  /**
   * Create a new ThrowableObject.
   * @param {number} x the x position of the object
   * @param {number} y the y position of the object
   * @param {boolean} z if true, the object will be thrown to the left, otherwise to the right
   */
  constructor(x, y,z) {
    super();
    this.loadImg(this.IMAGE_BOTTLE);
    this.loadImages(this.IMAGES_ROTATING);
    this.loadImages(this.IMAGE_SPLASH);
    this.x = x;
    this.y = y;
    this.otherDirection = z;
    this.height = 80;
    this.width = 100;
    this.animate();
    this.trow();
    this.damaging = true;
  }

  /**
   * Start the bottle's rotation animation.
   * This method is called automatically during the object's construction.
   * The animation is done by calling the `playAnimation` method and passing the
   * `IMAGES_ROTATING` array to it. The animation is played every 30 milliseconds.
   * The `animateRotation` property is set to the interval ID returned by
   * `setInterval`.
   */
  animate() {
    this.animateRotation = setInterval(() => {
      this.playAnimation(this.IMAGES_ROTATING);
    },1000/25);
  }

  /**
   * Stop the bottle's animation.
   * This method is called when the bottle has fallen to the ground.
   * It sets the `damaging` property to false, the `speedY` property to 0,
   * the `speed` property to 0 and the `acceleration` property to 0.
   */
  stop() {
    this.damaging = false;
    this.speedY = 0;
    this.speed = 0;
    this.acceleration = 0;
  }

  /**
   * Check if the bottle has fallen to the ground.
   * @returns {boolean} true if the bottle is on the ground, false otherwise.
   */
  isOnTheGround() {
    return this.y > 336;
  }

  /**
   * Plays the bottle's splash animation.
   * This method is called when the bottle has fallen to the ground.
   * It plays the animation in the `IMAGE_SPLASH` array and plays the bottle drop sound.
   * It also clears the `animateRotation` and `throwAnimation` intervals.
   */
  splash() {
    this.playAnimation(this.IMAGE_SPLASH);
    this.bottle_drop.volume = 0.01;
    this.bottle_drop.play();
    clearInterval(this.animateRotation);
    clearInterval(this.throwAnimation);
  }
}
