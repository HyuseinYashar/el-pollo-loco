class MovableObjects {
  x = 10;
  y = 50;
  img;
  height = 70;
  width = 45;
  imageCache = {};

  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img; 
    });
  }

  moveRight() {}

  moveLeft() {}
}