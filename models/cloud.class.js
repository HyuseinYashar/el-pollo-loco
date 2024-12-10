class Cloud extends MovableObjects { 
    
    height = 500;
    width = 600;
    x = Math.random() * 500;
    y = 1;
    
    /**
     * Constructs a new Cloud instance.
     * @param {string} imgPath - Path to the cloud image.
     */
    constructor(imgPath){
        super().loadImg(imgPath);
        this.animate();
        this.speed = 0.11 + Math.random()*0.15;
    }
    

    /**
     * Animates the cloud.
     * 
     * This method is called automatically by the constructor and starts the cloud's
     * animation by calling the `moveLeft` method. The animation is done by moving the
     * cloud to the left.
     */
    animate(){
        this.moveLeft();
    }

}