"use strict";

class Shield extends GameObject
{
    width = 40;
    height = 30;
    elements = [];
    constructor(canvas, x, y)
    {
        super(canvas, x, y);
        for(let x = 0; x < this.width; x += 10) {
            for(let y = 0; y < this.height; y += 10) {
                let element = new ShieldElement(theCanvas, this.xPos + x, this.yPos + y);
                this.elements.push(element);
            }
        }
    }
        
    onDraw()
    {
        for(let element of this.elements) {
            element.onDraw();
        }
    } 

}
