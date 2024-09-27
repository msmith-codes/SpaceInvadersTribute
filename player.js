"use strict";

class Player extends GameObject
{
    onDraw()
    {
        // Draw the player's body:
        for(let x = 0; x < 50; x++) {
            for(let y = 0; y < 20; y++) {
                this.canvas.SetPixel(this.xPos + x, this.yPos + y, 0, 255, 0);
            }
        }
        
        // Draw the player's gun:
        for(let x = 0; x < 10; x++) {
            for(let y = 0; y < 10; y++) {
                this.canvas.SetPixel(this.xPos + (50 / 2) - 5 + x, this.yPos - 10 + y, 0, 255, 0);
            }
        }

    }

    onUpdate(delta)
    {
        // Update Position:
        this.xPos += this.velocityX * (delta / 5);
        this.yPos += this.velocityY * (delta / 5);
        
        // Clamp Position:
        if(this.xPos < 10) {
            this.xPos = 11;
        }

        if(this.xPos > theCanvas.width - 60) {
            this.xPos = theCanvas.width - 60;
        }
    }

    onKeyDown(key)
    {
        switch(key) {
            case "a":
            case "j":
            case "ArrowLeft":
                this.velocityX = -1;
                break;
            case "d":
            case "k":
            case "ArrowRight":
                this.velocityX = 1;
                break;
        } 
    }

    onKeyUp(key)
    {
        switch(key) {
            case "ArrowLeft":
                this.velocityX = 0;
                break;
            case "ArrowRight":
                this.velocityX = 0;
                break;
        } 
    }
}

