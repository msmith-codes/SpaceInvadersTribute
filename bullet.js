"use strict";

class Bullet extends GameObject
{
    #speed = 500;
    width = 4;
    height = 10;
    onDraw()
    {
        // Draw the alien's body:
        for(let x = 0; x < this.width; x++) {
            for(let y = 0; y < this.height; y++) {
               this.canvas.SetPixel(this.xPos + x, this.yPos + y, 255, 0, 0);
            }
        }
    }       

    onUpdate(delta)
    {
        this.yPos += this.velocityY * this.#speed * (delta);
    }
}
