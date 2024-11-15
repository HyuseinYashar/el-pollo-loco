class MovableObjects extends DrawableObject {
     speed ;
     otherDirection = false;
     speedY = 0;
     acceleration = 1;
     energy = 32422342323;
     lasthit = 0;

     walking_sound = new Audio('audio/walking.mp3');
     jumping_sound = new Audio('audio/jumping.mp3');
     bottle_drop = new Audio('audio/bottle_drop.mp3');

     intervalIds  = [];

     setStoppableInt(fn,time) {
           let id  = setInterval(fn,time);
          this.intervalIds.push(id);
     }

     stopInts(){
          this.intervalIds.forEach(clearInterval);
     }



     moveRight() {
          this.x += this.speed;
          if (this instanceof Character) {
               this.otherDirection = false;
               this.walking_sound.play();
          }
     }

     moveLeft() {
          this.x -= this.speed;
     }


     applyGravity() {
          setInterval(() => {
               if (this.isAboveGround(this.y) || this.speedY > 0) {
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration;
               }
          }, 1000 / 30);
     }

     isAboveGround(y) {
          if (this instanceof ThrowableObject) {
               return true;
          } else {
               return this.y < y;
          }
     }

     jump() {
          this.jumping_sound.play();
          this.speedY = 15;
     }

     pauseSounds() {
          this.walking_sound.pause();
          this.jumping_sound.pause();
          this.bottle_drop.pause();
     }




     isColliding(obj) {
          return this.x + this.width > obj.x &&
               this.y + this.height > obj.y &&
               this.x < obj.x &&
               this.y < obj.y + obj.height;
     }

     hit() {
          this.energy -= 10;
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
          this.bottle_drop.play();
          this.speedY = 8;
          this.applyGravity();
          setInterval(() => {
               this.x += 10;
          }, 30);
     }
}