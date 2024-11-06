class MovableObjects  extends DrawableObject{

     speed = 0.15;
     otherDirection = false;
     speedY = 0;
     acceleration = 1;
     energy = 100;
     lasthit = 0;

     walking_sound = new Audio('audio/walking.mp3');
     jumping_sound = new Audio('audio/jumping.mp3');

     

     moveRight() {
          this.x += this.speed;
          this.otherDirection = false;
          this.walking_sound.play();
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
          }, 1000 / 25);
     }

     isAboveGround() {
          return this.y < 230;
     }

     jump() {
          this.jumping_sound.play();
          this.speedY = 15;
     }

     pauseSounds() {
          this.walking_sound.pause();
          this.jumping_sound.pause();
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
     
     isDead(){
          return this.energy == 0;
     }

     isHurt(){
          let timepassed = new Date().getTime()-this.lasthit;
          timepassed = timepassed/1000;
          return timepassed <0.3;
     }
}