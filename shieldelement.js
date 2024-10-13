"use strict";

class ShieldElement extends GameObject
{
    #isAlive = true;
    width = 10;
    height = 10;

    onDraw()
    {
        if(this.#isAlive) {
            for(let x = 0; x < this.width; x++) {
                for(let y = 0; y < this.height; y++) {
                    this.canvas.SetPixel(this.xPos + x, this.yPos + y, 0, 255, 0);
                }
            }
        }
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
