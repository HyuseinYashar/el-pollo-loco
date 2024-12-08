class DrawableObject {
    x = 10;
    y = 50;
    img;
    height = 70;
    width = 45;
    imageCache = {};
    currentImg = 0;
    idleInt;
    statusInt;
    moveInt;

    /**
     * Loads an image from the given path and assigns it to the `img` property.
     *
     * @param {string} path - The file path of the image to be loaded.
     */
    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images from the given paths and assigns them to the `imageCache` property.
     *
     * @param {string[]} images - An array of file paths of the images to be loaded.
     */
    loadImages(images) {
        images.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Plays an animation by cycling through the given array of images.
     * The images are assumed to be cached in the `imageCache` property.
     * The `currentImg` property is used to keep track of the current image index.
     *
     * @param {string[]} images - An array of file paths of the images to be played in the animation.
     */
    playAnimation(images) {
        let i = this.currentImg % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImg++;
    }

    /**
     * Draws the object on the given canvas context.
     * The image is drawn at the position specified by the `x` and `y` properties,
     * with the size specified by the `width` and `height` properties.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas context on which to draw.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
   
    /**
     * Calculates the index of the correct image to display in the status bar,
     * based on the current percentage of bottles collected.
     * 
     * @returns {number} - The index of the correct image in the IMAGES array.
     */
    resolveImageIndex() {
      if (this.percentage == 100) {
        return 5;
      } else if (this.percentage >= 80) {
        return 4;
      } else if (this.percentage >= 60) {
        return 3;
      } else if (this.percentage >= 40) {
        return 2;
      } else if (this.percentage >= 20) {
        return 1;
      } else {
        return 0;
      }
    }

    /**
     * Draws a red border around the object's offset area, if the `offset` property is defined.
     *
     * This is a debugging feature to visualize the offset area of certain objects.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas context on which to draw.
     */
    drawFrame(ctx) {
        if (
          this instanceof Character ||
          this instanceof Chicken ||
          this instanceof SmallChicken ||
          this instanceof Endboss ||
          this instanceof ThrowableObject
        ) {
    
          // Zeichnet den Offset-Rahmen, wenn Offset definiert ist
          if (this.offset) {
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "red"; // Farbe für den Offset-Bereich
            ctx.rect(
              this.x + (this.offset.left || 0),
              this.y + (this.offset.top || 0),
              this.width - (this.offset.left || 0) - (this.offset.right || 0),
              this.height - (this.offset.top || 0) - (this.offset.bottom || 0)
            );
            ctx.stroke();
          }
        }
      }
}