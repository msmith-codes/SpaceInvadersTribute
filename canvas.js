"use strict";

class Canvas {
    #context
    #width
    #canvas
    #height
    constructor(place, w, h) {

        this.#width = w
        this.#height = h
       
        this.#canvas = document.createElement("canvas")
        this.#canvas.width = w
        this.#canvas.height  = h
        this.#canvas.style = "border:1px solid black;"

        // without this line, the canvas will not receive keypress events
        this.#canvas.tabIndex = 0 

        let location = document.getElementById(place)
        location.appendChild(this.#canvas)

        this.#context = this.#canvas.getContext("2d")

    }

    SetPixel(x,y,r,g,b) {
        this.#context.strokeStyle = 'rgb(' + r + ',' + g + ',' + b + ')'
        this.#context.strokeRect(x,y,1,1) 
        this.#context.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')'
        this.#context.fillRect(x,y,1,1) 
    }

    Clear() {
       this.#context.clearRect(0,0, this.#width, this.#height)
    }

    get width() {
       return this.#width
    }

    get height() {
        return this.#height
    }

    AddListener(eventType, callBack) {
       this.#canvas.addEventListener(eventType, callBack)
    }
}
