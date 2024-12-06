class StatusbarCoin extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    percentage = 0;

    /**
     * Initializes the StatusbarCoin object by loading images and setting its position and size.
     *
     * The constructor sets the initial x and y coordinates, width, and height of the status bar,
     * loads the images specified in the IMAGES array, and sets the initial percentage to 0.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }


    /**
     * Increases the percentage of coins collected by 10.
     *
     * This method is called whenever the character collects a coin.
     * The percentage is then updated, and the correct image for the status bar is displayed.
     */
    collect() {
        this.percentage += 10;
    }
    
    /**
     * Updates the displayed image for the coin status bar based on the given percentage.
     * @param {number} percentage - A number between 0 and 100, representing the current percentage of coins collected.
     * This determines which image from IMAGES is used to represent the coin status.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];

    }
}