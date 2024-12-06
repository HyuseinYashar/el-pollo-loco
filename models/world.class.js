class World {
  character = new Character();
  statusbarHealth = new StatusbarHealth();
  statusbarBottle = new StatusbarBottle();
  statusbarCoin = new StatusbarCoin();
  endbossBar = new EndbossBar();
  throwableObjects = [];
  bottle = new ThrowableObject();

  enemies = level1.enemies;

  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  gameOver = false;

  /**
   * The constructor for the World class.
   * @param {HTMLCanvasElement} canvas The canvas element that the game is rendered on.
   * @param {Keyboard} keyboard The Keyboard object that contains the current state of the keyboard.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Starts the game loop.
   * 
   * The game loop checks for and handles various game events such as
   * character-enemy collisions, the player throwing bottles, the player
   * collecting coins and bottles, bottles falling to the ground, and
   * the end of the game.
   * 
   * The game loop runs every 200 milliseconds.
   */

run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.collectingCoins();
      this.collectingBottles();
      this.checkForFallenBottle();
      this.checkGame();
    }, 200);
  }

  /**
   * Checks if the game is over.
   * 
   * If the Endboss is dead and the character is not dead, the game is won.
   * If the character is dead, the game is lost.
   * 
   * The game over screen is displayed after a 2 second delay.
   */
checkGame() {
    let endboss = this.level.enemies.find((enemy) => enemy instanceof Endboss);
    if (endboss.isDead() && !this.character.isDead()) {
      setTimeout(() => {
        winScreen();
      }, 2000);
    }

    if (this.character.isDead()) {
      setTimeout(() => {
        loseScreen();
      }, 2000);
    }
  }

  /**
   * Checks if the bottle that is currently being thrown has fallen to the ground.
   * 
   * If the bottle is on the ground, the bottle's animation is stopped and the bottle's splash animation is played.
   * The bottle is reset to its initial state after a 700 millisecond delay.
   */
