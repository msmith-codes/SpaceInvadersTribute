"use strict";

class AlienBullet extends GameObject
{
    #speed = 100;
    width = 4;
    height = 15;
    onDraw()
    {
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
