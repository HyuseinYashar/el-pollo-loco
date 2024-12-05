class MovableObjects extends DrawableObject {
  speed;
  otherDirection = false;
  speedY = 0;
  acceleration = 1;
  energy = 100;
  lasthit = 0;
  throwAnimation;
  dead;
  walking_sound = new Audio("audio/walking.mp3");
  jumping_sound = new Audio("audio/jumping.mp3");
  bottle_drop = new Audio("audio/bottle_drop.mp3");

  boss_alert = new Audio("audio/boss_alert.mp3");
  collecting_soud = new Audio("audio/collect.mp3");
  win_sound = new Audio("audio/win_sound.mp3");
  lose_sound = new Audio("audio/lose_sound.mp3");
  hurt_sound = new Audio("audio/hurt_sound.mp3");
  snooring_sound = new Audio("audio/snooring.mp3");

  soundsOn = false;

  clearAllInt() {
    for (let index = 0; index < 999; index++) {
      clearInterval(index);
    }
  }

  move() {
    setInterval(() => {
      if (this.x < 200) {
        this.otherDirection = true;
      }
      if (!this.otherDirection) {
        this.moveLeft();
      } else {
        this.moveRight();
        this.otherDirection = true;
      }
      if (this.x > 1400) {
        this.otherDirection = false;
      }
    }, 1000 / 60);
  }

  moveRight() {
    this.walking_sound.pause();

    this.x += this.speed;
    if (this instanceof Character) {
      this.otherDirection = false;
    }
    if (this.soundsOn && this instanceof Character) {
      this.walking_sound.play();
    }
  }

  moveLeft() {
    this.walking_sound.pause();

    this.x -= this.speed;
    if (this.soundsOn && this instanceof Character) {
      this.walking_sound.play();
    }
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 30);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      if (this instanceof Character) return this.y < 230;
      if (this instanceof Bottle) return this.y < 340;
    }
  }

  jump() {
    if (this.soundsOn) {
      this.jumping_sound.play();
    }
    this.speedY = 15;
  }

  playOnce(images) {
    this.currentImage = 0;
    const totalDuration = 100 * images.length;
    const animationInterval = setInterval(() => {
      if (this.currentImage < images.length) {
        let path = images[this.currentImage];
        this.img = this.imageCache[path];
        this.currentImage++;
      } else {
        clearInterval(animationInterval);
      }
    }, totalDuration);
  }

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left && // Rechte Kante der Flasche nach rechts
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right && // Linke Kante der Flasche nach links
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && // Untere Kante der Flasche nach unten
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom // Obere Kante der Flasche nach oben
    );
  }

  hit(enemy) {
    if (enemy instanceof Chicken) {
      this.energy -= 10;
    }
    if (enemy instanceof SmallChicken) {
      this.energy -= 5;
    }
    if (enemy instanceof Endboss) {
      this.energy -= 15;
    }
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lasthit = new Date().getTime();
    }
  }
  kill() {
    this.speed = 0;
    this.dead = true;
  }

  isDead() {
    return this.energy == 0;
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lasthit;
    timepassed = timepassed / 1000;
    return timepassed < 0.3;
  }

  trow() {
    this.speedY = 8;
    this.applyGravity();
    this.throwAnimation = setInterval(() => {
      if (this.otherDirection) {
        this.x -= 10;
      } else {
        this.x += 10;
      }
    }, 30);
  }
}
