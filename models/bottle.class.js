class Bottle extends MovableObjects {
    BOTTLE_IMAGE ='img/6_salsa_bottle/1_salsa_bottle_on_ground.png';

    constructor(){
        super();
        this.x = 310;
        this.y = 340;
        this.height = 80;
        this.width = 100;
        this.applyGravity(this.y);
        this.loadImg(this.BOTTLE_IMAGE);
        // this.animate();
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.BOTTLE_IMAGE)
        }, 1000/60);
    }
}