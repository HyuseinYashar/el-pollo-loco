class DrawableObject {
    x = 10;
    y = 50;
    img;
    height = 70;
    width = 45;
    imageCache = {};
    currentImg = 0;

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

    playAnimation(images) {
        let i = this.currentImg % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImg++;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    // drawFrame(ctx) {
    //     if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken) {

    //         ctx.beginPath();
    //         ctx.lineWidth = '1';
    //         ctx.strokeStyle = 'blue';
    //         ctx.rect(this.x, this.y, this.width, this.height);
    //         ctx.stroke();
    //     }
    // }

    


    drawFrame(ctx) {
        if (
          this instanceof Character ||
          this instanceof Chicken ||
          this instanceof SmallChicken ||
          this instanceof Endboss
        ) {
        //   // Zeichnet den normalen Rahmen um das Objekt
        //   ctx.beginPath();
        //   ctx.lineWidth = "1";
        //   ctx.strokeStyle = "blue";
        //   ctx.rect(this.x, this.y, this.width, this.height);
        //   ctx.stroke();
    
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