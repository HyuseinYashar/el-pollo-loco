class Cloud extends MovableObjects { 
    
    height = 500;
    width = 600;
    x = Math.random() * 500;
    y = 1;
    
    constructor(imgPath){
        super().loadImg(imgPath);
        this.animate();
        this.speed = 0.11 + Math.random()*0.15;
    }
    

    animate(){
        this.moveLeft();
    }

}