checkForFallenBottle() {
    if (this.bottle.isOnTheGround()) {
      this.stopAndSplash();
    }
  }

  /**
   * Stops the bottle's rotation and throw animations, and plays its splash animation.
   * 
   * After a 700 millisecond delay, the bottle is reset to its initial state.
   */
  stopAndSplash() {
    clearInterval(this.animateRotation);
    clearInterval(this.throwAnimation);
    this.bottle.stop();
    this.bottle.splash();
    setTimeout(() => {
      this.bottle = new ThrowableObject();
    }, 700);
  }

  /**
   * Checks if the player is pressing the D key and if the character has more than 0 bottles.
   * 
   * If the conditions are met, a new ThrowableObject is created at the character's position
   * with the character's direction as its otherDirection.
   * 
   * The player's bottle count is decreased by 10 and the status bar is updated.
   * If the player's bottle count is negative, it is reset to 0.
   */
  checkThrowObjects() {
    if (this.keyboard.D && this.character.amountOfBottles > 0) {
      this.bottle = new ThrowableObject(
        this.character.x + 50,
        this.character.y + 50,
        this.character.otherDirection
      );

      this.character.amountOfBottles -= 10;
      if (this.character.amountOfBottles < 0) {
        this.character.amountOfBottles = 0;
      }
      this.statusbarBottle.setPercentage(this.character.amountOfBottles);
    }
  }

  /**
   * Sets the character's world to the current World instance.
   * This is necessary so that the character can access the world's properties and methods.
   */
  /**
   * Sets the character's world to the current World instance.
   * This is necessary so that the character can access the world's properties and methods.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * The main draw method of the game.
   * 
   * This method is called repeatedly via requestAnimationFrame.
   * 
   * It clears the canvas, translates the canvas to the camera's x position,
   * and then draws all objects currently in the game.
   * 
   * Finally, it sets up the next animation frame.
   */
  draw() {
    if (this.gameOver) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addToMap(this.character);
    this.addObjectsToMap(this.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addToMap(this.bottle);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusbarHealth);
    this.addToMap(this.statusbarBottle);
    this.addToMap(this.statusbarCoin);
    this.addToMap(this.endbossBar);
    this.ctx.translate(this.camera_x, 0);

    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(() => {
      self.draw();
    });
  }

  /**
   * Iterates over an array of objects and calls the addToMap method for each one.
   * 
   * @param {Object[]} objcs - An array of objects to be drawn.
   */
  addObjectsToMap(objcs) {
    objcs.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Draws a MovableObject onto the canvas.
   * 
   * If the object's otherDirection property is set to true, it will be flipped horizontally before drawing.
   * 
   * @param {MovableObject} mo - The object to be drawn.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImg(mo);
    }
    mo.draw(this.ctx);

    if (mo.otherDirection) {
      this.flipImgBack(mo);
    }
  }

  /**
   * Saves the current canvas context and flips an image horizontally.
   * 
   * @param {MovableObject} mo - The object whose image is to be flipped.
   */
  flipImg(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the canvas context and flips an image back horizontally.
   * 
   * @param {MovableObject} mo - The object whose image was flipped.
   */
  flipImgBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Checks for collisions between the character, enemies, and throwable objects.
   * 
   * Iterates through all enemies in the current level and performs the following checks:
   * - If the character got hit by the enemy.
   * - If the character can hit and potentially kill the enemy.
   * - If a throwable object collides with the enemy and causes damage.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      this.characterGotHit(enemy);
      this.checkCharacterEnemyCollisions(enemy);
      this.bottleEnemyCollision(enemy);
    });
  }

  /**
   * Iterates through all coins in the current level and checks if the character collided with it.
   * 
   * If the character collided with a coin and the character's amount of coins doesn't exceed 100,
   * the coin is removed from the level and the character's amount of coins is increased.
   * The StatusbarCoin object is then updated with the new percentage.
   */
  collectingCoins() {
    this.level.coins.forEach((coin, i) => {
      if (this.character.isColliding(coin)) {
        if (this.character.amountOfCoins <= 100) {
          this.character.collectCoin();
          this.level.coins.splice(i, 1);
          this.statusbarCoin.setPercentage(this.character.amountOfCoins);
        }
      }
    });
  }

  /**
   * Iterates through all bottles in the current level and checks if the character collided with it.
   * 
   * If the character collided with a bottle and the character's amount of bottles doesn't exceed 100,
   * the bottle is removed from the level and the character's amount of bottles is increased.
   * The StatusbarBottle object is then updated with the new percentage.
   */
  collectingBottles() {
    this.level.bottles.forEach((bottle, i) => {
      if (this.character.isColliding(bottle)) {
        if (this.character.amountOfBottles <= 100) {
          this.character.collectBottle();
          this.level.bottles.splice(i, 1);
          this.statusbarBottle.setPercentage(this.character.amountOfBottles);
        }
      }
    });
  }

  /**
   * Checks if the character got hit by an enemy.
   * 
   * If the character is colliding with the enemy and the enemy is not dead and the character is not above ground,
   * the character's hit method is called with the enemy as parameter, the hurt sound is played if sounds are on,
   * the character's movement is paused, and the status bar's health is updated with the character's energy.
   * 
   * @param {MovableObject} enemy - The enemy that the character is colliding with.
   */
  characterGotHit(enemy) {
    if (this.character.isColliding(enemy)) {
      if (!enemy.isDead() && !this.character.isAboveGround()) {
        this.character.hit(enemy);
        if (this.soundsOn) {
          this.character.hurt_sound.play();
        }
        this.character.pauseMoving();
        this.statusbarHealth.setPercentage(this.character.energy);
      }
    }
  }

  /**
   * Checks if the character can hit and potentially kill the enemy.
   * 
   * If the character is above ground and the character is colliding with the enemy, the character's hit method
   * is called and the hurt sound is played, or the enemy's kill method is called, the frag sound is played if
   * sounds are on, and the enemy is removed from the level after 200 milliseconds.
   * 
   * @param {MovableObject} enemy - The enemy that the character is colliding with.
   */
  checkCharacterEnemyCollisions(enemy) {
    if (this.characterJumpToKill(enemy)) {
      if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
        enemy.kill();
        if (this.soundsOn) {
          this.character.frag_sound.play();
        }
        const indexOfEnemy = this.level.enemies.indexOf(enemy);
        setTimeout(() => {
          if (!(enemy instanceof Endboss)) {
            this.level.enemies.splice(indexOfEnemy, 1);
          }
        }, 200);
      } else {
        this.character.hit();
        if (this.soundsOn) {
          this.character.hurt_sound.play();
        }
      }
    }
  }

  /**
   * Checks if the character can hit and potentially kill the enemy from above.
   * 
   * @param {MovableObject} enemy - The enemy that the character is colliding with.
   * @returns {Boolean} True if the character is above ground and colliding with the enemy, false otherwise.
   */
  characterJumpToKill(enemy) {
    return this.character.isColliding(enemy) && this.character.isAboveGround();
  }

  /**
   * Handles the collision between a throwable bottle and an enemy.
   * 
   * Checks if the bottle collides with the enemy. If the enemy is a Chicken or SmallChicken 
   * and the bottle is damaging, the enemy is killed and removed from the level after a delay.
   * If the enemy is an Endboss, the Endboss's health is updated and it is damaged if the bottle 
   * is damaging. Plays the bottle drop sound if sounds are enabled.
   * 
   * @param {MovableObject} enemy - The enemy that the bottle is colliding with.
   */
  bottleEnemyCollision(enemy) {
    if (this.bottle.isColliding(enemy)) {
      if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
        if (this.bottle.damaging) {
          enemy.kill();
        }
        // this.stopAndSplash();
        const indexOfEnemy = this.level.enemies.indexOf(enemy);
        setTimeout(() => {
          this.level.enemies.splice(indexOfEnemy, 1);
        }, 700);
      } else if (enemy instanceof Endboss) {
        this.endbossBar.setPercentage(enemy.energy);
        if (this.bottle.damaging) {
          enemy.hit();
        }
        // this.stopAndSplash();
      }
      this.stopAndSplash();
      if (this.soundsOn) {
        this.bottle.bottle_drop.play();
      }
    }
  }
}
