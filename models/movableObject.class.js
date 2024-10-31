class MovableObjects {
     x = 10;
     y = 50;
     img;
     height = 70;
     width = 45;
     imageCache = {};
     currentImg = 0;
     speed = 0.15;
     otherDirection = false;
     speedY = 0;
     acceleration = 1;

     walking_sound = new Audio('audio/walking.mp3');
     jumping_sound = new Audio('audio/jumping.mp3');

     loadImg(path) {
          this.img = new Image();
          this.img.src = path;
     }

     loadImages(images) {
          images.forEach((path) => {
               let img = new Image();
               img.src = path;
               this.imageCache[path] = img;
          });
     }

     moveRight() {
          this.x += this.speed;
          this.otherDirection = false;
          this.walking_sound.play();
     }

     moveLeft() {
          this.x -= this.speed;
     }

     playAnimation(images) {
          let i = this.currentImg % images.length;
          let path = images[i];
          this.img = this.imageCache[path];
          this.currentImg++;
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
     draw(ctx) {
          ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
     }

     drawFrame(ctx) {
          ctx.beginPath();
          ctx.lineWidth = '1';
          ctx.strokeStyle = 'blue';
          ctx.rect(this.x, this.y, this.width, this.height);
          ctx.stroke();

     }
}