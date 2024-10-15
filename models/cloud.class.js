class Cloud extends MovableObjects { 
    
    height = 500;
    width = 600;
    x = Math.random() * 500;
    y = 1;
    
    constructor(imgPath){
        super().loadImg(imgPath);
        
    }
}