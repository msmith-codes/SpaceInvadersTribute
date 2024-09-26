"use strict";

const theCanvas = new Canvas("canvasHolder", 800, 600);

const UPDATE_TIME = 0;

function onUpdate()
{
    const now = Date.now();
    let delta = now - lastUpdate;
    
    // Rendering:
    theCanvas.Clear();
    player.onDraw();

    // Updating:
    player.onUpdate(delta);
     
    lastUpdate = now;
}

function KeyInputDown(event)
{
    player.onKeyDown(event.key);
}

function KeyInputUp(event)
{
    player.onKeyUp(event.key);
}

// Event Listeners:
theCanvas.AddListener("keydown", KeyInputDown);
theCanvas.AddListener("keyup", KeyInputUp);

// Spawn the Player:
let player = new Player(theCanvas, theCanvas.width / 2, theCanvas.height - 25);

// Start Game Loop:
let lastUpdate = Date.now();
setInterval(onUpdate, UPDATE_TIME);
