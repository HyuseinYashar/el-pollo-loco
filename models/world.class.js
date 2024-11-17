class World {

    character = new Character();
    statusbarHealth = new StatusbarHealth();
    statusbarBottle = new StatusbarBottle();
    statusbarCoin = new StatusbarCoin();
    throwableObjects = [];
    bottle = new Bottle();

    level = level1;

    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
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
            this.checkAttack();
            this.collectingCoins();
            this.collectingBottles();
            this.checkCharacterEnemyCollisions();
        }, 200);
    }
    checkAttack() {

        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
            }
        })
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
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
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.bottle);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarBottle);
        this.addToMap(this.statusbarCoin);
        this.ctx.translate(this.camera_x, 0);


        this.addObjectsToMap(this.level.enemies);


        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }

    addObjectsToMap(objcs) {
        objcs.forEach(o => {
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


    collectingCoins() {
        this.level.coins.forEach((coin, i) => {
            if (this.character.isColliding(coin)) {
                this.character.collectCoin();
                // this.coins_sound.play();
                this.level.coins.splice(i, 1);
                this.statusbarCoin.setPercentage(this.character.amountOfCoins);
            }
        });
    }

    collectingBottles() {
        this.level.bottles.forEach((bottle, i) => {
            if (this.character.isColliding(bottle)) {
                this.character.collectBottle();
                // this.coins_sound.play();
                this.level.bottles.splice(i, 1);
                this.statusbarBottle.setPercentage(this.character.amountOfBottles);
            }
        });
    }
    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                if (enemy.isDead() && !this.character.isAboveGround()) {
                    this.character.hit();
                    this.character.pauseMoving();
                    this.statusbarHealth.setPercentage(this.character.energy);
                } else {
                    return;
                }
            }
        })
    }

    checkCharacterEnemyCollisions() {
        this.level.enemies.forEach((enemy, i) => {
            if (this.characterJumpToKill(enemy)) {
                enemy.die();
            }
        });
    }

    characterCollidingWithEnemies(enemy) {
        return this.character.isColliding(enemy);
    }

    characterJumpToKill(enemy) {
        return this.character.isColliding(enemy) && this.character.isAboveGround();
    }

    splash(enemy) {
        if (this.collidedWith[enemy.id]) return; // Keine Mehrfachkollision
        this.collidedWith[enemy.id] = true;
        this.speedY = 0;
        this.speedX = 0;
        this.acceleration = 0;
        clearInterval(this.throwInterval);
        
        this.playOnce(this.IMAGES_BOTTLE_SPLASH);
    
        setTimeout(() => {
          this.isSplicable = true;
        }, this.IMAGES_BOTTLE_SPLASH.length * 100);
      }

}