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

  height = 500;
  width = 300;
  x = 1700;
  y = -30;
  energy = 100;
  speed = 1;

  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  constructor() {
    super();
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.walkLeft();
    this.animate();
  }
  playA(status) {
    this.playAnimation(status);
  }
  walkLeft() {
    this.speed = 1;
    if (!this.isDead()) {
      this.moveleftInt = setInterval(() => {
          console.log("moveleftInt");
        this.moveLeft();
      }, 200);

      this.playAniInt = setInterval(() => {
          console.log("playAniInt");
        if (this.isHurt()) {
          this.playA(this.IMAGES_ATTACK);
        } else {
          this.playA(this.IMAGES_WALKING);
        }
      }, 300);
    }
  }

  animate() {
    this.animateInt = setInterval(() => {
        console.log("animateInt");
      if (this.isDead()) {
        clearInterval(this.moveleftInt);
        clearInterval(this.playAniInt);
        clearInterval(this.animateInt);
        setTimeout(() => {
          this.playdie();
        }, 1000);
      } else if (this.isHurt()) {
        clearInterval(this.playAniInt);
        clearInterval(this.moveleftInt);
        setTimeout(() => {
            this.playHurt();
        }, 300);
      }
    }, 200);
  }

  hit() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    }
    this.lasthit = new Date().getTime();
  }

  isDead() {
    return this.energy == 0;
  }

  moveleftInt;

  playAniInt;

  animateInt;

  playHurt() {
    clearInterval(this.moveleftInt);
    clearInterval(this.playAniInt);
    // this.boss_sound.play();
    this.playOnce(this.IMAGES_HURT);
    this.speed = 0;
    setTimeout(() => {
      this.playA(this.IMAGES_ATTACK);
    }, 500);
  }

  playdie() {
    clearInterval(this.moveleftInt);
    clearInterval(this.playAniInt);
    clearInterval(this.animateInt);
    this.speed = 0;
    this.playOnce(this.IMAGES_DEAD);

    setTimeout(() => {
      this.y = -1000;
    }, 1500);
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lasthit;
    return timepassed < 500;
  }
}
