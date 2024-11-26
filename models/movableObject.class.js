class MovableObjects extends DrawableObject {
     speed;
     otherDirection = false;
     speedY = 0;
     acceleration = 1;
     energy = 1000;
     lasthit = 0;
     throwAnimation;

     walking_sound = new Audio('audio/walking.mp3');
     jumping_sound = new Audio('audio/jumping.mp3');
     bottle_drop = new Audio('audio/bottle_drop.mp3');

     moveRight() {
          this.x += this.speed;
          if (this instanceof Character) {
               this.otherDirection = false;
               // this.walking_sound.play();
          }
     }

     moveLeft() {
          this.x -= this.speed;
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
               if(this instanceof Character) return this.y < 230;
               if(this instanceof Bottle) return this.y < 340;
               if(this instanceof Character) return this.y < 230;
          }
     }

     jump() {
          // this.jumping_sound.play();
          this.speedY = 15;
     }

     pauseSounds() {
          this.walking_sound.pause();
          this.jumping_sound.pause();
          this.bottle_drop.pause();
     }

     playOnce(images) {
          this.currentImage = 0;
      
          const animationInterval = setInterval(() => {
            if (this.currentImage < images.length) {
              let path = images[this.currentImage];
              this.img = this.imageCache[path];
              this.currentImage++;
            } else {
              clearInterval(animationInterval);
            }
          }, 400);
        }



     // isColliding(obj) {
     //      return this.x + this.width > obj.x &&
     //           this.y + this.height > obj.y &&
     //           this.x < obj.x &&
     //           this.y < obj.y + obj.height;
     // }

     isColliding(mo) {
          return (
               this.x + this.width - this.offset.right > mo.x + mo.offset.left && // Rechte Kante der Flasche nach rechts
               this.x + this.offset.left < mo.x + mo.width - mo.offset.right && // Linke Kante der Flasche nach links
               this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && // Untere Kante der Flasche nach unten
               this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom // Obere Kante der Flasche nach oben
          );
     }

     hit() {
          this.energy -= 1;
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
          // this.bottle_drop.play();
          this.speedY = 8;
          this.applyGravity();

          this.throwAnimation = setInterval(() => {
               this.x += 10;
          }, 30);
     }


}