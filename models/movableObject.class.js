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

     moveRight() { }

     moveLeft() {
          setInterval(() => {
               this.x -= this.speed;
          }, 1000 / 60);
     }

     playAnimation(images) {
          let i = this.currentImg % images.length;
          let path =images[i];
          this.img = this.imageCache[path];
          this.currentImg++;
     }
}