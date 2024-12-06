class EndbossBar extends DrawableObject {
  IMAGES_HEALTH = [
    "img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
  ];

  percentage = 100;

  /**
   * The constructor for the EndbossBar. It is used to initialize
   * the EndbossBar object. It calls super() to initialize the
   * DrawableObject part of the object, loads the images for the
   * health bar using loadImages(), and sets the x, y, width and
   * height of the object. It also sets the initial percentage of
   * the health bar to 100.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTH);
    this.x = 300;
    this.y = 10;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

/**
 * Updates the health bar's displayed image based on the given percentage.
 * @param {number} percentage - A number between 0 and 100, representing the current percentage of health.
 * This determines which image from IMAGES_HEALTH is used to represent the health status.
 */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
}
