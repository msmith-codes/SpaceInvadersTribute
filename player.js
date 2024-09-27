"use strict";

class Player extends GameObject
{
    // ---------------------------------------------------------------
    // Developer Notes (Michael):
    // This method is called every frame to draw the player.
    // ---------------------------------------------------------------
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
    
    // ---------------------------------------------------------------
    // Developer Notes (Michael):
    // This method was updated to pass the delta parameter.
    // The delta parameter is the time between frames.
    // This allows us to move the player at a consistent speed
    // ---------------------------------------------------------------
    onUpdate(delta)
    {
        // Update the player's position:
        this.xPos += this.velocityX * (delta / 5);
        this.yPos += this.velocityY * (delta / 5);
        
        // Clamp Position:
        if(this.xPos < 10) {
            this.xPos = 10;
        }

        if(this.xPos > theCanvas.width - 60) {
            this.xPos = theCanvas.width - 60;
        }
    }

    // ---------------------------------------------------------------
    // Developer Notes (Michael):
    // This method is now required otherwise the player will not move.
    // ---------------------------------------------------------------
    onKeyDown(key)
    {
        // ---------------------------------------------------------------
        // Developer Notes (Michael):
        // We are updating the velocity here, not the position.
        // By updating the velocity, we can have smooth movement. 
        // If we updated the position, the player would move in "jumps".
        // ---------------------------------------------------------------
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
    // ---------------------------------------------------------------
    // Developer Notes (Michael):
    // This method is now required otherwise the player will not stop moving.
    // ---------------------------------------------------------------
    onKeyUp(key)
    {
        switch(key) {
            case "a":
            case "j":
            case "ArrowLeft":
                this.velocityX = 0;
                break;
            case "d":
            case "k":
            case "ArrowRight":
                this.velocityX = 0;
                break;
        } 
    }
}

