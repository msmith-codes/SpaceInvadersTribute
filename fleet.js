"use strict";

class Fleet extends GameObject
{
    #debug = true;

    #currentState = "movingRight";
    #fleetRows = 5;
    #fleetColumns = 11;
    #speed = 25;
    #timer = 0;
    width = 400;
    height = 170;
    bulletsPresent = 0;
    aliens = [];
    shootingAlien = [];
    leftMostColumn = [];
    rightMostColumn = [];
    
    rightColumnOffset = 0; 

    constructor(canvas, x, y)
    {
        super(canvas, x, y);
        
        let index = 0;
        for(let row = 0; row < this.#fleetRows; row++) {  
            for(let column = 0; column < this.#fleetColumns; column++) {
                const xAlienPos = 38 * column;
                const yAlienPos = 38 * row;
                this.aliens.push(new Alien(canvas, xAlienPos, yAlienPos, this, index));
                index++;
            }
        }
        

        for(let i = 0; i < this.aliens.length; i++) {
            if(i > 43) {
                this.shootingAlien.push(this.aliens[i]);
            }
            if(i % 11 == 0) {
                this.leftMostColumn.push(this.aliens[i]);
            }
            
            if(i % 11 == 10) {
                this.rightMostColumn.push(this.aliens[i]);
            }

        }
    }

    onDraw()
    {
        // Draw a box a hallow box around the fleet:
        if(this.#debug) {
            for(let x = 0; x < this.width; x++) {
                for(let y = 0; y < this.height; y++) {
                    if(x == 0 || y == 0 || x == this.width - 1|| y == this.height - 1) {
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
        this.#timer += delta;
        if(this.#currentState == "movingRight") {
            this.velocityX = 1;
            if(this.xPos > 400 + this.rightColumnOffset) {
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
        
        // Update the aliens:
        for(let alien of this.aliens) {
            alien.onUpdate(delta);
        }

        // Pick a random alien to shoot from the bottom row:
        if(this.#timer > 1) {
            this.#timer = 0;
            let randomAlien = Math.floor(Math.random() * this.shootingAlien.length);
            this.shootingAlien[randomAlien].shoot();
        }
        
        for(let a of this.shootingAlien) {
            if(!a.alive()) { 
                let aIndex = a.index;
                for(let a2 of this.aliens) {
                    if(a2.index == aIndex - this.#fleetColumns) {
                        this.shootingAlien.push(a2);
                        this.shootingAlien.splice(this.shootingAlien.indexOf(a), 1);
                    }
                }
            }
        }
        
        let leftDeadCount = 0;
        for(let a of this.leftMostColumn) {
            if(!a.alive()) {
                leftDeadCount++;
            }
        }

        if(leftDeadCount == this.#fleetRows) {
            let newLeftMostColumn = [];
            for(let i = 0; i < this.leftMostColumn.length; i++) {
                let la = this.leftMostColumn[i];
                for(let a of this.aliens) {
                    if(a.index == la.index + 1) {
                        newLeftMostColumn.push(a);
                    }
                }
 
            }
            this.leftMostColumn = newLeftMostColumn;

            this.width -= 38;
            this.xPos += 38;
        }
        
        let rightDeadCount = 0;
        for(let a of this.rightMostColumn) {
            if(!a.alive()) {
                rightDeadCount++;
            }
        }

        if(rightDeadCount == this.#fleetRows) {
            let newRightMostColumn = [];
            for(let i = 0; i < this.rightMostColumn.length; i++) {
                let la = this.rightMostColumn[i];
                for(let a of this.aliens) {
                    if(a.index == la.index - 1) {
                        newRightMostColumn.push(a);
                    }
                }
 
            }
            this.rightMostColumn = newRightMostColumn;
            this.rightColumnOffset += 38; 
            this.width -= 38;
        }
        
        

        this.xPos += this.velocityX * this.#speed * (delta);        
        this.yPos += this.velocityY * this.#speed * (delta);
    }

    increaseSpeed()
    {
        this.#speed += 1;
    }

    resetSpeed()
    {
        this.#speed = 25;
    }


}
