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

  walkLeft() {
    if (!this.isDead()) {
      this.moveleftInt = setInterval(() => {
        this.moveLeft();
      }, 200);
    }
  }

  animate() {
    this.animateInt = setInterval(() => {
      if (this.isDead()) {
        // clearInterval(this.moveleftInt);
        this.playdie();
      } else if (this.isHurt()) {
        this.speed = 0;
        this.playHurt();
      } else if(this.energy>=40 && this.energy<=80){
        this.playAttack();
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }

  playAttack(){
    this.speed  = 5
    this.playAnimation(this.IMAGES_ATTACK)
    setTimeout(() => {
      this.speed = 1  
    }, 3000);
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
    // this.boss_sound.play();
    this.playOnce(this.IMAGES_HURT);
    this.speed = 1;
  }

  playdie() {
    this.speed = 0;
    this.playOnce(this.IMAGES_DEAD);
    setTimeout(() => {
      this.y = -1000;
    }, 1500);
    this.win_sound.play();
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lasthit;
    return timepassed < 500;
  }
}
