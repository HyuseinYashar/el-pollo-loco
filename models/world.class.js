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

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

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

  checkGame() {
    const endboss = this.level.enemies.find(
      (enemy) => enemy instanceof Endboss
    );
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
  checkForFallenBottle() {
    if (this.bottle.isOnTheGround()) {
      this.stopAndSplash();
    }
  }

  stopAndSplash() {
    clearInterval(this.animateRotation);
    clearInterval(this.throwAnimation);
    this.bottle.stop();
    this.bottle.splash();
    setTimeout(() => {
      this.bottle = new ThrowableObject();
    }, 700);
  }

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

  setWorld() {
    this.character.world = this;
  }

  draw() {
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

  addObjectsToMap(objcs) {
    objcs.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImg(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImgBack(mo);
    }
  }

  flipImg(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImgBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      this.characterGotHit(enemy);
      this.checkCharacterEnemyCollisions(enemy);
      this.bottleEnemyCollision(enemy);
    });
  }

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

  collectingBottles() {
    this.level.bottles.forEach((bottle, i) => {
      if (this.character.isColliding(bottle)) {
        if (this.character.amountOfBottles <= 50) {
          this.character.collectBottle();
          this.level.bottles.splice(i, 1);
          this.statusbarBottle.setPercentage(this.character.amountOfBottles);
        }
      }
    });
  }

  characterGotHit(enemy) {
    if (this.character.isColliding(enemy)) {
      if (!enemy.isDead() && !this.character.isAboveGround()) {
        this.character.hit(enemy);
        this.character.pauseMoving();
        this.statusbarHealth.setPercentage(this.character.energy);
      }
    }
  }

  checkCharacterEnemyCollisions(enemy) {
    if (this.characterJumpToKill(enemy)) {
      if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
        enemy.kill();
        const indexOfEnemy = this.level.enemies.indexOf(enemy);
        setTimeout(() => {
          if (!(enemy instanceof Endboss)) {
            this.level.enemies.splice(indexOfEnemy, 0);
          }
        }, 500);
      } else {
        this.character.hit();
      }
    }
  }

  characterJumpToKill(enemy) {
    return this.character.isColliding(enemy) && this.character.isAboveGround();
  }

  bottleEnemyCollision(enemy) {
    if (this.bottle.isColliding(enemy)) {
      if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
        if (this.bottle.damaging) {
          enemy.kill();
        }
        this.stopAndSplash();
        const indexOfEnemy = this.level.enemies.indexOf(enemy);
        setTimeout(() => {
          this.level.enemies.splice(indexOfEnemy, 1);
        }, 700);
      } else if (enemy instanceof Endboss) {
        this.endbossBar.setPercentage(enemy.energy);
        if (this.bottle.damaging) {
          enemy.hit();
        }
        this.stopAndSplash();
      }
    }
  }
}
