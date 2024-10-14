"use strict";

class Alien extends GameObject
{
    #isAlive = true;
    width = 15;
    height = 15;
    animation = 0;
    time = 0;

    onDraw()
    {
        // Draw the alien's body:
        if(this.#isAlive) {
            if(this.animation == 0) {
                this.canvas.SetPixel(this.xPos + 7, this.yPos, 0, 0, 255);
                this.canvas.SetPixel(this.xPos + 6, this.yPos + 1, 0, 0, 255);
                this.canvas.SetPixel(this.xPos + 8, this.yPos + 1, 0, 0, 255);
                this.canvas.SetPixel(this.xPos + 5, this.yPos + 2, 0, 0, 255);
                this.canvas.SetPixel(this.xPos + 9, this.yPos + 2, 0, 0, 255);
                this.canvas.SetPixel(this.xPos + 4, this.yPos + 3, 0, 0, 255);
                this.canvas.SetPixel(this.xPos + 10, this.yPos + 3, 0, 0, 255);
                this.canvas.SetPixel(this.xPos + 3, this.yPos + 4, 0, 0, 255);
                this.canvas.SetPixel(this.xPos + 11, this.yPos + 4, 0, 0, 255);
                this.canvas.SetPixel(this.xPos + 2, this.yPos + 5, 0, 0, 255);
                this.canvas.SetPixel(this.xPos + 12, this.yPos + 5, 0, 0, 255);
                this.canvas.SetPixel(this.xPos + 1, this.yPos + 6, 0, 0, 255);
                this.canvas.SetPixel(this.xPos + 13, this.yPos + 6, 0, 0, 255);
                this.canvas.SetPixel(this.xPos, this.yPos + 7, 0, 0, 255);
                this.canvas.SetPixel(this.xPos + 14, this.yPos + 7, 0, 0, 255);
                this.canvas.SetPixel(this.xPos + 1, this.yPos + 8, 0, 0, 255);
                this.canvas.SetPixel(this.xPos + 13, this.yPos + 8, 0, 0, 255);
                this.canvas.SetPixel(this.xPos + 2, this.yPos + 9, 0, 0, 255);
                this.canvas.SetPixel(this.xPos + 12, this.yPos + 9, 0, 0, 255);
                this.canvas.SetPixel(this.xPos + 3, this.yPos + 10, 0, 0, 255);
                this.canvas.SetPixel(this.xPos + 11, this.yPos + 10, 0, 0, 255);
                this.canvas.SetPixel(this.xPos + 4, this.yPos + 11, 0, 0, 255);
                this.canvas.SetPixel(this.xPos + 10, this.yPos + 11, 0, 0, 255);
                this.canvas.SetPixel(this.xPos + 5, this.yPos + 12, 0, 0, 255);
                this.canvas.SetPixel(this.xPos + 9, this.yPos + 12, 0, 0, 255);
                this.canvas.SetPixel(this.xPos + 6, this.yPos + 13, 0, 0, 255);
                this.canvas.SetPixel(this.xPos + 8, this.yPos + 13, 0, 0, 255);
                this.canvas.SetPixel(this.xPos + 7, this.yPos + 14, 0, 0, 255);
            } else {
                for(let x = 0; x < this.width; x++) {
                    for(let y = 0; y < this.height; y++) {
                        if(x == 0 || y == 0 || x == this.width - 1 || y == this.height - 1) {
                            this.canvas.SetPixel(this.xPos + x, this.yPos + y, 0, 0, 255);
                        }
                    }
                }
            }
        }
    }       

    onUpdate(delta)
    {
        if(this.#isAlive) {
            this.time += delta;
            if(this.time > 1) {
                this.time = 0;
                this.animation = (this.animation + 1) % 2;
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
