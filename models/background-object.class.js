class BackgroundObject extends MovableObjects {
  width = 720;
  height = 480;
  /**
   * Constructor for BackgroundObject.
   * @param {string} imgPath - The file path of the image to be loaded.
   * @param {number} x - The x coordinate of the object.
   */
  constructor(imgPath, x) {
    super().loadImg(imgPath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
