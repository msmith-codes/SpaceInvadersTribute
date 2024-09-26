"use strict";

class GameObject
{
    // Properties
    xPos;
    yPos;
    velocityX;
    velocityY;

    canvas;

    constructor(canvas, x, y)
    {
        this.canvas = canvas;
        this.xPos = x;
        this.yPos = y;
        this.velocityX = 0;
        this.velocityY = 0;
    }

    // Abstract Methods:
    onDraw() {}
    onUpdate(delta) {}

    // Getters:
    get xPos() { return this.xPos; }
    get yPos() { return this.yPos; }
}

