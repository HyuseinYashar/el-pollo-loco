class Cloud extends MovableObjects { 
    
    height = 500;
    width = 600;
    x = Math.random() * 500;
    y = 1;
    
    constructor(imgPath){
        super().loadImg(imgPath);
        this.animate();
    }
    

    animate(){
        setInterval(() => {
            this.x -= 0.15;
        },1000/60);
    }
}