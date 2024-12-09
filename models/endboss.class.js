class Endboss extends MovableObjects {
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  height = 340;
  width = 250;
  x = 2000;
  y = 120;
  energy = 100;
  speed = 1;

  offset = {
    top: 60,
    bottom: 20,
    left: 0,
    right: 0,
  };
  /**
   * Initializes the Endboss object by loading images for various states and
   * starting its animations and movement.
   * 
   * Loads the initial walking image and preloads images for walking, alert,
   * attack, hurt, and dead states. Begins the Endboss walking left and
   * animating.
   */
  constructor() {
    super();
    this.loadImg(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.walkLeft(); //walking left
    this.animate(); // animating the object
  }

/**
 * Initiates the movement of the Endboss to the left.
 *
 * If the Endboss is not dead, this function sets up an interval
 * to repeatedly call the moveLeft function every 200 milliseconds.
 * This interval is stored in the moveleftInt property for potential
 * later use (e.g., clearing the interval).
 */
  walkLeft() {
    if (!this.isDead()) {
      this.moveleftInt = setInterval(() => {
        this.moveLeft();
      }, 200);
    }
  }

  /**
   * Animates the Endboss' various states.
   *
   * This function sets up an interval to check the Endboss' state every 200
   * milliseconds. Based on the state, it will play the corresponding animation.
   *
   * If the Endboss is dead, it will play the death animation.
   * If the Endboss is hurt, it will play the hurt animation.
   * If the Endboss' energy is between 40 and 80, it will play the attack animation.
   * Otherwise, it will play the walking animation.
   *
   * This interval is stored in the animateInt property for potential later use
   * (e.g., clearing the interval).
   */
  animate() {
    this.animateInt = setInterval(() => {
      if (this.isDead()) {
        this.playdie();
      } else if (this.isHurt()) {
        this.speed = 0;
        this.playHurt();
      } else if(this.energy>=20 && this.energy<=80){
        this.playAttack();
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }

/**
 * Plays the attack animation and increases the speed of the Endboss.
 *
 * This method sets the Endboss's speed to 7 and plays the attack animation
 * along with the alert sound. After 3 seconds, the speed is reset to 1.
 */
  playAttack(){
    this.speed  = 7
    this.playAnimation(this.IMAGES_ATTACK)
    this.boss_alert.volume = 0.01;
    this.boss_alert.play()

    setTimeout(() => {
      this.speed = 1  
    }, 3000);
  }

  /**
   * Reduces the Endboss's energy by 20 and sets the last hit time to the current time.
   *
   * If the Endboss's energy is less than 0, it is set to 0.
   */
  hit() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    }
    this.lasthit = new Date().getTime();
  }

  /**
   * Checks if the Endboss is dead.
   *
   * The Endboss is considered dead if its energy is 0.
   *
   * @returns {Boolean} True if the Endboss is dead, false otherwise.
   */
  isDead() {
    return this.energy == 0;
  }

  moveleftInt;

  playAniInt;

  animateInt;

  /**
   * Plays the Endboss's hurt animation and sets its speed to 1.
   *
   * The hurt animation is played once, and the Endboss's speed is set to 1 to slow it down.
   */
  playHurt() {
    this.playOnce(this.IMAGES_HURT);
    this.speed = 1;
  }

  /**
   * Plays the Endboss's die animation, stops it from moving and plays the win sound.
   *
   * The Endboss's die animation is played once, and its speed is set to 0 to stop it from moving.
   * The win sound is played, and the Endboss is moved off the screen after a 1500 millisecond delay.
   */
  playdie() {
    this.speed = 0;
    this.playOnce(this.IMAGES_DEAD);
    this.win_sound.volume = 0.05;
    this.win_sound.play();

    setTimeout(() => {
      this.y = -1000;
    }, 1500);
  }

  /**
   * Checks if the Endboss is hurt.
   *
   * The Endboss is hurt if the time since it was last hit is less than 500 milliseconds.
   * @returns {Boolean} True if the Endboss is hurt, false otherwise.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lasthit;
    return timepassed < 500;
  }
}
