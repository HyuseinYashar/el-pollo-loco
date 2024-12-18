class Character extends MovableObjects {
  y = 100;
  height = 200;
  width = 120;
  world;
  speed = 10;
  lastMove = new Date().getTime();
  amountOfCoins = 0;
  amountOfBottles = 0;

  idleInt;
  statusInt;
  moveInt;

  walking_sound = new Audio("audio/walking.mp3");
  collecting_soud = new Audio("audio/collect.mp3");
  snooring_sound = new Audio("audio/snooring.mp3");

  walkingPause;
  snooringPause;

  offset = {
    top: 100,
    bottom: 10,
    left: 30,
    right: 30,
  };

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  /**
   * Initializes the Character object by loading images for various states and
   * setting up gravity and animations.
   *
   * Loads the initial idle image and preloads images for walking, jumping, hurt,
   * dead, idle, and long idle states. Applies gravity to the character and
   * starts idle animation, general animation, and movement.
   */
  constructor() {
    super().loadImg("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.applyGravity();
    this.idleAnimate();
    this.animateInt();
    this.move();
  }

  /**
   * Move the character to the left.
   * @memberof Character
   * @instance
   */
  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = true;
  }

  /**
   * Animates the character's various states.
   *
   * This function sets up an interval to check the character's state every 100
   * milliseconds. Based on the state, it will play the corresponding animation.
   *
   * If the character is dead, it will play the death animation.
   * If the character is hurt, it will play the hurt animation.
   * If the character is idle for more than 6 seconds, it will play the long idle animation.
   * Otherwise, it will play the idle animation.
   */
  idleAnimate() {
    setInterval(() => {
      let timepassed = new Date().getTime() - this.lastMove;
      timepassed = timepassed / 1000;
      if (timepassed > 6.0 && !this.isDead() && !this.isHurt()) {
        this.longIdle();
      } else if (this.isDead()) {
        this.pepeDied();
      } else {
        this.idle();
      }
    }, 100);
  }

  /**
   * Animates the character's various states.
   *
   * This function sets up an interval to check the character's state every 100
   * milliseconds. Based on the state, it will play the corresponding animation.
   *
   * If the character is hurt, it will play the hurt animation.
   * If the character is above the ground, it will play the jumping animation.
   * If the character is not hurt and is not above the ground and the left or right key is pressed,
   * it will play the walking animation and update the last move time.
   */
  animateInt() {
    setInterval(() => {
      if (this.isHurt(this)) {
        this.hurting();
      } else if (this.isAboveGround(this.y)) {
        this.jumping();
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.walking();
          this.lastMove = new Date().getTime();
        }
      }
    }, 100);
  }
  /**
   * Updates the character's movement based on the current keyboard state.
   *
   * This method is called every 33 milliseconds (30 times per second) and checks
   * the state of the keyboard. If a key is pressed, it calls the corresponding
   * method to update the character's position. The last move time is also updated
   * to ensure that the character's idle animation is triggered after a certain
   * amount of time.
   *
   * Additionally, the camera's x position is updated to follow the character.
   */
  move() {
    setInterval(() => {
      const { RIGHT, LEFT, SPACE } = this.world.keyboard;
      if (!this.isDead()) {
        if (RIGHT && this.x < this.world.level.level_end_x + 100)
          this.moveRight();
        if (LEFT && this.x > 0) this.moveLeft();
        if (SPACE && !this.isAboveGround(this.y)) this.jump();
        if (RIGHT || LEFT || SPACE) {
          this.lastMove = Date.now();
          this.walking_sound.volume = 0.01;
        }
      }
      this.world.camera_x = -this.x + 200;
    }, 1000 / 30);
  }

  /**
   * Animates the character's idle state.
   *
   * This function sets the character's animation to the idle animation.
   * It also attempts to pause the walking and snooring sounds, if they are playing.
   * If the sounds are not playing, it sets their volume to 0 and plays and pauses them,
   * which is a workaround to prevent errors when calling pause() on a sound that is not playing.
   */
  idle() {
    this.playAnimation(this.IMAGES_IDLE);
    if (this.walkingPause != undefined) {
      this.walking_sound.pause();
    }
    if (this.snooringPause != undefined) {
      this.snooring_sound.pause();
    }
  }

  /**
   * Animates the character's long idle state.
   *
   * This function sets the character's animation to the long idle animation.
   * It also plays the snooring sound and attempts to pause the walking sound, if it is playing.
   * If the walking sound is not playing, it sets its volume to 0 and plays and pauses it,
   * which is a workaround to prevent errors when calling pause() on a sound that is not playing.
   */
  longIdle() {
    this.playAnimation(this.IMAGES_LONG_IDLE);
    this.snooringPause = this.snooring_sound.play();
    this.snooring_sound.volume = 0.01;
    if (this.walkingPause != undefined) {
      this.walking_sound.pause();
    }
  }

  /**
   * Animates the character's hurt state.
   *
   * This function sets the character's animation to the hurt animation and
   * plays the hurt sound at a volume of 0.005.
   */
  hurting() {
    this.playAnimation(this.IMAGES_HURT);
    this.hurt_sound.volume = 0.005;
    this.hurt_sound.play();
  }

  /**
   * Handles the character's death sequence.
   *
   * This function initiates the character's hiding animation and pauses all
   * playing sounds. After a delay of 1500 milliseconds, it triggers the game
   * over sequence.
   */
  pepeDied() {
    this.hideAndSeek();
    this.pauseSounds();
    setTimeout(() => {
      gameOver();
    }, 1500);
  }

  /**
   * Makes the character hide after a certain amount of time.
   *
   * The character moves downwards and to the right, and after a certain
   * amount of time, it clears all of its intervals.
   *
   * @param {number} time - The amount of time to wait before hiding in milliseconds.
   */
  hideAndSeek() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_DEAD);
      this.y += 10;
      this.x += 5;
      if (this.y > 300) {
        setTimeout(() => {
          this.clearAllInt();
        }, 550);
      }
    }, 500);
  }
  /**
   * Pauses all sounds when the character dies.
   *
   * This method is called when the character's health reaches 0.
   * It plays the lose sound and pauses the walking and snooring sounds.
   * If either of the two sounds are not playing, it sets their volume to 0 and plays and pauses them,
   * which is a workaround to prevent errors when calling pause() on a sound that is not playing.
   */
  pauseSounds() {
    this.lose_sound.volume = 0.05;
    this.lose_sound.play();
    if (this.walkingPause != undefined) {
      this.walking_sound.pause();
    }
    if (this.snooringPause != undefined) {
      this.snooring_sound.pause();
    }
  }

  /**
   * Plays the jumping animation for the character.
   *
   * This method pauses the walking sound as well.
   */
  jumping() {
    this.playAnimation(this.IMAGES_JUMPING);
    if (this.walkingPause != undefined) this.walking_sound.pause();
  }

  /**
   * Plays the walking animation for the character.
   *
   * This method is typically called when the character is moving
   * left or right and the corresponding key is pressed.
   */
  walking() {
    this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * Sets the character's movement speed to 0, effectively pausing
   * its movement.
   */
  pauseMoving() {
    this.speed = 0;
  }

  /**
   * Increases the character's amount of coins by 10 and plays the coin collecting sound.
   *
   * If the total amount of coins exceeds 100 after collecting, it is capped at 100.
   */
  collectCoin() {
    this.amountOfCoins += 10;
    this.collecting_soud.volume = 0.01;
    this.collecting_soud.play();

    if (this.amountOfCoins > 100) {
      this.amountOfCoins = 100;
    }
  }

  /**
   * Increases the character's amount of bottles by 20 and plays the bottle collecting sound.
   *
   * If the total amount of bottles exceeds 100 after collecting, it is capped at 100.
   */
  collectBottle() {
    this.amountOfBottles += 20;
    this.collecting_soud.volume = 0.01;
    this.collecting_soud.play();

    if (this.amountOfBottles >= 100) {
      this.amountOfBottles = 100;
    }
  }

  reduceBottle(){
    this.amountOfBottles -= 20;
    this.lastMove = new Date().getTime();
    if (this.amountOfBottles < 0) {
      this.amountOfBottles = 0;
    }
  }
}
