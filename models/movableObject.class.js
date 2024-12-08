class MovableObjects extends DrawableObject {
  speed;
  otherDirection = false;
  speedY = 0;
  acceleration = 1;
  energy = 100;
  lasthit = 0;
  throwAnimation;
  dead;

  boss_alert = new Audio("audio/boss_alert.mp3");
  win_sound = new Audio("audio/win_sound.mp3");
  lose_sound = new Audio("audio/lose_sound.mp3");
  hurt_sound = new Audio("audio/hurt_sound.mp3");
  frag_sound = new Audio("audio/frag.mp3");

  clearAllInt() {
    for (let index = 0; index < 999; index++) {
      clearInterval(index);
    }
  }

  /**
   * Makes the object move back and forth horizontally.
   * The object will reverse direction whenever it hits the left or right border of the screen.
   * @memberof MovableObjects
   * @instance
   */
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

  /**
   * Move the object to the right.
   * If the object is a character, set `otherDirection` to false.
   * @memberof MovableObjects
   * @instance
   */
  moveRight() {
    this.x += this.speed;
    if (this instanceof Character) {
      this.otherDirection = false;
    }
  }

  /**
   * Move the object to the left.
   * @memberof MovableObjects
   * @instance
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Applies gravity to the object.
   * Every 30 milliseconds, the object's y-position is decreased by its speedY and its speedY is decreased by its acceleration.
   * If the object is above the ground or its speedY is greater than 0, gravity is applied.
   * @memberof MovableObjects
   * @instance
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 30);
  }

  /**
   * Check if the object is above the ground.
   * This method is overridden by children classes.
   * For the Character class, the object is above the ground if its y-position is less than 230.
   * For the Bottle class, the object is above the ground if its y-position is less than 340.
   * For the ThrowableObject class, the object is always above the ground.
   * @returns {Boolean} True if the object is above the ground, false otherwise.
   * @memberof MovableObjects
   * @instance
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      if (this instanceof Character) return this.y < 230;
      if (this instanceof Bottle) return this.y < 340;
    }
  }

  /**
   * Checks if this object is positioned above the given enemy.
   * 
   * Compares the y-coordinate of this object with the y-coordinate of the enemy
   * to determine if this object is above the enemy.
   *
   * @param {MovableObject} enemy - The enemy to compare against.
   * @returns {boolean} True if this object is above the enemy, false otherwise.
   */
  isAboveEnemy(enemy){    
    return this.y < enemy.y;
  }

  /**
   * Applies an upward force to the object, making it jump.
   * Only applicable to objects that are not in the air.
   * @memberof MovableObjects
   * @instance
   */
  jump() {
    this.speedY = 15;
  }

  /**
   * Play an animation once.
   * @param {Array<string>} images Paths to the images of the animation.
   * @memberof MovableObjects
   * @instance
   */
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

  /**
   * Checks if this object is colliding with another MovableObject.
   *
   * This method compares the boundaries of the current object with the provided object
   * to determine if they overlap, indicating a collision.
   *
   * @param {MovableObject} mo - The object to check for a collision.
   * @returns {boolean} True if the objects are colliding, false otherwise.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left && // Rechte Kante der Flasche nach rechts
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right && // Linke Kante der Flasche nach links
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && // Untere Kante der Flasche nach unten
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom // Obere Kante der Flasche nach oben
    );
  }

  /**
   * Handles the character taking damage from an enemy.
   * 
   * Depending on the type of enemy, the character's energy is reduced by a certain amount.
   * If the character's energy reaches 0, the character is killed.
   * The timestamp of the last hit is updated.
   * 
   * @param {MovableObject} enemy - The enemy that the character is colliding with.
   */
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
