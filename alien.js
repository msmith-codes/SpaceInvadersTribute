"use strict";

class Alien extends GameObject
{
    #isAlive = true;
    width = 15;
    height = 15;
    animation = 0;
    onDraw()
    {
        // Draw the alien's body:
        if(this.#isAlive) {
            if(this.animation == 0) {
                for(let x = 0; x < this.width; x++) {
                    for(let y = 0; y < this.height; y++) {
                        this.canvas.SetPixel(this.xPos + x, this.yPos + y, 0, 0, 255);
                    }
                }
            }
        }
    }       

    onUpdate(delta)
    {
        // TODO: Maybe? 
    }

    onDeath()
    {
        this.#isAlive = false;
    }

    alive()
    {
        return this.#isAlive;
    }
}
