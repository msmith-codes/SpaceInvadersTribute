"use strict";

class Fleet extends GameObject
{
    #debug = false;

    #currentState = "movingRight";
    #fleetRows = 3;
    #fleetColumns = 9;
    #speed = 200;

    aliens = [];

    constructor(canvas, x, y)
    {
        super(canvas, x, y);

        for(let row = 0; row < this.#fleetRows; row++) {  
            for(let column = 0; column < this.#fleetColumns; column++) {
                const xAlien = 48 * column;
                const yAlien = 48 * row;
                this.aliens.push(new Alien(canvas, xAlien, yAlien));
            }
        }
    }

    onDraw()
    {
        // Draw a box a hallow box around the fleet:
        if(this.#debug) {
            for(let x = 0; x < 400; x++) {
                for(let y = 0; y < 200; y++) {
                    if(x == 0 || y == 0 || x == 399 || y == 199) {
                        this.canvas.SetPixel(this.xPos + x, this.yPos + y, 0, 0, 255);
                    }
                }
            }
        }

        // Draw the aliens:
        for(let alien of this.aliens) {
            alien.onDraw();
        }
    }

    onUpdate(delta)
    {
        let shouldMovedown = false;
        if(this.#currentState == "movingRight") {
            this.velocityX = 1;
            if(this.xPos > 400) {
                this.#currentState = "movingLeft";
                this.yPos += 20;
                shouldMovedown = true;
            }
        } else {
            this.velocityX = -1;
            if(this.xPos < 0) {
                this.#currentState = "movingRight";
                this.yPos += 20;
                shouldMovedown = true;
            }
        } 
         
        for(let alien of this.aliens) {
            alien.xPos += this.velocityX * this.#speed * (delta);
            if(shouldMovedown) {
                alien.yPos += 20;
            }
        }
        
        shouldMovedown = false;
        
        this.xPos += this.velocityX * this.#speed * (delta);        
        this.yPos += this.velocityY * this.#speed * (delta);
    }
}
