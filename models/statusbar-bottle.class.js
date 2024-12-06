class StatusbarBottle extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  /**
   * The constructor for the StatusbarBottle class.
   * 
   * This sets the object's x and y coordinates, width and height, and loads the images
   * for the status bar. It also sets the initial percentage to 0.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.y = 50;
    this.width = 200;
    this.height = 60;
    this.setPercentage(0);
  }

  /**
   * Sets the percentage of bottle icons displayed in the status bar.
   * 
   * @param {number} percentage - A number between 0 and 100, representing the current percentage of bottles collected.
   * This determines which image from IMAGES is used to represent the bottle status.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Calculates the index of the correct image to display in the status bar,
   * based on the current percentage of bottles collected.
   * 
   * @returns {number} - The index of the correct image in the IMAGES array.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 4;
    } else if (this.percentage == 80) {
      return 3;
    } else if (this.percentage == 60) {
      return 2;
    } else if (this.percentage == 40) {
      return 1;
    } else {
      return 0;
    }
  }
}
